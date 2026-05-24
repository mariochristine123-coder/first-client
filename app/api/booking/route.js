import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";

export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_STALE_MS = RATE_LIMIT_WINDOW_MS * 2;
const MAX_BODY_SIZE = 10_000;

const VALID_PROPERTY_TYPES = ["Apartment", "Villa", "Office"];
const VALID_BEDROOM_OPTIONS = ["1", "2", "3", "4 or more", ""];
const VALID_SERVICES = [
  "Packing Services",
  "Unpacking Services",
  "Furniture Assembly",
  "Appliance Installation",
  "Disassembly",
  "Handyman Services",
  "Loading & Unloading",
  "Other"
];

const PHONE_REGEX = /^\+?[\d\s().-]{7,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const RECIPIENT_REGEX = /^whatsapp:\+?[1-9]\d{7,15}$/;

let cachedTwilioClient;

function normalizeOrigin(value) {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getAllowedOrigins() {
  const configuredOrigins = (process.env.ALLOWED_ORIGINS || process.env.NEXT_PUBLIC_SITE_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .map(normalizeOrigin)
    .filter(Boolean);

  const productionOrigins = [
    "https://quickprofessionalmover.com",
    "https://www.quickprofessionalmover.com",
    ...configuredOrigins
  ];

  if (process.env.NODE_ENV === "production") {
    return [...new Set(productionOrigins)];
  }

  return [
    ...new Set([
      ...productionOrigins,
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001"
    ])
  ];
}

function getRequestOrigin(request) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost || request.headers.get("host") || "").split(",")[0]?.trim();
  if (!host) return null;

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = (forwardedProto || (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https"))
    .split(",")[0]
    .trim();

  return normalizeOrigin(`${protocol}://${host}`);
}

function secureResponse(data, options = {}) {
  const response = NextResponse.json(data, options);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

function methodNotAllowed() {
  const response = secureResponse({ error: "Method not allowed" }, { status: 405 });
  response.headers.set("Allow", "POST, OPTIONS");
  return response;
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfIP = request.headers.get("cf-connecting-ip");
  return (cfIP || realIP || forwarded?.split(",")[0]?.trim() || "unknown").slice(0, 80);
}

function sweepRateLimits(now = Date.now()) {
  for (const [ip, record] of rateLimitMap) {
    if (now - record.windowStart > RATE_LIMIT_STALE_MS) {
      rateLimitMap.delete(ip);
    }
  }
}

function isRateLimited(ip) {
  const now = Date.now();
  sweepRateLimits(now);

  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT_MAX_REQUESTS;
}

function isOriginAllowed(request) {
  const allowedOrigins = getAllowedOrigins();
  const requestOrigin = getRequestOrigin(request);
  const origin = normalizeOrigin(request.headers.get("origin"));

  if (origin) {
    return allowedOrigins.includes(origin) || origin === requestOrigin;
  }

  const referer = request.headers.get("referer");
  if (referer) {
    const refererOrigin = normalizeOrigin(referer);
    return allowedOrigins.includes(refererOrigin) || refererOrigin === requestOrigin;
  }

  return process.env.NODE_ENV !== "production";
}

async function readLimitedJson(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { error: "Content-Type must be application/json", status: 415 };
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return { error: "Request payload too large", status: 413 };
  }

  const reader = request.body?.getReader();
  if (!reader) {
    return { error: "Missing request body", status: 400 };
  }

  const decoder = new TextDecoder();
  let size = 0;
  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    size += value.byteLength;
    if (size > MAX_BODY_SIZE) {
      return { error: "Request payload too large", status: 413 };
    }

    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();

  try {
    return { body: JSON.parse(text) };
  } catch {
    return { error: "Invalid JSON body", status: 400 };
  }
}

function validateBooking(body) {
  const errors = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return ["Invalid request body"];
  }

  if (typeof body.name !== "string" || body.name.trim().length < 2 || body.name.trim().length > 100) {
    errors.push("Name must be between 2 and 100 characters");
  }

  if (typeof body.phone !== "string" || !PHONE_REGEX.test(body.phone.trim())) {
    errors.push("Invalid phone number format");
  }

  if (body.email && (typeof body.email !== "string" || !EMAIL_REGEX.test(body.email.trim()) || body.email.length > 254)) {
    errors.push("Invalid email format");
  }

  if (typeof body.moving_from !== "string" || body.moving_from.trim().length < 2 || body.moving_from.trim().length > 200) {
    errors.push("Moving from location must be between 2 and 200 characters");
  }

  if (typeof body.moving_to !== "string" || body.moving_to.trim().length < 2 || body.moving_to.trim().length > 200) {
    errors.push("Moving to location must be between 2 and 200 characters");
  }

  if (typeof body.move_date !== "string" || !DATE_REGEX.test(body.move_date.trim())) {
    errors.push("Move date must be in YYYY-MM-DD format");
  } else {
    const dateValue = new Date(`${body.move_date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(dateValue.getTime()) || dateValue < today) {
      errors.push("Move date cannot be in the past");
    }
  }

  if (body.preferred_time && (typeof body.preferred_time !== "string" || body.preferred_time.length > 50)) {
    errors.push("Preferred time must be under 50 characters");
  }

  if (!VALID_PROPERTY_TYPES.includes(body.property_type)) {
    errors.push("Invalid property type. Must be: Apartment, Villa, or Office");
  }

  if (body.bedrooms && !VALID_BEDROOM_OPTIONS.includes(body.bedrooms)) {
    errors.push("Invalid bedroom selection");
  }

  if (body.services_needed) {
    if (!Array.isArray(body.services_needed) || body.services_needed.length > 10) {
      errors.push("Services needed must be a list of at most 10 items");
    } else if (body.services_needed.some((service) => !VALID_SERVICES.includes(service))) {
      errors.push("Invalid service selection");
    }
  }

  if (body.notes && (typeof body.notes !== "string" || body.notes.length > 1000)) {
    errors.push("Notes must be under 1000 characters");
  }

  return errors;
}

function sanitize(input, maxLength = 200) {
  if (typeof input !== "string") return "";

  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/[<>]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

function getNotificationRecipients() {
  return (process.env.NOTIFICATION_RECIPIENTS || "")
    .split(",")
    .map((recipient) => recipient.trim())
    .filter((recipient) => RECIPIENT_REGEX.test(recipient))
    .slice(0, 5);
}

function getTwilioClient() {
  if (cachedTwilioClient) return cachedTwilioClient;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return null;
  }

  cachedTwilioClient = twilio(accountSid, authToken);
  return cachedTwilioClient;
}

export async function POST(request) {
  try {
    if (!isOriginAllowed(request)) {
      return secureResponse({ error: "Forbidden" }, { status: 403 });
    }

    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return secureResponse(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const parsed = await readLimitedJson(request);
    if (parsed.error) {
      return secureResponse({ error: parsed.error }, { status: parsed.status });
    }

    const validationErrors = validateBooking(parsed.body);
    if (validationErrors.length > 0) {
      return secureResponse(
        { error: "Validation failed", details: validationErrors },
        { status: 400 }
      );
    }

    const safeName = sanitize(parsed.body.name, 100);
    const safePhone = sanitize(parsed.body.phone, 20);
    const safeEmail = parsed.body.email ? sanitize(parsed.body.email, 254) : null;
    const safeMovingFrom = sanitize(parsed.body.moving_from, 200);
    const safeMovingTo = sanitize(parsed.body.moving_to, 200);
    const safeMoveDate = sanitize(parsed.body.move_date, 10);
    const safePreferredTime = parsed.body.preferred_time ? sanitize(parsed.body.preferred_time, 50) : null;
    const safePropertyType = parsed.body.property_type;
    const safeBedrooms = parsed.body.bedrooms ? sanitize(parsed.body.bedrooms, 20) : null;
    const safeServicesNeeded = Array.isArray(parsed.body.services_needed)
      ? parsed.body.services_needed.filter((service) => VALID_SERVICES.includes(service))
      : [];
    const safeNotes = parsed.body.notes ? sanitize(parsed.body.notes, 1000) : null;

    const { error: dbError } = await supabase.from("bookings").insert([
      {
        name: safeName,
        phone: safePhone,
        email: safeEmail,
        moving_from: safeMovingFrom,
        moving_to: safeMovingTo,
        move_date: safeMoveDate,
        preferred_time: safePreferredTime,
        property_type: safePropertyType,
        bedrooms: safeBedrooms,
        services_needed: safeServicesNeeded,
        notes: safeNotes,
        source: "Quick Professional Movers Website"
      }
    ]);

    if (dbError) {
      return secureResponse(
        { error: "Failed to save booking. Please try again." },
        { status: 500 }
      );
    }

    const recipients = getNotificationRecipients();
    const twilioClient = getTwilioClient();
    const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;

    if (recipients.length > 0 && twilioClient && RECIPIENT_REGEX.test(twilioFrom || "")) {
      const servicesList = safeServicesNeeded.length > 0 ? safeServicesNeeded.join(", ") : "None selected";
      const messageBody = [
        "WEBSITE BOOKING",
        "",
        `Name: ${safeName}`,
        `Phone: ${safePhone}`,
        `Email: ${safeEmail || "Not provided"}`,
        "",
        `From: ${safeMovingFrom}`,
        `To: ${safeMovingTo}`,
        `Date: ${safeMoveDate}`,
        `Time: ${safePreferredTime || "Anytime"}`,
        "",
        `Property: ${safePropertyType} (${safeBedrooms || "N/A"} bedrooms)`,
        `Services: ${servicesList}`,
        `Notes: ${safeNotes || "None"}`
      ].join("\n");

      await Promise.allSettled(
        recipients.map((recipient) =>
          twilioClient.messages.create({
            body: messageBody,
            from: twilioFrom,
            to: recipient
          })
        )
      );
    }

    return secureResponse({
      success: true,
      message: "Booking submitted successfully. We will contact you shortly."
    });
  } catch {
    return secureResponse(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Allow", "POST, OPTIONS");
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}
