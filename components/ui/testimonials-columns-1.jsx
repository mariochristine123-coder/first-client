"use client";
import React from "react";

// Small star icon for rendering ratings
function SmallStarIcon({ className }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="m10 1.9 2.34 4.74 5.23.76-3.78 3.68.89 5.2L10 13.82l-4.68 2.46.9-5.2L2.42 7.4l5.24-.76L10 1.9Z" fill="currentColor" />
    </svg>
  );
}

export const TestimonialsColumn = ({ testimonials, duration = 35, className = "" }) => {
  // Duplicate the list of testimonials to ensure seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={`pause-hover relative w-full overflow-hidden py-6 ${className}`}>
      {/* Ambient fade-out gradients on both sides for premium aesthetics */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#fff9fc] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#fff9fc] to-transparent" />

      <div
        className="testimonials-track animate-marquee-horizontal flex gap-6"
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {duplicatedTestimonials.map((testimonial, i) => (
          <article
            key={i}
            className="relative flex min-h-[220px] w-[350px] shrink-0 flex-col justify-between rounded-[18px] border border-pink/8 bg-white/88 p-7 shadow-[0_14px_34px_rgba(48,18,74,0.07)] transition-all duration-300 hover:scale-[1.01] hover:border-pink/20 sm:w-[440px] sm:p-8"
          >
            <div>
              <div className="flex gap-1 text-pink" aria-label="Five star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SmallStarIcon key={index} className="h-5.5 w-5.5" />
                ))}
              </div>
              <p className="mt-5 text-[15px] sm:text-[16px] font-semibold leading-[1.6] text-[#322d55]">
                "{testimonial.quote || testimonial.text}"
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-[16px] font-black text-ink tracking-tight leading-5">{testimonial.name}</h3>
            </div>
            <span className="absolute bottom-3 right-8 text-[84px] font-black leading-none text-pink/5 select-none" aria-hidden="true">
              "
            </span>
          </article>
        ))}
      </div>
    </div>
  );
};
