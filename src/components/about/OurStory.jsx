"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Logo from "@/components/ui/Logo";
import { aboutStory } from "@/data/site";

export default function OurStory() {
  const containerRef = useRef(null);
  const p1Ref = useRef(null);

  useGSAP(
    () => {
      // Check reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Word-by-word highlight on the first paragraph
      const words = p1Ref.current?.querySelectorAll(".story-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.35, color: "#64748b" },
          {
            opacity: 1,
            color: "#ffffff",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: p1Ref.current,
              start: "top 80%",
              end: "bottom 45%",
              scrub: 0.6,
            },
          }
        );
      }

      // Staggered fade and slide up for subsequent paragraphs
      const nextParagraphs =
        containerRef.current.querySelectorAll(".story-para-entry");
      nextParagraphs.forEach((para) => {
        gsap.fromTo(
          para,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: para,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const p1Words = aboutStory.paragraphs[0]?.split(" ") || [];
  const remainingParas = aboutStory.paragraphs.slice(1);

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 section-dark border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] shadow-sm">
                <Logo markOnly width={36} height={36} className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[var(--color-primary)] font-semibold">
                ORIGINS &amp; PHILOSOPHY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Our Story
            </h2>

            <p className="text-sm font-mono uppercase tracking-wider text-white/50 max-w-sm hidden lg:block">
              Built on transparency, engineering rigor, and ruthless focus on client revenue.
            </p>
          </div>

          {/* Right Column: Paragraphs */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {/* Paragraph 1: Word-by-word scrub highlight */}
            <p
              ref={p1Ref}
              className="text-lg sm:text-2xl font-normal leading-relaxed text-white/90 tracking-tight"
            >
              {p1Words.map((word, idx) => (
                <span
                  key={idx}
                  className="story-word inline-block mr-[0.25em] transition-colors duration-100"
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Subsequent Paragraphs */}
            {remainingParas.map((text, idx) => {
              const isLast = idx === remainingParas.length - 1;
              return (
                <p
                  key={idx}
                  className={`story-para-entry text-base sm:text-lg leading-relaxed ${
                    isLast
                      ? "text-white font-semibold text-lg sm:text-xl border-l-2 border-[var(--color-primary)] pl-5 py-1"
                      : "text-white/70 font-light"
                  }`}
                >
                  {text}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
