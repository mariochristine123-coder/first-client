import { NextResponse } from 'next/server';

/**
 * Next.js 16 Proxy — Global Security Hardening
 *
 * Replaces the deprecated middleware.js convention.
 * Applies security headers to ALL responses and provides
 * additional protection for API routes.
 *
 * IMPORTANT: This runs at the Edge Runtime before any
 * page/API logic. Keep it lightweight — no DB calls,
 * no heavy computation.
 */
export function proxy(request) {
  const response = NextResponse.next();
  const scriptSrc = process.env.NODE_ENV === 'production'
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

  // ── Security Headers (applied to every response) ──
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co",
      "media-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

  // ── Remove potentially leaky headers ──
  response.headers.delete('X-Powered-By');

  return response;
}

// Apply proxy to all routes EXCEPT static files and images
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (browser icon)
     * - public assets/fonts (static assets)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|assets/|fonts/).*)',
  ],
};
