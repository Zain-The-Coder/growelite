"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Milestone } from "lucide-react";
import { aboutStory } from "@/data/site";

export default function JourneyTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion && lineRef.current) {
        // Draw the center/side timeline progress bar
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );

        // Animate each milestone dot and content on scroll
        const milestoneItems =
          containerRef.current.querySelectorAll(".milestone-row");
        milestoneItems.forEach((item) => {
          const dot = item.querySelector(".milestone-dot");
          const content = item.querySelector(".milestone-content");
          const stepNum = item.querySelector(".step-number");

          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0.5, opacity: 0.3, boxShadow: "none" },
              {
                scale: 1.25,
                opacity: 1,
                boxShadow: "0 0 16px var(--color-primary)",
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  end: "top 45%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (stepNum) {
            gsap.fromTo(
              stepNum,
              { y: 20 },
              {
                y: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 section-surface border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <Milestone className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>OUR JOURNEY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Evolution &amp; Milestones
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light">
            How we evolved from a hungry growth team into an end-to-end digital marketing and tech agency.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Track Line */}
          <div
            className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-1/2 bg-white/10"
            aria-hidden="true"
          />

          {/* Glowing Animated Progress Line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] origin-top shadow-[0_0_8px_var(--color-primary)]"
            aria-hidden="true"
          />

          {/* Milestones List */}
          <div className="space-y-12 md:space-y-24">
            {aboutStory.milestones.map((m, index) => {
              const isEven = index % 2 === 0;

              // Highlight "Abdul Basit" if present in description
              const renderDescription = (text) => {
                if (text.includes("Abdul Basit")) {
                  const parts = text.split("Abdul Basit");
                  return (
                    <>
                      {parts[0]}
                      <span className="text-gold-small font-semibold">
                        Abdul Basit
                      </span>
                      {parts[1]}
                    </>
                  );
                }
                return text;
              };

              return (
                <div
                  key={m.step}
                  className={`milestone-row relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  } border-b border-white/5 pb-10 sm:border-0 sm:pb-0`}
                >
                  {/* Left / Right Card Area */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                    <div
                      className={`milestone-content p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)]/40 transition-colors shadow-lg relative overflow-hidden group ${
                        isEven ? "md:text-left" : "md:text-left"
                      }`}
                    >
                      {/* Giant Parallax Step Number (Outlined) */}
                      <span
                        className="step-number absolute top-2 right-4 text-5xl sm:text-7xl font-mono font-black text-transparent select-none pointer-events-none opacity-20"
                        style={{
                          WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.4)",
                        }}
                        aria-hidden="true"
                      >
                        {m.step}
                      </span>

                      {/* Year badge */}
                      <div className="inline-block px-3 py-1 rounded-md bg-[var(--color-background)] border border-white/10 text-[11px] font-mono font-semibold uppercase tracking-widest text-[var(--color-primary-light)] mb-3">
                        {m.year} &bull; PHASE {m.step}
                      </div>

                      {/* Milestone Title (Poppins 600) */}
                      <h3 className="font-display text-xl sm:text-2xl font-semibold uppercase text-white tracking-tight mb-2">
                        {m.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
                        {renderDescription(m.description)}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot Indicator */}
                  <div
                    className="milestone-dot absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[var(--color-primary)] border-2 border-[var(--color-background)] z-10 transition-transform duration-300"
                    aria-hidden="true"
                  />

                  {/* Empty Spacer Column for Desktop Alternate Grid */}
                  <div className="hidden md:block w-1/2 md:px-12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
