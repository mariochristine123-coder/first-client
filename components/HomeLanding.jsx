"use client";

import { useEffect, useState } from "react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" }
];

const linkTargets = {
  Home: "#home",
  Services: "#services",
  "About Us": "#about",
  "How It Works": "#how-it-works",
  "Why Choose Us": "#why-choose-us",
  Testimonials: "#testimonials",
  Contact: "#contact",
  "Contact Us": "#contact",
  "Our Gallery": "#gallery"
};

const contactDetails = {
  primaryPhone: {
    display: "055 479 5577",
    href: "tel:0554795577"
  },
  secondaryPhone: {
    display: "050 852 2173",
    href: "tel:0508522173"
  },
  companyMail: "quickprofessionalmover.com",
  address: "Industrial Area 10, Industrial Area, Sharjah, United Arab Emirates"
};

function getFooterLinkHref(label) {
  return linkTargets[label] ?? (footerServices.includes(label) ? "#services" : "#contact");
}

function getFieldName(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function getOptimizedAsset(src) {
  if (typeof src !== "string" || !src.startsWith("/assets/home-services/")) {
    return src;
  }

  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function OptimizedImage({ src, loading = "lazy", decoding = "async", ...props }) {
  return <img src={getOptimizedAsset(src)} loading={loading} decoding={decoding} {...props} />;
}

const trustFeatures = [
  {
    title: "On-Time",
    body: "Every Time",
    icon: ClockIcon
  },
  {
    title: "Safe Handling",
    body: "of Belongings",
    icon: BoxIcon
  },
  {
    title: "Trained & Verified",
    body: "Moving Experts",
    icon: BadgeIcon
  }
];

const stats = [
  {
    value: "4.2",
    body: "27 Reviews",
    iconImage: "/assets/home-services/trust-icon-star.webp",
    rating: true
  },
  {
    value: "7",
    body: "Years of Experience",
    iconImage: "/assets/home-services/trust-icon-calendar.webp"
  },
  {
    value: "5,000+",
    body: "Successful Moves Completed",
    iconImage: "/assets/home-services/trust-icon-truck.webp"
  },
  {
    value: "5,000+",
    body: "Happy Customers Served",
    iconImage: "/assets/home-services/trust-icon-customers.webp"
  },
  {
    value: "Licensed & Insured",
    body: "For Your Peace of Mind",
    iconImage: "/assets/home-services/trust-icon-shield-green.webp",
    compact: true
  }
];

const services = [
  {
    title: "Home & Villa Moving",
    body: "Safe and secure moving for apartments, villas, and houses.",
    image: "/assets/home-services/service-home-villa-moving.webp"
  },
  {
    title: "Office Relocation",
    body: "Efficient office moving with minimal downtime and maximum care.",
    image: "/assets/home-services/service-office-moving.webp"
  },
  {
    title: "Packing Services",
    body: "Professional packing with high-quality materials and careful handling.",
    image: "/assets/home-services/service-packing-services.webp"
  },
  {
    title: "Furniture Assembly",
    body: "Expert assembly and disassembly for all types of furniture.",
    image: "/assets/home-services/service-furniture-assembly-new.webp"
  },
  {
    title: "Appliance Installation",
    body: "Professional installation and setup for all home appliances.",
    image: "/assets/home-services/service-appliance-installation-new.webp"
  },
  {
    title: "Handyman Services",
    body: "Reliable mounting, drilling, hanging, and quick home repairs.",
    image: "/assets/home-services/service-handyman-services-new.webp"
  }
];

const reasons = [
  {
    title: "Reliable & Trustworthy",
    body: "We value your time and belongings like our own.",
    iconImage: "/assets/home-services/trust-icon-shield.webp"
  },
  {
    title: "On-Time, Every Time",
    body: "Punctual team committed to your schedule.",
    iconImage: "/assets/home-services/trust-icon-fast-clock.webp"
  },
  {
    title: "Safe Handling",
    body: "High-quality packing and careful transportation.",
    iconImage: "/assets/home-services/trust-icon-box.webp"
  },
  {
    title: "Trained Professionals",
    body: "Experienced, background-checked moving experts.",
    iconImage: "/assets/home-services/trust-icon-customers.webp"
  },
  {
    title: "Licensed & Insured",
    body: "Fully licensed and insured for your complete peace of mind.",
    iconImage: "/assets/home-services/trust-icon-shield-green.webp"
  },
  {
    title: "24/7 Support",
    body: "We're here to help you anytime, anywhere.",
    iconImage: "/assets/home-services/trust-icon-headset.webp"
  }
];

const processSteps = [
  {
    number: "1",
    title: "Book Your Move",
    body: "Contact us or fill out the form. Get a free quote and choose a time that works for you.",
    iconImage: "/assets/home-services/trust-icon-calendar.webp"
  },
  {
    number: "2",
    title: "We Pack & Move",
    body: "Our team arrives on time, packs everything carefully, and moves it safely.",
    iconImage: "/assets/home-services/trust-icon-truck.webp"
  },
  {
    number: "3",
    title: "Safe Delivery",
    body: "We deliver and place your items exactly where you want them. Done!",
    iconImage: "/assets/home-services/trust-icon-house.webp"
  }
];

const testimonials = [
  {
    text: "Quick Professional Movers made our office relocation incredibly easy! The team was on time, careful, and very professional. Highly recommend!",
    name: "Briana Patton",
    role: "Operations Manager"
  },
  {
    text: "Our office move was smooth and quick. The crew packed all IT hardware with extreme care and zero downtime.",
    name: "Bilal Ahmed",
    role: "IT Manager"
  },
  {
    text: "Excellent customer service from start to finish. They handled our delicate glassware with care and delivered on time.",
    name: "Saman Malik",
    role: "Customer Support Lead"
  },
  {
    text: "Very professional and friendly team. Our villa move was smooth with zero hassle. Amazing experience!",
    name: "Omar Raza",
    role: "CEO"
  },
  {
    text: "Best moving company in the UAE! Prompt response, transparent pricing, and very hardworking crew. Will use them again.",
    name: "Zainab Hussain",
    role: "Project Manager"
  },
  {
    text: "Superb packing services! They wrapped all furniture nicely and assembled everything in our new house perfectly.",
    name: "Aliza Khan",
    role: "Business Analyst"
  },
  {
    text: "Relocating an entire office is stressful, but they made it look easy. Very organized and fast-working team.",
    name: "Farhan Siddiqui",
    role: "Marketing Director"
  },
  {
    text: "Excellent experience with their handyman services. They mounted our TVs and hung all paintings carefully after the move.",
    name: "Sana Sheikh",
    role: "Sales Manager"
  },
  {
    text: "Professional, polite, and punctual. They took care of everything from disassembly to final placement. Highly recommended!",
    name: "Hassan Ali",
    role: "E-commerce Manager"
  }
];

const galleryStats = [
  { value: "5,000+", label: "Moves Completed", iconImage: "/assets/home-services/trust-icon-truck.webp" },
  { value: "98%", label: "Client Satisfaction", iconImage: "/assets/home-services/trust-icon-shield-green.webp" },
  { value: "24/7", label: "Support", iconImage: "/assets/home-services/trust-icon-headset.webp" }
];

const initialGalleryItems = 12;

const portraitGalleryFiles = new Set([
  "IMG-20260523-WA0000.webp",
  "IMG-20260523-WA0002.webp",
  "IMG-20260523-WA0005.webp",
  "IMG-20260523-WA0006.webp",
  "IMG-20260523-WA0015.webp",
  "IMG-20260523-WA0018.webp",
  "IMG-20260523-WA0020.webp",
  "IMG-20260523-WA0023.webp",
  "IMG-20260523-WA0025.webp",
  "IMG-20260523-WA0028.webp",
  "IMG-20260523-WA0032.webp",
  "IMG-20260523-WA0040.webp",
  "IMG-20260523-WA0045.webp",
  "IMG-20260523-WA0046.webp",
  "IMG-20260523-WA0047.webp",
  "IMG-20260523-WA0048.webp",
  "IMG-20260523-WA0049.webp",
  "IMG-20260523-WA0051.webp",
  "IMG-20260523-WA0052.webp",
  "IMG-20260523-WA0053.webp",
  "IMG-20260523-WA0054.webp",
  "IMG-20260523-WA0058.webp"
]);

const videoPosterFiles = {
  "VID-20260523-WA0009.mp4": "IMG-20260523-WA0007.webp",
  "VID-20260523-WA0019.mp4": "IMG-20260523-WA0018.webp",
  "VID-20260523-WA0031.mp4": "IMG-20260523-WA0028.webp",
  "VID-20260523-WA0033.mp4": "IMG-20260523-WA0032.webp",
  "VID-20260523-WA0034.mp4": "IMG-20260523-WA0032.webp",
  "VID-20260523-WA0044.mp4": "IMG-20260523-WA0041.webp",
  "VID-20260523-WA0050.mp4": "IMG-20260523-WA0049.webp",
  "VID-20260523-WA0055.mp4": "IMG-20260523-WA0054.webp",
  "VID-20260523-WA0057.mp4": "IMG-20260523-WA0058.webp"
};

const galleryZipItems = [
  { file: "IMG-20260523-WA0000.webp", title: "Move preparation 01", featured: true },
  { file: "IMG-20260523-WA0002.webp", title: "Packed furniture 02" },
  { file: "IMG-20260523-WA0004.webp", title: "Protected items 03" },
  { file: "IMG-20260523-WA0005.webp", title: "Packing detail 04", wide: true },
  { file: "IMG-20260523-WA0006.webp", title: "Moving setup 05" },
  { file: "IMG-20260523-WA0007.webp", title: "Room packing 06" },
  { file: "VID-20260523-WA0009.mp4", title: "Moving video 07", video: true, duration: "Video" },
  { file: "IMG-20260523-WA0012.webp", title: "Furniture protection 08", wide: true },
  { file: "IMG-20260523-WA0014.webp", title: "Packed belongings 09" },
  { file: "IMG-20260523-WA0015.webp", title: "Careful wrapping 10" },
  { file: "IMG-20260523-WA0016.webp", title: "Home moving 11" },
  { file: "IMG-20260523-WA0018.webp", title: "Team handling 12", wide: true },
  { file: "VID-20260523-WA0019.mp4", title: "Moving video 13", video: true, duration: "Video" },
  { file: "IMG-20260523-WA0020.webp", title: "Safe packing 14" },
  { file: "IMG-20260523-WA0023.webp", title: "Project detail 15" },
  { file: "IMG-20260523-WA0024.webp", title: "Furniture move 16", wide: true },
  { file: "IMG-20260523-WA0025.webp", title: "Packed room 17" },
  { file: "IMG-20260523-WA0028.webp", title: "Moving materials 18" },
  { file: "VID-20260523-WA0031.mp4", title: "Moving video 19", video: true, duration: "Video" },
  { file: "IMG-20260523-WA0032.webp", title: "Home project 20", wide: true },
  { file: "VID-20260523-WA0033.mp4", title: "Moving video 21", video: true, duration: "Video" },
  { file: "VID-20260523-WA0034.mp4", title: "Moving video 22", video: true, duration: "Video" },
  { file: "IMG-20260523-WA0039.webp", title: "Handled furniture 23" },
  { file: "IMG-20260523-WA0040.webp", title: "Packing progress 24", wide: true },
  { file: "IMG-20260523-WA0041.webp", title: "Room setup 25" },
  { file: "VID-20260523-WA0044.mp4", title: "Moving video 26", video: true, duration: "Video" },
  { file: "IMG-20260523-WA0045.webp", title: "Moving job 27" },
  { file: "IMG-20260523-WA0046.webp", title: "Protected move 28", wide: true },
  { file: "IMG-20260523-WA0047.webp", title: "Project room 29" },
  { file: "IMG-20260523-WA0048.webp", title: "Wrapped furniture 30" },
  { file: "IMG-20260523-WA0049.webp", title: "Moving detail 31" },
  { file: "VID-20260523-WA0050.mp4", title: "Moving video 32", video: true, duration: "Video", wide: true },
  { file: "IMG-20260523-WA0051.webp", title: "Packing work 33" },
  { file: "IMG-20260523-WA0052.webp", title: "Furniture care 34" },
  { file: "IMG-20260523-WA0053.webp", title: "Home moving 35" },
  { file: "IMG-20260523-WA0054.webp", title: "Move detail 36", wide: true },
  { file: "VID-20260523-WA0055.mp4", title: "Moving video 37", video: true, duration: "Video" },
  { file: "VID-20260523-WA0057.mp4", title: "Moving video 38", video: true, duration: "Video" },
  { file: "IMG-20260523-WA0058.webp", title: "Final packing 39" },
  { file: "IMG-20260523-WA0061.webp", title: "Completed handling 40", wide: true },
  { file: "IMG-20260523-WA0062.webp", title: "Moving supplies 41" },
  { file: "IMG-20260523-WA0063.webp", title: "Project close 42" }
].map((item, index) => ({
  ...item,
  id: `zip-gallery-${index + 1}`,
  category: item.video ? "Video" : "Project photo",
  orientation: item.video || portraitGalleryFiles.has(item.file) ? "portrait" : "landscape",
  src: `/assets/home-services/gallery-zip/${item.file}`,
  poster: item.video ? `/assets/home-services/gallery-zip/${videoPosterFiles[item.file]}` : null,
  alt: item.video ? `${item.title} from a moving project` : `${item.title} from a moving project`
}));

const bookingFields = [
  { label: "Full Name", required: true, placeholder: "Enter your full name", icon: UserIcon, maxLength: 100, minLength: 2 },
  { label: "Phone Number", required: true, placeholder: "Enter your phone number", icon: PhoneLineIcon, type: "tel", maxLength: 20, pattern: "[0-9+()\\s.-]{7,20}" },
  { label: "Email Address", optional: true, placeholder: "Enter your email address", icon: MailIcon, type: "email", maxLength: 254 },
  { label: "Moving From", required: true, placeholder: "Enter current location", icon: MapPinIcon, maxLength: 200, minLength: 2 },
  { label: "Moving To", required: true, placeholder: "Enter new location", icon: MapPinIcon, maxLength: 200, minLength: 2 },
  { label: "Move Date", required: true, placeholder: "Select move date", icon: CalendarIcon, type: "date" },
  { label: "Preferred Time", placeholder: "Enter preferred time", icon: ClockIcon, maxLength: 50 },
  { label: "Property Type", required: true, placeholder: "Select property type", icon: HouseIcon, select: true, options: ["Apartment", "Villa", "Office"] },
  { label: "Number of Bedrooms", placeholder: "Select bedrooms", icon: BedIcon, select: true, options: ["1", "2", "3", "4 or more"] }
];

const bookingServices = [
  { label: "Packing Services", icon: BoxIcon },
  { label: "Unpacking Services", icon: BoxIcon },
  { label: "Furniture Assembly", icon: ToolsIcon },
  { label: "Appliance Installation", icon: ApplianceIcon },
  { label: "Disassembly", icon: DisassemblyIcon },
  { label: "Handyman Services", icon: ToolIcon },
  { label: "Loading & Unloading", icon: TruckIcon },
  { label: "Other", icon: DotsIcon }
];

const bookingBenefits = [
  {
    title: "Fast Response",
    body: "We quickly confirm your move and schedule.",
    iconImage: "/assets/home-services/trust-icon-truck.webp"
  },
  {
    title: "Professional Team",
    body: "Experienced movers trained for safe handling.",
    iconImage: "/assets/home-services/trust-icon-customers.webp"
  },
  {
    title: "Flexible Scheduling",
    body: "Choose the date and time that works best for you.",
    iconImage: "/assets/home-services/trust-icon-calendar.webp"
  },
  {
    title: "Safe & Reliable",
    body: "Your belongings are in safe hands. Always.",
    iconImage: "/assets/home-services/trust-icon-shield-green.webp"
  }
];

const ctaHighlights = [
  {
    title: "Quick Response",
    body: "We respond fast and get you moving sooner.",
    iconImage: "/assets/home-services/trust-icon-fast-clock.webp"
  },
  {
    title: "100% Safe",
    body: "Your belongings are in safe hands.",
    iconImage: "/assets/home-services/trust-icon-shield-green.webp"
  },
  {
    title: "Trusted Experts",
    body: "Trained, verified & experienced movers.",
    iconImage: "/assets/home-services/trust-icon-customers.webp"
  }
];

const footerQuickLinks = ["Home", "Services", "About Us", "How It Works", "Why Choose Us", "Testimonials"];
const footerServices = ["Home & Villa Moving", "Office Relocation", "Packing Services", "Furniture Assembly", "Appliance Installation", "Handyman Services"];
const footerCompany = ["About Us", "Why Choose Us", "Our Gallery", "Contact Us"];

export default function HomeLanding() {
  return (
    <main className="premium-shell min-h-screen w-full max-w-full overflow-x-hidden text-ink">
      <HeroSection />
      <TrustAndServicesSection />
      <WhyStepsTestimonialsSection />
      <GalleryBookingCtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative isolate flex min-h-[680px] scroll-mt-6 flex-col justify-between overflow-hidden bg-[#fff9fc] px-4 pb-10 pt-4 sm:px-7 md:min-h-[720px] lg:min-h-[620px] lg:h-[calc(100vw*9/21)] lg:max-h-[760px] xl:max-h-[800px]">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/home-services/hero-background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <Header />

      <div className="relative z-10 mx-auto flex max-w-[1220px] flex-1 flex-col items-center justify-center py-7 text-center lg:py-8">
        <div className="hero-fade-up hero-float mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/76 px-4 py-2 text-[12px] font-black uppercase tracking-[0.10em] text-violet shadow-[0_14px_36px_rgba(48,18,74,0.08)] backdrop-blur-xl md:text-[13px]">
          <ShieldIcon className="h-5.5 w-5.5 text-pink" />
          Your trusted moving partner
        </div>

        <h1 className="hero-fade-up relative max-w-[1120px] text-[38px] font-black leading-[0.96] tracking-[-0.025em] text-ink drop-shadow-[0_2px_0_rgba(255,255,255,0.55)] sm:text-[54px] md:text-[66px] lg:text-[74px] xl:text-[82px]" style={{ animationDelay: "110ms" }}>
          Moving Made Easy.
          <span className="block text-[#cf2a87]">We Handle Everything.</span>
        </h1>

        <p className="hero-fade-up mt-7 max-w-[710px] text-[15px] font-semibold leading-[1.58] tracking-[0.01em] text-[#322d55] sm:text-[18px] lg:text-[20px]" style={{ animationDelay: "230ms" }}>
          Fast, careful, and reliable moving services for homes, offices, and everything in between.
        </p>

        <div className="hero-fade-up mt-8 flex w-full max-w-[560px] flex-col items-stretch justify-center gap-3.5 sm:flex-row" style={{ animationDelay: "340ms" }}>
          <PrimaryButton />
          <SecondaryButton />
        </div>

        <div className="hero-fade-up mt-7 flex flex-col items-center justify-center gap-4 rounded-[18px] border border-white/60 bg-white/48 px-4 py-3 shadow-[0_18px_50px_rgba(48,18,74,0.08)] backdrop-blur-xl sm:flex-row sm:gap-0" style={{ animationDelay: "450ms" }}>
          {trustFeatures.map((feature, index) => (
            <TrustFeature key={feature.title} feature={feature} showDivider={index > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavClick(event) {
    const href = event.currentTarget.getAttribute("href");

    if (!href?.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
    setIsMenuOpen(false);
  }

  return (
    <header className="relative z-20 mx-auto flex max-w-[1560px] items-center justify-between gap-5 rounded-[26px] border border-white/55 bg-white/64 px-4 py-2.5 shadow-[0_22px_60px_rgba(48,18,74,0.13),inset_0_1px_0_rgba(255,255,255,0.62)] backdrop-blur-2xl sm:px-7 lg:h-[78px] lg:px-8 xl:gap-7">
      <div className="flex items-center gap-4 xl:gap-5 2xl:gap-7">
        <a href="#home" onClick={handleNavClick} aria-label="Quick Professional Movers home" className="shrink-0">
          <OptimizedImage
            src="/assets/home-services/logo-transparent.webp"
            alt="Quick Professional Movers"
            loading="eager"
            fetchPriority="high"
            className="h-[46px] w-auto object-contain sm:h-[56px] lg:h-[62px]"
          />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 text-[13px] font-black text-ink/88 xl:flex xl:gap-5 2xl:gap-6 2xl:text-[14px]">
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              onClick={handleNavClick}
              className={`relative inline-flex items-center gap-1.5 py-3 transition hover:text-pink ${
                link.active ? "text-pink" : ""
              }`}
            >
              {link.label}
              {link.hasDropdown ? <ChevronDownIcon className="h-3.5 w-3.5" /> : null}
              {link.active ? (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-pink" aria-hidden="true" />
              ) : null}
            </a>
          ))}
        </nav>

        <a href={contactDetails.primaryPhone.href} className="hidden shrink-0 items-center text-[14px] font-black text-ink transition hover:text-pink xl:inline-flex 2xl:text-[15px]">
          {contactDetails.primaryPhone.display}
        </a>
      </div>

      <div className="hidden items-center gap-4 lg:flex xl:gap-5 2xl:gap-6">
        <a href={contactDetails.primaryPhone.href} className="inline-flex items-center text-[15px] font-bold text-ink shrink-0 transition hover:text-pink xl:hidden">
          {contactDetails.primaryPhone.display}
        </a>
        <a
          href="#quote"
          onClick={handleNavClick}
          className="premium-cta control-ease inline-flex h-[44px] shrink-0 items-center gap-3 rounded-[14px] bg-ink pl-5 pr-1.5 text-[14px] font-black text-white shadow-[0_16px_34px_rgba(21,6,55,0.18)] hover:-translate-y-0.5 hover:bg-violet"
        >
          Get Quote
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-white text-violet">
            <ArrowRightIcon className="h-4.5 w-4.5" />
          </span>
        </a>
      </div>

      <button
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsMenuOpen((current) => !current)}
        className="premium-cta control-ease grid h-10 w-10 place-items-center rounded-[12px] bg-ink text-white shadow-[0_12px_28px_rgba(77,19,139,0.18)] hover:-translate-y-0.5 hover:bg-violet xl:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="absolute left-4 right-4 top-[calc(100%+10px)] rounded-[20px] border border-white/65 bg-white/94 p-3 shadow-[0_22px_60px_rgba(48,18,74,0.18)] backdrop-blur-2xl sm:left-7 sm:right-7 xl:hidden"
        >
          <nav aria-label="Mobile navigation" className="grid gap-1 text-[13px] font-black text-ink">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className={`flex min-h-10 items-center justify-between rounded-[12px] px-3 transition hover:bg-pink/8 hover:text-pink ${
                  link.active ? "bg-pink/8 text-pink" : ""
                }`}
              >
                {link.label}
                {link.hasDropdown ? <ChevronDownIcon className="h-3.5 w-3.5" /> : <ArrowRightIcon className="h-3.5 w-3.5" />}
              </a>
            ))}
            <a
              href="#quote"
              onClick={handleNavClick}
              className="premium-cta control-ease mt-2 flex min-h-11 items-center justify-between rounded-[13px] bg-ink px-4 text-white shadow-[0_14px_30px_rgba(21,6,55,0.16)] hover:-translate-y-0.5 hover:bg-violet"
            >
              Get Quote
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function PrimaryButton() {
  return (
    <a
      href="#quote"
      className="premium-cta control-ease inline-flex h-[54px] items-center justify-center gap-4 rounded-[14px] bg-ink px-6 text-[15px] font-black text-white shadow-[0_24px_52px_rgba(21,6,55,0.24)] hover:-translate-y-1 hover:bg-violet sm:min-w-[232px]"
    >
      <TruckIcon className="h-5.5 w-5.5" />
      Book Now
      <span className="ml-auto grid h-7 w-7 place-items-center rounded-[9px] bg-white text-violet">
        <ArrowRightIcon className="h-4.5 w-4.5" />
      </span>
    </a>
  );
}

function SecondaryButton() {
  return (
    <a
      href="#services"
      className="premium-cta control-ease inline-flex h-[54px] items-center justify-center gap-3.5 rounded-[14px] border border-violet/18 bg-white/78 px-6 text-[15px] font-black text-violet shadow-[0_20px_46px_rgba(84,26,116,0.13)] backdrop-blur-xl hover:-translate-y-1 hover:border-pink/40 hover:text-pink sm:min-w-[210px]"
    >
      <BoxIcon className="h-5.5 w-5.5 text-violet shrink-0" />
      View Services
    </a>
  );
}

function TrustFeature({ feature, showDivider }) {
  const Icon = feature.icon;

  return (
    <div className="relative flex shrink-0 items-center gap-3 px-4 text-left sm:px-6">
      {showDivider ? (
        <span className="absolute left-0 top-1/2 hidden h-9 w-px -translate-y-1/2 bg-ink/10 sm:block" aria-hidden="true" />
      ) : null}
      <Icon className="h-6.5 w-6.5 shrink-0 text-pink" />
      <p className="shrink-0 text-[13px] font-black leading-[1.18] text-violet">
        {feature.title}
        <span className="block">{feature.body}</span>
      </p>
    </div>
  );
}

function TrustAndServicesSection() {
  const proofStats = stats.filter(
    (stat, index, collection) => collection.findIndex((item) => `${item.value}-${item.body}` === `${stat.value}-${stat.body}`) === index
  );

  return (
    <section className="relative overflow-hidden">
      <div id="about" className="content-auto relative isolate scroll-mt-6 overflow-hidden px-5 py-10 sm:px-8 lg:py-14">
        <OptimizedImage
          src="/assets/home-services/trust-section-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-[1260px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink/10 bg-white/80 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-violet shadow-[0_12px_30px_rgba(48,18,74,0.05)] backdrop-blur sm:text-[12px]">
            <ShieldIcon className="h-4.5 w-4.5 text-pink" />
            Trusted by thousands of families & businesses
          </div>

          <h2 className="mt-4 text-[30px] font-black leading-[1.04] text-ink sm:text-[40px] lg:text-[46px]">
            <span className="text-pink">Trusted.</span> Proven. Recommended.
          </h2>

          <p className="mx-auto mt-3 max-w-[620px] text-[14px] font-semibold leading-[1.55] text-[#403a62] sm:text-[15px]">
            We take pride in delivering safe, fast, and reliable moving services backed by experience and trust.
          </p>

          <div className="mx-auto mt-8 grid max-w-[1400px] gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {proofStats.map((stat) => (
              <StatCard key={stat.body} stat={stat} />
            ))}
          </div>
        </div>
      </div>

      <div id="services" className="content-auto relative isolate scroll-mt-6 overflow-hidden px-5 pb-12 pt-10 sm:px-8 lg:pb-16 lg:pt-14">
        <OptimizedImage
          src="/assets/home-services/services-section-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1350px]">
          <SectionEyebrow>Our services</SectionEyebrow>
          <div className="text-center">
            <h2 className="mt-3 text-[34px] font-black leading-[1.02] text-ink sm:text-[50px] lg:text-[58px]">
              Complete <span className="text-pink">Moving</span> Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-[660px] text-[16px] font-semibold leading-[1.55] text-[#403a62] sm:text-[17px]">
              From careful packing to safe delivery, we handle every step so you can move stress-free.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }) {
  return (
    <article className="flex min-h-[104px] items-center gap-4 rounded-[14px] border border-pink/8 bg-white/86 p-3.5 text-left shadow-[0_14px_34px_rgba(48,18,74,0.055)] sm:min-h-[110px] lg:min-h-[106px]">
      <span className="interactive-icon grid h-[80px] w-[80px] shrink-0 place-items-center">
        <OptimizedImage src={stat.iconImage} alt="" className="h-full w-full object-contain scale-[1.8]" aria-hidden="true" />
      </span>
      <div className="flex-1">
        <h3 className={`${stat.compact ? "text-[16px] sm:text-[17px] leading-[1.15]" : "text-[24px] sm:text-[26px] leading-[1.1]"} font-black text-ink`}>
          {stat.value}
        </h3>
        {stat.rating ? (
          <div className="mt-1.5 flex gap-0.5" aria-label="4.2 star rating">
            {Array.from({ length: 5 }).map((_, index) => {
              const starNumber = index + 1;
              if (starNumber <= 4) {
                return <SmallStarIcon key={index} className="h-3.5 w-3.5 text-pink" />;
              } else {
                return (
                  <div key={index} className="relative h-3.5 w-3.5 shrink-0">
                    <SmallStarIcon className="absolute inset-0 h-3.5 w-3.5 text-pink/20" />
                    <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: "20%" }}>
                      <SmallStarIcon className="h-3.5 w-3.5 text-pink" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : null}
        <p className="mt-1.5 text-[12px] font-bold leading-[1.35] text-[#4b456a] sm:text-[13px]">{stat.body}</p>
      </div>
    </article>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="group overflow-hidden rounded-[18px] border border-pink/8 bg-white shadow-[0_18px_42px_rgba(48,18,74,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(48,18,74,0.10)]">
      <div className="overflow-hidden">
        <OptimizedImage src={service.image} alt="" className="h-[184px] w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="flex min-h-[164px] flex-col px-5 pb-5 pt-[18px]">
        <h3 className="text-[20px] font-black leading-tight text-ink">{service.title}</h3>
        <p className="mt-2.5 max-w-[310px] text-[14px] font-semibold leading-[1.5] text-[#403a62]">{service.body}</p>
        <a
          href="#quote"
          aria-label={`Book ${service.title}`}
          className="premium-cta control-ease mt-auto grid h-10 w-10 place-items-center self-end rounded-[11px] bg-ink text-white shadow-[0_12px_24px_rgba(21,6,55,0.16)] hover:-translate-y-0.5 hover:bg-pink"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </a>
      </div>
    </article>
  );
}

function WhyStepsTestimonialsSection() {
  return (
    <section className="relative overflow-hidden">
      <div id="why-choose-us" className="content-auto relative isolate scroll-mt-6 overflow-hidden px-5 pb-9 pt-12 sm:px-8 lg:pb-12 lg:pt-16">
        <OptimizedImage
          src="/assets/home-services/why-choose-us-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1320px]">
          <SectionEyebrow>Why choose us</SectionEyebrow>
          <div className="text-center">
            <h2 className="mt-3 text-[34px] font-black leading-[1.04] text-ink sm:text-[48px] lg:text-[54px]">
              We Make Moving <span className="text-pink">Easy & Stress-Free</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[660px] text-[16px] font-semibold leading-[1.55] text-[#403a62]">
              We go above and beyond to deliver the best moving experience every time.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {reasons.map((reason) => (
              <ReasonCard key={reason.title} reason={reason} />
            ))}
          </div>
        </div>
      </div>

      <div id="how-it-works" className="content-auto relative isolate scroll-mt-6 overflow-hidden px-5 py-11 sm:px-8 lg:px-12 lg:py-14">
        <OptimizedImage
          src="/assets/home-services/how-it-works-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1320px]">
          <SectionEyebrow>How it works</SectionEyebrow>
          <div className="text-center">
            <h2 className="mt-3 text-[32px] font-black leading-[1.04] text-ink sm:text-[44px] lg:text-[50px]">
              Moving Made Simple in <span className="text-pink">3 Easy Steps</span>
            </h2>
          </div>

          <div className="mt-8 grid items-center gap-5 lg:grid-cols-[1fr_72px_1fr_72px_1fr]">
            {processSteps.map((step, index) => (
              <FragmentStep key={step.number} step={step} showArrow={index < processSteps.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <div id="testimonials" className="content-auto relative isolate scroll-mt-6 overflow-hidden pb-12 pt-10 lg:pb-16">
        <OptimizedImage
          src="/assets/home-services/testimonials-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1220px] px-5 sm:px-8">
          <SectionEyebrow>Testimonials</SectionEyebrow>
          <div className="text-center">
            <h2 className="mt-3 text-[32px] font-black leading-[1.05] text-ink sm:text-[46px]">
              What Our <span className="text-pink">Customers Say</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[590px] text-[15px] font-semibold leading-[1.55] text-[#403a62]">
              Real reviews from real people who trusted us with their move.
            </p>
          </div>
        </div>

        <div className="mt-10 w-full">
          <TestimonialsColumn testimonials={testimonials} duration={35} />
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason }) {
  const Icon = reason.icon;

  return (
    <article className="flex min-h-[186px] flex-col items-center justify-center rounded-[14px] border border-pink/8 bg-white/78 px-4 py-5 text-center shadow-[0_16px_42px_rgba(48,18,74,0.07)] backdrop-blur-md">
      <span className="interactive-icon mb-3.5 flex h-[80px] w-[80px] items-center justify-center text-pink">
        {reason.iconImage ? (
          <OptimizedImage src={reason.iconImage} alt="" className="h-full w-full object-contain scale-[2.2]" aria-hidden="true" />
        ) : (
          Icon ? <Icon className="h-[64px] w-[64px]" /> : null
        )}
      </span>
      <h3 className="text-[15px] font-black leading-tight text-ink">{reason.title}</h3>
      <p className="mt-2.5 max-w-[170px] text-[13px] font-semibold leading-[1.45] text-[#403a62]">{reason.body}</p>
    </article>
  );
}

function FragmentStep({ step, showArrow }) {
  return (
    <>
      <ProcessCard step={step} />
      {showArrow ? (
        <div className="hidden items-center justify-center text-pink lg:flex" aria-hidden="true">
          <DottedArrowIcon className="h-10 w-[82px]" />
        </div>
      ) : null}
    </>
  );
}

function ProcessCard({ step }) {
  const Icon = step.icon;

  return (
    <article className="relative flex min-h-[128px] items-center rounded-[18px] border border-white/72 bg-white/72 py-4 pl-[74px] pr-5 shadow-[0_16px_40px_rgba(48,18,74,0.07)] backdrop-blur-md">
      <div className="absolute left-[-32px] top-1/2 flex -translate-y-1/2 items-center justify-center">
        <div className="interactive-icon relative grid h-[88px] w-[88px] place-items-center rounded-full border-[3px] border-white/72 bg-white/34 shadow-[0_8px_24px_rgba(48,18,74,0.08)]">
          {step.iconImage ? (
            <div className="grid h-[64px] w-[64px] place-items-center">
              <OptimizedImage src={step.iconImage} alt="" className="h-full w-full object-contain scale-[2.0]" aria-hidden="true" />
            </div>
          ) : (
            <div className="grid h-[64px] w-[64px] place-items-center rounded-full bg-white shadow-[0_10px_22px_rgba(48,18,74,0.12)]">
              {Icon ? <Icon className="h-8 w-8 text-pink" /> : null}
            </div>
          )}
          <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full border-[3px] border-white bg-pink text-[12px] font-black text-white shadow-[0_4px_10px_rgba(236,19,119,0.22)]">
            {step.number}
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-[18px] font-black text-ink leading-tight">{step.title}</h3>
        <p className="mt-2 text-[14px] font-semibold leading-[1.45] text-[#403a62]">{step.body}</p>
      </div>
    </article>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <article className="relative min-h-[186px] rounded-[16px] border border-pink/8 bg-white/82 p-6 shadow-[0_18px_44px_rgba(48,18,74,0.08)] backdrop-blur-md">
      <div className="flex gap-1 text-pink" aria-label="Five star rating">
        {Array.from({ length: 5 }).map((_, index) => (
          <SmallStarIcon key={index} className="h-5 w-5" />
        ))}
      </div>
      <p className="mt-4 text-[15px] font-semibold leading-[1.6] text-[#322d55]">{testimonial.quote}</p>
      <div className="mt-6 flex items-center gap-4">
        <OptimizedImage src={testimonial.image} alt="" className="h-12 w-12 rounded-full object-cover" />
        <div>
          <h3 className="text-[16px] font-black text-ink">{testimonial.name}</h3>
          <p className="text-[14px] font-semibold text-[#5d547b]">{testimonial.location}</p>
        </div>
      </div>
      <span className="absolute bottom-4 right-7 text-[84px] font-black leading-none text-pink/10" aria-hidden="true">
        "
      </span>
    </article>
  );
}

function GalleryBookingCtaSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePreview, setActivePreview] = useState(null);

  const filteredGalleryItems = galleryZipItems;
  const hasHiddenItems = filteredGalleryItems.length > initialGalleryItems;
  const visibleGalleryItems = isExpanded ? filteredGalleryItems : filteredGalleryItems.slice(0, initialGalleryItems);

  return (
    <section className="relative overflow-hidden">
      <div id="gallery" className="content-auto relative isolate scroll-mt-6 overflow-hidden px-4 pb-5 pt-8 sm:px-8 lg:px-9 lg:pb-5 lg:pt-9">
        <OptimizedImage
          src="/assets/home-services/gallery-section-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-fill"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1660px]">
          <SectionEyebrow compact>Our work</SectionEyebrow>
          <div className="mx-auto max-w-[820px] text-center">
            <h2 className="mt-3 text-[30px] font-black leading-[1.04] text-ink sm:text-[42px] lg:text-[50px]">
              Moving Moments & <span className="text-pink">Success Stories</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[700px] text-[14px] font-semibold leading-[1.55] text-[#403a62] sm:text-[15px]">
              Real moving projects, careful packing, coordinated teams, protected furniture, and happy customer handovers from homes and offices across the UAE.
            </p>
          </div>

          <div className="mx-auto mt-6 flex max-w-[820px] flex-wrap items-center justify-center gap-2.5">
            {galleryStats.map((stat) => (
              <GalleryStat key={stat.label} stat={stat} />
            ))}
          </div>

          {filteredGalleryItems.length > 0 ? (
            <div className="relative mt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {visibleGalleryItems.map((item, index) => (
                  <GalleryShowcaseCard
                    key={item.id}
                    item={item}
                    index={index}
                    isExpanded={isExpanded}
                    isInteractive
                    onPreview={() => setActivePreview(item)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {hasHiddenItems ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                aria-expanded={isExpanded}
                className="premium-cta control-ease group inline-flex h-[46px] min-w-[148px] items-center justify-center gap-2.5 rounded-[12px] bg-ink px-5 text-[13px] font-black text-white shadow-[0_14px_34px_rgba(21,6,55,0.18)] hover:-translate-y-1 hover:bg-violet focus-visible:outline-pink"
              >
                <span>{isExpanded ? "Show Less" : "Show More"}</span>
                <ChevronDownIcon className={`h-4 w-4 transition duration-300 ${isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {activePreview ? <GalleryLightbox item={activePreview} onClose={() => setActivePreview(null)} /> : null}

      <BookingSection />
      <MoveFooterSection />
    </section>
  );
}

function BookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  async function handleBookingSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Collect all checked services (from the checkboxes named 'services')
    const services = formData.getAll('services');

    const payload = {
      name: (formData.get('full_name') || '').slice(0, 100),
      phone: (formData.get('phone_number') || '').slice(0, 20),
      email: (formData.get('email_address') || '').slice(0, 254),
      moving_from: (formData.get('moving_from') || '').slice(0, 200),
      moving_to: (formData.get('moving_to') || '').slice(0, 200),
      move_date: (formData.get('move_date') || '').slice(0, 10),
      preferred_time: (formData.get('preferred_time') || '').slice(0, 50),
      property_type: formData.get('property_type') || '',
      bedrooms: (formData.get('number_of_bedrooms') || '').slice(0, 20),
      services_needed: services.slice(0, 10),
      notes: (formData.get('notes') || '').slice(0, 1000),
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.status === 429) {
        setSubmitStatus('error');
        alert('Too many requests. Please wait a minute and try again.');
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
        alert(data.error || 'Failed to submit booking. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      alert('Connection error. Please check your internet connection.');
    } finally {
      // Add a cooldown to prevent rapid re-submission
      setTimeout(() => setIsSubmitting(false), 5000);
    }
  }

  return (
    <section id="quote" className="relative overflow-hidden bg-[#fff9fc] px-3 py-4 sm:px-5 lg:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff9fc_0%,#f9eff8_100%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1540px] rounded-[22px] border border-white/80 bg-white/66 px-5 py-6 shadow-[0_18px_54px_rgba(48,18,74,0.10)] backdrop-blur-xl sm:px-7 lg:px-8 lg:py-7">
        <SectionEyebrow>Schedule your move</SectionEyebrow>
        <div className="text-center">
          <h2 className="mt-1 text-[34px] font-black leading-[1.02] text-ink sm:text-[46px] lg:text-[52px]">
            Book <span className="text-pink">Your</span> Move
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] text-[14px] font-semibold leading-[1.5] text-[#403a62] sm:text-[16px]">
            Fill out the form below and our team will contact you shortly to confirm your move details.
          </p>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_370px] 2xl:grid-cols-[minmax(0,1fr)_410px]">
          <form onSubmit={handleBookingSubmit} className="booking-form rounded-[16px] border border-pink/10 bg-white/84 p-4 shadow-[0_16px_44px_rgba(48,18,74,0.07)] backdrop-blur-md sm:p-5 lg:p-5">
            <div className="grid gap-x-6 gap-y-2.5 md:grid-cols-2 xl:grid-cols-3">
              {bookingFields.map((field) => (
                <BookingField key={field.label} field={field} />
              ))}
            </div>

            <fieldset className="mt-3">
              <legend className="text-[13px] font-black leading-tight text-ink sm:text-[14px]">
                Services Needed <span className="font-semibold">(Select all that apply)</span>
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {bookingServices.map((service) => (
                  <ServiceCheckbox key={service.label} service={service} />
                ))}
              </div>
            </fieldset>

            <label className="mt-3 block">
              <span className="text-[13px] font-black leading-tight text-ink sm:text-[14px]">
                Additional Notes <span className="font-semibold">(Optional)</span>
              </span>
              <span className="mt-1.5 flex min-h-[44px] items-center gap-3 rounded-[8px] border border-[#ded8eb] bg-white/52 px-3.5 text-[#79729c] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-pink">
                <PenLineIcon className="h-4 w-4 shrink-0 text-[#837aa8]" />
                <textarea
                  name="notes"
                  maxLength={1000}
                  placeholder="Any special instructions or additional information..."
                  className="min-h-[28px] flex-1 resize-none bg-transparent py-1.5 text-[12px] font-semibold text-ink outline-none placeholder:text-[#79729c]"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="premium-cta control-ease mt-3 flex h-[44px] w-full items-center justify-center rounded-[10px] bg-ink px-5 text-[13px] font-black text-white shadow-[0_14px_30px_rgba(21,6,55,0.17)] hover:-translate-y-0.5 hover:bg-violet disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex-1">{isSubmitting ? 'Booking Your Move...' : 'Book My Move'}</span>
              <span className="grid h-6 w-6 place-items-center rounded-[8px] bg-white text-violet">
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </span>
            </button>

            {submitStatus === 'success' && (
              <p className="mt-3 text-center text-[12px] font-bold text-green-600">
                ✅ Booking submitted! We will contact you soon.
              </p>
            )}


            <p className="mt-2 flex items-center justify-center gap-2.5 text-center text-[11px] font-semibold text-[#6f6794] sm:text-[12px]">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pink/10 text-pink">
                <LockIcon className="h-3 w-3" />
              </span>
              No payment required. Our team will contact you to confirm your booking.
            </p>
          </form>

          <aside className="relative isolate overflow-hidden rounded-[16px] border border-pink/10 px-5 pb-2 pt-5 shadow-[0_16px_44px_rgba(48,18,74,0.055)] sm:px-6 xl:px-5 2xl:px-6">
            <OptimizedImage
              src="/assets/home-services/booking-benefits-background.webp"
              alt=""
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 -z-10 bg-white/18" aria-hidden="true" />

            <div className="relative text-center">
              <h3 className="text-[15px] font-black uppercase leading-tight text-pink 2xl:text-[16px]">Why book with us</h3>
              <span className="mx-auto mt-2 block h-0.5 w-9 rounded-full bg-pink" aria-hidden="true" />
            </div>

            <div className="relative mx-auto mt-4 grid max-w-[350px] gap-2 md:max-w-none md:grid-cols-2 xl:max-w-[340px] xl:grid-cols-1 2xl:max-w-[360px]">
              {bookingBenefits.map((benefit) => (
                <BookingBenefitCard key={benefit.title} benefit={benefit} />
              ))}
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}

function BookingField({ field }) {
  const Icon = field.icon;
  const fieldName = getFieldName(field.label);

  return (
    <label className="block">
      <span className="text-[12px] font-black leading-tight text-ink">
        {field.label} {field.required ? <span className="text-pink">*</span> : null}
        {field.optional ? <span className="font-semibold"> (Optional)</span> : null}
      </span>
      <span className="mt-1 flex h-[42px] items-center gap-2.5 rounded-[9px] border border-[#ded8eb] bg-white/72 px-3 text-[#79729c] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition focus-within:border-pink focus-within:bg-white">
        <Icon className="interactive-icon h-4 w-4 shrink-0 text-[#837aa8]" />
        {field.select ? (
          <>
            <select
              defaultValue=""
              aria-label={field.label}
              name={fieldName}
              required={field.required || false}
              className="min-w-0 flex-1 appearance-none bg-transparent text-[12px] font-semibold text-[#6f6794] outline-none"
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {field.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDownIcon className="h-3 w-3 shrink-0 text-violet" />
          </>
        ) : (
          <input
            type={field.type ?? "text"}
            aria-label={field.label}
            name={fieldName}
            required={field.required || false}
            maxLength={field.maxLength || 200}
            minLength={field.minLength || undefined}
            pattern={field.pattern || undefined}
            placeholder={field.placeholder}
            className="min-w-0 flex-1 bg-transparent text-[12px] font-semibold text-ink outline-none placeholder:text-[#79729c]"
          />
        )}
      </span>
    </label>
  );
}

function ServiceCheckbox({ service }) {
  const Icon = service.icon;

  return (
    <label className="flex min-h-[40px] cursor-pointer items-center gap-2.5 rounded-[9px] border border-[#ded8eb] bg-white/72 px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition hover:border-pink/60 hover:bg-white">
      <Icon className="interactive-icon h-4 w-4 shrink-0 text-[#837aa8]" />
      <span className="min-w-0 flex-1 text-[11px] font-bold leading-snug text-ink">{service.label}</span>
      <input type="checkbox" name="services" value={service.label} className="peer sr-only" aria-label={service.label} />
      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border border-[#ded8eb] bg-white peer-checked:border-pink peer-checked:bg-pink">
        <CheckIcon className="h-2.5 w-2.5 text-white" />
      </span>
    </label>
  );
}

function BookingBenefitCard({ benefit }) {
  const Icon = benefit.icon;

  return (
    <article className="flex min-h-[92px] items-center gap-3.5 rounded-[12px] border border-pink/8 bg-white/78 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(48,18,74,0.055)] backdrop-blur-md 2xl:min-h-[100px] 2xl:gap-4 2xl:px-4">
      {benefit.iconImage ? (
        <span className="interactive-icon grid h-[66px] w-[66px] shrink-0 place-items-center">
          <OptimizedImage src={benefit.iconImage} alt="" className="h-full w-full object-contain scale-[2.0]" aria-hidden="true" />
        </span>
      ) : (
        <span className="interactive-icon grid h-[58px] w-[58px] shrink-0 place-items-center rounded-[15px] bg-pink/10 text-pink 2xl:h-[66px] 2xl:w-[66px]">
          {Icon ? <Icon className="h-[32px] w-[32px] 2xl:h-[38px] 2xl:w-[38px]" /> : null}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h4 className="text-[14px] font-black leading-tight text-ink 2xl:text-[16px]">{benefit.title}</h4>
        <p className="mt-1.5 max-w-[205px] text-[12px] font-semibold leading-[1.42] text-[#17143b] 2xl:max-w-[220px] 2xl:text-[14px]">{benefit.body}</p>
      </div>
    </article>
  );
}

function MoveFooterSection() {
  return (
    <section id="contact" className="scroll-mt-6 bg-[#fff5fa] px-4 pb-0 pt-4 sm:px-6 lg:px-10 xl:px-14">
      <div className="relative isolate mx-auto max-w-[1320px] overflow-hidden rounded-[24px] border border-pink/10 bg-white px-5 py-5 shadow-[0_18px_42px_rgba(48,18,74,0.08)] sm:px-7 lg:px-8">
        <OptimizedImage
          src="/assets/home-services/cta-card-background.webp"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="text-center">
            <SectionEyebrow>Ready to move?</SectionEyebrow>
            <h2 className="mt-2 text-[28px] font-black leading-[1.03] text-ink sm:text-[38px] lg:text-[42px]">
              Let's Make Your Move
              <span className="block text-pink">Fast, Safe & Stress-Free!</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[590px] text-[13px] font-semibold leading-[1.5] text-[#403a62] sm:text-[15px]">
              Get a free quote today and experience the difference. Our team is ready to handle your move with care and professionalism.
            </p>

            <div className="mx-auto mt-4 grid max-w-[660px] gap-3 sm:grid-cols-3">
              {ctaHighlights.map((item) => (
                <CtaHighlight key={item.title} item={item} />
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <a href="#quote" className="premium-cta control-ease flex min-h-[76px] items-center gap-3 rounded-[15px] bg-white/86 p-3.5 text-ink shadow-[0_14px_34px_rgba(48,18,74,0.10)] backdrop-blur-md hover:-translate-y-0.5">
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[13px] bg-pink text-white shadow-[0_12px_22px_rgba(236,19,119,0.16)]">
                <QuoteIcon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-black">Book Now</span>
                <span className="mt-0.5 block text-[12px] font-semibold leading-snug text-[#17143b]">Fill out the form and we'll get back to you.</span>
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-pink text-white">
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </span>
            </a>

            <a href={contactDetails.primaryPhone.href} className="premium-cta control-ease flex min-h-[76px] items-center gap-3 rounded-[15px] bg-ink p-3.5 text-white shadow-[0_14px_34px_rgba(21,6,55,0.20)] hover:-translate-y-0.5 hover:bg-violet">
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[13px] bg-white text-pink">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-black">Call Us Now</span>
                <span className="mt-0.5 block text-[17px] font-black leading-tight">{contactDetails.primaryPhone.display}</span>
                <span className="mt-0.5 block text-[15px] font-black leading-tight">{contactDetails.secondaryPhone.display}</span>
                <span className="mt-0.5 block text-[11px] font-semibold text-white/85">We're available 24/7</span>
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-white text-violet">
                <ArrowRightIcon className="h-4.5 w-4.5" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <footer className="relative left-1/2 mt-4 w-screen -translate-x-1/2 overflow-hidden bg-[#111025] px-5 py-6 text-white sm:px-7 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(93,28,164,0.38)_0%,rgba(8,7,51,0)_36%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1700px]">
          <div className="grid gap-5 border-b border-white/20 pb-5 lg:grid-cols-[1.18fr_0.78fr_1fr_0.78fr_1.2fr]">
            <div>
              <OptimizedImage src="/assets/home-services/logo-transparent.webp" alt="Quick Professional Movers" className="h-[74px] w-auto object-contain" />
              <p className="mt-2.5 max-w-[270px] text-[13px] font-semibold leading-[1.5] text-white/88">
                Fast, careful, and reliable moving services for homes, offices, and everything in between.
              </p>
              <div className="mt-4 flex gap-3">
                <SocialLink label="Facebook" icon={FacebookIcon} />
                <SocialLink label="Instagram" icon={InstagramIcon} />
                <SocialLink label="Twitter" icon={TwitterIcon} />
                <SocialLink label="Website" icon={GlobeIcon} />
              </div>
            </div>

            <FooterLinkGroup title="Quick Links" links={footerQuickLinks} />
            <FooterLinkGroup title="Our Services" links={footerServices} />
            <FooterLinkGroup title="Company" links={footerCompany} />

            <div className="relative">
              <h3 className="text-[15px] font-black">Contact Info</h3>
              <ul className="mt-3 grid gap-2.5 text-[14px] font-semibold text-white/90">
                <FooterContactItem icon={PhoneIcon} text={contactDetails.primaryPhone.display} href={contactDetails.primaryPhone.href} />
                <FooterContactItem icon={PhoneIcon} text={contactDetails.secondaryPhone.display} href={contactDetails.secondaryPhone.href} />
                <FooterContactItem icon={MailIcon} text={contactDetails.companyMail} />
                <FooterContactItem icon={MapPinIcon} text={contactDetails.address} />
                <FooterContactItem icon={ClockIcon} text="24/7 Available" />
              </ul>
              <FooterMapGraphic />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 text-[12px] font-semibold text-white/86 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2020 Quick Professional Movers. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition hover:text-pink">Privacy Policy</a>
              <a href="#" className="transition hover:text-pink">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

function CtaHighlight({ item }) {
  const Icon = item.icon;

  return (
    <article className="flex items-center gap-2.5 text-left">
      {item.iconImage ? (
        <span className="interactive-icon grid h-[52px] w-[52px] shrink-0 place-items-center">
          <OptimizedImage src={item.iconImage} alt="" className="h-full w-full object-contain scale-[1.8]" aria-hidden="true" />
        </span>
      ) : (
        <span className="interactive-icon grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[12px] bg-white/88 text-pink shadow-[0_8px_18px_rgba(48,18,74,0.07)]">
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
      )}
      <span>
        <span className="block text-[12px] font-black text-ink">{item.title}</span>
        <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-[#403a62]">{item.body}</span>
      </span>
    </article>
  );
}

function FooterLinkGroup({ title, links }) {
  return (
    <div className="border-white/15 lg:border-l lg:pl-8">
      <h3 className="text-[15px] font-black">{title}</h3>
      <ul className="mt-3 grid gap-2 text-[13px] font-semibold text-white/82">
        {links.map((link) => (
          <li key={link}>
            <a href={getFooterLinkHref(link)} className="transition hover:text-pink">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContactItem({ icon: Icon, text, href }) {
  const content = (
    <>
      <Icon className="interactive-icon h-4.5 w-4.5 shrink-0 text-pink" />
      <span>{text}</span>
    </>
  );

  return (
    <li className="flex items-start gap-2.5">
      {href ? (
        <a href={href} className="flex items-start gap-2.5 transition hover:text-pink">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

function SocialLink({ label, icon: Icon }) {
  return (
    <a href="#" aria-label={label} className="premium-cta control-ease grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-pink">
      <Icon className="interactive-icon h-4 w-4" />
    </a>
  );
}

function FooterMapGraphic() {
  const dots = [
    [18, 34], [27, 30], [36, 32], [46, 37], [56, 30], [67, 34], [82, 40], [96, 36], [110, 42],
    [22, 50], [34, 48], [48, 52], [62, 49], [80, 58], [98, 55], [118, 60], [138, 50],
    [30, 70], [45, 68], [60, 74], [76, 70], [94, 78], [116, 76], [136, 82], [154, 74],
    [48, 92], [66, 96], [86, 92], [108, 100], [132, 98], [154, 104], [172, 92]
  ];

  return (
    <svg viewBox="0 0 210 130" className="mt-3 h-auto w-full max-w-[235px] text-violet/70" aria-hidden="true">
      {dots.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="2.2" fill="currentColor" opacity={index % 3 === 0 ? ".95" : ".55"}/>
      ))}
      <path d="M143 54c8 0 15 6 15 14 0 11-15 28-15 28s-15-17-15-28c0-8 7-14 15-14Z" fill="#ec1377" />
      <circle cx="143" cy="68" r="5" fill="white" />
    </svg>
  );
}

function GalleryStat({ stat }) {
  const Icon = stat.icon;

  return (
    <article className="group flex w-fit items-center gap-2.5 rounded-[12px] border border-white/80 bg-white/70 px-3 py-2.5 shadow-[0_12px_30px_rgba(91,22,100,0.06)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white">
      {stat.iconImage ? (
        <span className="interactive-icon grid h-11 w-11 shrink-0 place-items-center">
          <OptimizedImage src={stat.iconImage} alt="" className="h-full w-full object-contain scale-[1.8]" aria-hidden="true" />
        </span>
      ) : (
        <span className="interactive-icon grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[9px] bg-pink/10 text-pink transition duration-300 group-hover:bg-pink group-hover:text-white">
          {Icon ? <Icon className="h-4.5 w-4.5" /> : null}
        </span>
      )}
      <span>
        <span className="block text-[17px] font-black leading-none text-ink">{stat.value}</span>
        <span className="mt-0.5 block text-[10px] font-black uppercase tracking-[0.08em] text-[#6a5f8b]">{stat.label}</span>
      </span>
    </article>
  );
}

function GalleryShowcaseCard({ item, index, isExpanded, isInteractive, onPreview }) {
  const mediaSrc = item.src ?? item.image;

  return (
    <article
      className="group relative aspect-[4/3] overflow-hidden rounded-[14px] bg-white shadow-[0_12px_28px_rgba(21,6,55,0.10)] transition duration-300"
      style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
    >
      <button
        type="button"
        onClick={onPreview}
        tabIndex={isInteractive ? 0 : -1}
        aria-label={`Preview ${item.title}`}
        className="relative block h-full w-full text-left"
      >
        {item.video ? (
          <video
            src={mediaSrc}
            poster={getOptimizedAsset(item.poster)}
            muted
            playsInline
            preload="none"
            className="media-clean h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <OptimizedImage
            src={mediaSrc}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className="media-clean h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          />
        )}
        {item.video ? (
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 grid h-13 w-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-violet shadow-[0_14px_30px_rgba(21,6,55,0.18)] backdrop-blur-md transition duration-300 group-hover:scale-110">
            <PlayIcon className="h-6.5 w-6.5 translate-x-0.5" />
          </span>
        ) : null}
      </button>
    </article>
  );
}

function GalleryLightbox({ item, onClose }) {
  const mediaSrc = item.src ?? item.image;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/86 px-3 py-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${item.title} preview`}>
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close gallery preview" />
      <div className="relative z-10 inline-block max-h-[90vh] max-w-[94vw]">
        {item.video ? (
          <video
            src={mediaSrc}
            controls
            autoPlay
            muted
            playsInline
            onLoadedMetadata={(event) => {
              event.currentTarget.muted = true;
              event.currentTarget.volume = 0;
            }}
            onVolumeChange={(event) => {
              event.currentTarget.muted = true;
              event.currentTarget.volume = 0;
            }}
            className="block max-h-[90vh] max-w-[94vw] rounded-[12px] bg-black object-contain shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
          />
        ) : (
          <OptimizedImage
            src={mediaSrc}
            alt={item.alt}
            className="block max-h-[90vh] max-w-[94vw] rounded-[12px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
          />
        )}
        <button
          type="button"
          onClick={onClose}
          className="control-ease fixed right-4 top-4 z-[9999] overflow-hidden rounded-[10px] bg-white/94 px-3.5 py-2 text-[12px] font-black uppercase tracking-[0.08em] text-ink shadow-[0_12px_28px_rgba(0,0,0,0.24)] hover:-translate-y-0.5 hover:bg-pink hover:text-white sm:right-6 sm:top-6"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function SectionEyebrow({ children, compact = false }) {
  return (
    <div className={`mx-auto flex w-fit items-center text-pink ${compact ? "gap-3 text-[11px]" : "gap-4 text-[14px]"} font-black uppercase tracking-[0.12em]`}>
      <span className={`h-px bg-pink/25 ${compact ? "w-10" : "w-16"}`} aria-hidden="true" />
      <span className={`border-b-2 border-pink ${compact ? "pb-0.5" : "pb-1"}`}>{children}</span>
      <span className={`h-px bg-pink/25 ${compact ? "w-10" : "w-16"}`} aria-hidden="true" />
    </div>
  );
}

function DotPattern({ className }) {
  return (
    <svg viewBox="0 0 160 112" fill="none" className={className} aria-hidden="true">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, column) => (
          <circle key={`${row}-${column}`} cx={column * 18 + 4} cy={row * 14 + 4} r="2.4" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

function GalleryGridIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.4 4.4h5.2v5.2H4.4V4.4ZM14.4 4.4h5.2v5.2h-5.2V4.4ZM4.4 14.4h5.2v5.2H4.4v-5.2ZM14.4 14.4h5.2v5.2h-5.2v-5.2Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.2 5.6v12.8L18.6 12 8.2 5.6Z" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 8.1V6.7c0-.85.48-1.32 1.5-1.32h1.75V2.45A24 24 0 0 0 14.7 2.3c-2.55 0-4.3 1.55-4.3 4.4v1.4H7.5v3.28h2.9V21.7H14V11.38h2.82l.45-3.28H14Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.4 3.2h9.2a4.2 4.2 0 0 1 4.2 4.2v9.2a4.2 4.2 0 0 1-4.2 4.2H7.4a4.2 4.2 0 0 1-4.2-4.2V7.4a4.2 4.2 0 0 1 4.2-4.2Z" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="12" cy="12" r="3.65" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="16.85" cy="7.15" r="1.15" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M20.9 6.1c-.65.3-1.35.5-2.08.6a3.6 3.6 0 0 0 1.58-2 7.1 7.1 0 0 1-2.28.88A3.55 3.55 0 0 0 12 8c0 .28.03.55.1.8A10.1 10.1 0 0 1 4.8 5.1a3.55 3.55 0 0 0 1.1 4.75c-.58-.02-1.12-.18-1.6-.45v.05a3.55 3.55 0 0 0 2.85 3.48c-.3.08-.62.12-.95.12-.23 0-.45-.02-.67-.06a3.56 3.56 0 0 0 3.32 2.47 7.14 7.14 0 0 1-4.42 1.52c-.28 0-.57-.02-.85-.05A10.06 10.06 0 0 0 9.05 18.6c6.56 0 10.15-5.44 10.15-10.15v-.46c.7-.5 1.3-1.13 1.7-1.88Z" fill="currentColor" />
    </svg>
  );
}

function GlobeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="2.1" />
      <path d="M3.2 12h17.6M12 2.8c2.5 2.55 3.8 5.6 3.8 9.2s-1.3 6.65-3.8 9.2c-2.5-2.55-3.8-5.6-3.8-9.2S9.5 5.35 12 2.8Z" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 12.15a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4ZM4.7 20.35c.62-3.9 3.65-6.2 7.3-6.2s6.68 2.3 7.3 6.2H4.7Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneLineIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.05 4.1 9.8 2.95l2.08 4.72-1.67 1.22c.82 1.87 2.2 3.26 4.1 4.12l1.24-1.67 4.68 2.08-1.17 2.68c-.48 1.08-1.62 1.66-2.76 1.36C11.05 16.06 7.05 12.08 5.66 6.9c-.3-1.14.3-2.3 1.39-2.8Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.4 6.3h15.2a1.7 1.7 0 0 1 1.7 1.7v9.8a1.7 1.7 0 0 1-1.7 1.7H4.4a1.7 1.7 0 0 1-1.7-1.7V8a1.7 1.7 0 0 1 1.7-1.7Z" stroke="currentColor" strokeWidth="2.1" />
      <path d="m3.35 7.25 8.65 6.1 8.65-6.1" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21.2s7-5.7 7-11.25a7 7 0 1 0-14 0C5 15.5 12 21.2 12 21.2Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <circle cx="12" cy="9.85" r="2.35" stroke="currentColor" strokeWidth="2.1" />
    </svg>
  );
}

function BedIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.6 18.7V6.2M20.4 18.7v-5.3a3 3 0 0 0-3-3H3.6v8.3" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 10.4V8.8a2 2 0 0 1 2-2h2.7a2 2 0 0 1 2 2v1.6M3.6 15.2h16.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToolsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m4.3 19.7 6.35-6.35M13.3 10.7l6.4-6.4M15 4.2l4.8 4.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="m4.3 4.3 4.1 1.3 1.25 4.08-2.42 2.42-4.03-4.03 1.1-3.77ZM15.9 14.25l3.72 3.72a1.7 1.7 0 0 1-2.4 2.4l-3.72-3.72" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
    </svg>
  );
}

function ApplianceIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 3.6h12a1.8 1.8 0 0 1 1.8 1.8v15H4.2v-15A1.8 1.8 0 0 1 6 3.6Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M7.5 7.2h4.2M15.4 7.2h1.2M8 12.9h8M8 16h8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function DisassemblyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.3 3.8 4.2 6.9l4.9 4.9 3.1-3.1-4.9-4.9ZM14.8 11.3l5 5a2.2 2.2 0 1 1-3.1 3.1l-5-5" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M13.6 6.6h3.8v3.8M17.4 6.6 6.6 17.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToolIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m14.2 6.2 3.6-3.6 3.6 3.6-3.6 3.6M15.8 8.2 5.5 18.5a2.1 2.1 0 0 1-3-3L12.8 5.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="6.5" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

function PenLineIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.2 19.8h15.6M5.8 14.8 15.9 4.7a2.1 2.1 0 0 1 3 0l.4.4a2.1 2.1 0 0 1 0 3L9.2 18.2l-4.2.8.8-4.2Z" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.4 10.2V8a4.6 4.6 0 0 1 9.2 0v2.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M6.4 10.2h11.2a1.8 1.8 0 0 1 1.8 1.8v6.8a1.8 1.8 0 0 1-1.8 1.8H6.4a1.8 1.8 0 0 1-1.8-1.8V12a1.8 1.8 0 0 1 1.8-1.8Z" stroke="currentColor" strokeWidth="2.1" />
      <path d="M12 14.4v2.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="m3.2 8.2 3 3 6.6-6.6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m12 2.9 2.65 5.35 5.9.86-4.27 4.16 1 5.88L12 16.37l-5.28 2.78 1-5.88-4.27-4.16 5.9-.86L12 2.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SmallStarIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="m10 1.9 2.34 4.74 5.23.76-3.78 3.68.89 5.2L10 13.82l-4.68 2.46.9-5.2L2.42 7.4l5.24-.76L10 1.9Z" fill="currentColor" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5h14a1.8 1.8 0 0 1 1.8 1.8v12A1.8 1.8 0 0 1 19 20.6H5a1.8 1.8 0 0 1-1.8-1.8v-12A1.8 1.8 0 0 1 5 5Z" stroke="currentColor" strokeWidth="2.1" />
      <path d="M7.5 3.4v4M16.5 3.4v4M3.8 9.5h16.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M7.4 12.6h2.3v2.3H7.4v-2.3Zm4.45 0h2.3v2.3h-2.3v-2.3Zm4.45 0h2.3v2.3h-2.3v-2.3Zm-8.9 4.25h2.3v2.3H7.4v-2.3Zm4.45 0h2.3v2.3h-2.3v-2.3Z" fill="currentColor" />
    </svg>
  );
}

function UsersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9.6 12.1a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2ZM3.1 20.2c.5-3.42 3.2-5.65 6.5-5.65s6 2.23 6.5 5.65H3.1Z" fill="currentColor" />
      <path d="M16.1 12.1a3.35 3.35 0 1 0-.7-6.62 5.55 5.55 0 0 1-.02 6.52c.23.07.47.1.72.1ZM16.55 14.55c2.53.16 4.6 2.12 5.05 5.08h-3.78a7.82 7.82 0 0 0-2.5-4.72c.4-.2.82-.32 1.23-.36Z" fill="currentColor" />
    </svg>
  );
}

function FastClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12.4 5.2a7.2 7.2 0 1 1-5.7 11.6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M12.4 8.2v4.5l3 1.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.7 7.2h4.7M1.7 11.2h4.8M3 15.2h4.1" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function CheckShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2.6 20.2 6v5.7c0 4.85-3.22 8.16-8.2 9.7-4.98-1.54-8.2-4.85-8.2-9.7V6L12 2.6Z" fill="currentColor" />
      <path d="m8.2 12 2.25 2.2 5.15-5.3" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4.2 13.4v-1.8a7.8 7.8 0 0 1 15.6 0v1.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M5.25 11.75h2.2v5.55h-2.2a2.05 2.05 0 0 1-2.05-2.05V13.8a2.05 2.05 0 0 1 2.05-2.05ZM18.75 17.3h-2.2v-5.55h2.2a2.05 2.05 0 0 1 2.05 2.05v1.45a2.05 2.05 0 0 1-2.05 2.05Z" fill="currentColor" />
      <path d="M19.4 17.1c-.65 2.25-2.35 3.25-5.1 3.25h-1.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M11.1 20.35h2.3" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function SolidTruckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2.8 6.3h11.5v8.5H2.8V6.3ZM14.3 9.4h3.9l3 3.1v2.3h-6.9V9.4Z" fill="currentColor" />
      <path d="M6.4 19.2a2.35 2.35 0 1 0 0-4.7 2.35 2.35 0 0 0 0 4.7ZM17.8 19.2a2.35 2.35 0 1 0 0-4.7 2.35 2.35 0 0 0 0 4.7Z" fill="#150637" />
      <path d="M6.4 17.9a1.05 1.05 0 1 0 0-2.1 1.05 1.05 0 0 0 0 2.1ZM17.8 17.9a1.05 1.05 0 1 0 0-2.1 1.05 1.05 0 0 0 0 2.1Z" fill="white" />
    </svg>
  );
}

function HouseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 11.2 12 3.6l9 7.6-1.55 1.85L12 6.75l-7.45 6.3L3 11.2Z" fill="currentColor" />
      <path d="M5.45 11.95V21h13.1v-9.05L12 6.45l-6.55 5.5Z" fill="currentColor" opacity=".82" />
      <path d="M9.2 21v-5.5h5.6V21" fill="#150637" opacity=".92" />
      <path d="M7.75 13.15h3.1v3.1h-3.1v-3.1ZM13.15 13.15h3.1v3.1h-3.1v-3.1Z" fill="white" opacity=".9" />
    </svg>
  );
}

function BuildingIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 21V4.8A1.8 1.8 0 0 1 5.8 3h7.4A1.8 1.8 0 0 1 15 4.8V21" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M15 9h3.8a1.8 1.8 0 0 1 1.8 1.8V21M7.4 7h1.7M11 7h1.7M7.4 10.8h1.7M11 10.8h1.7M7.4 14.6h1.7M11 14.6h1.7M17.4 13h1.1M17.4 16.4h1.1M3 21h18" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function OfficeChairIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 4.4h8a1.8 1.8 0 0 1 1.8 1.8v5.6a2.2 2.2 0 0 1-2.2 2.2H8.4a2.2 2.2 0 0 1-2.2-2.2V6.2A1.8 1.8 0 0 1 8 4.4Z" stroke="currentColor" strokeWidth="2.1" />
      <path d="M7.2 10.2H4.6A1.6 1.6 0 0 0 3 11.8v3.1A2.1 2.1 0 0 0 5.1 17H19a2 2 0 0 0 2-2v-3.2a1.6 1.6 0 0 0-1.6-1.6h-2.6M12 17v4M8 21h8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function SofaIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 10.2V7.8A2.8 2.8 0 0 1 9.8 5h4.4A2.8 2.8 0 0 1 17 7.8v2.4" stroke="currentColor" strokeWidth="2.1" />
      <path d="M5.4 10.1h13.2a2.6 2.6 0 0 1 2.6 2.6v4.8H2.8v-4.8a2.6 2.6 0 0 1 2.6-2.6Z" fill="currentColor" opacity=".18" />
      <path d="M4.8 10.4a2 2 0 0 0-2 2v5.1h18.4v-5.1a2 2 0 0 0-4 0v2H6.8v-2a2 2 0 0 0-2-2ZM5 17.5V20M19 17.5V20" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3.8 11.6V4.2h7.4l9 9a2.1 2.1 0 0 1 0 3l-3.4 3.4a2.1 2.1 0 0 1-3 0l-10-8Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M8 7.9h.02" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6.5h5M15 6.5h5M4 12h9M17.5 12H20M4 17.5h3M12 17.5h8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M11.8 8.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM15.2 14.3a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM9.7 19.8a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" stroke="currentColor" strokeWidth="2.1" />
    </svg>
  );
}

function CheckCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" fill="currentColor" />
      <path d="m6.8 10.05 2.05 2.05 4.35-4.35" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThumbIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8.1 20.2H5.2a1.7 1.7 0 0 1-1.7-1.7v-6.4a1.7 1.7 0 0 1 1.7-1.7h2.9v9.8ZM8.1 10.4l3.55-6.2c.4-.7 1.38-.78 1.9-.15.44.54.62 1.26.48 1.94l-.72 3.56h4.88a2.2 2.2 0 0 1 2.15 2.68l-1.17 5.25a3.4 3.4 0 0 1-3.31 2.66H8.1v-9.74Z" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 20.2h14" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M6.2 13.8 15.7 4.3a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 1 0 3l-9.5 9.5-4.8 1 1-5Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
    </svg>
  );
}

function DottedArrowIcon({ className }) {
  return (
    <svg viewBox="0 0 82 40" fill="none" className={className} aria-hidden="true">
      <path d="M4 20h48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 8" />
      <path d="m57 10 10 10-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3.25 20 6.1v5.95c0 4.6-3.12 7.95-8 9.7-4.88-1.75-8-5.1-8-9.7V6.1l8-2.85Z" stroke="currentColor" strokeWidth="2.1" />
      <path d="m8.8 12.1 2.1 2.2 4.5-5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.1" />
      <path d="M12 6.5v5.5l3.5 2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoxIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m12 2.9 8.1 4.4v9.4L12 21.1l-8.1-4.4V7.3L12 2.9Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="m4.35 7.65 7.65 4.3 7.65-4.3M12 21v-9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m8.2 5.1 7.7 4.3" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

function BadgeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m12 2.7 2.4 2 3.1-.25.9 3 2.65 1.7-1.25 2.85 1.25 2.85-2.65 1.7-.9 3-3.1-.25-2.4 2-2.4-2-3.1.25-.9-3-2.65-1.7L4.2 12 2.95 9.15 5.6 7.45l.9-3 3.1.25 2.4-2Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="m8.8 12.15 2.1 2.15 4.4-4.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7.1 4.2 9.7 3l2.05 4.65-1.65 1.2c.82 1.85 2.17 3.22 4.05 4.1l1.22-1.64L20 13.38l-1.16 2.6c-.48 1.08-1.62 1.66-2.76 1.36C10.98 16.02 7.05 12.1 5.7 7c-.3-1.15.3-2.3 1.4-2.8Z" fill="currentColor" />
    </svg>
  );
}

function TruckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 6h11v9H3V6Zm11 3h3.4l3.1 3.3V15H14V9Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M6.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17.7 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="2.1" />
    </svg>
  );
}

function WhatsappIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5.2 19.3 6.3 16A7.65 7.65 0 1 1 9 18.4l-3.8.9Z" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.1 8.4c.25-.33.55-.36.82-.2l.98 1.35c.17.24.15.56-.05.78l-.45.5c.58 1.02 1.36 1.8 2.48 2.42l.58-.55c.2-.2.53-.22.77-.05l1.3.92c.28.2.35.58.15.86-.5.7-1.1 1.02-1.8.92-2.58-.36-5.16-2.9-5.58-5.48-.1-.6.16-1.1.8-1.47Z" fill="currentColor" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 12H6M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}



