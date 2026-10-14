"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import { aboutStory } from "@/data/site";

export default function AboutHero() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToStory = () => {
    const nextSection = document.getElementById("our-story");
    if (nextSection) {
      if (window.__lenis) {
        window.__lenis.scrollTo(nextSection, { offset: -40, duration: 1.2 });
      } else {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] w-full flex flex-col justify-between pt-36 pb-12 px-5 sm:px-8 md:px-12 overflow-hidden section-base border-b border-[var(--color-surface-border)]"
    >
      {/* Background Hero Glow & Slow-Moving Gradient */}
      <div className="hero-glow" />
      <div
        className="ambient-glow top-1/4 -left-36 w-[500px] h-[500px] bg-[var(--color-primary-glow)] opacity-30"
        aria-hidden="true"
      />
      <div
        className="ambient-glow bottom-10 -right-36 w-[550px] h-[550px] bg-[var(--color-primary-light)] opacity-20"
        aria-hidden="true"
      />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 sm:py-16">
        {/* Gold Label */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>{aboutStory.label}</span>
        </motion.div>

        {/* Giant Split-Text Headline with Gold Gradient Accent */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[1.12] tracking-tight text-white max-w-5xl mb-8">
          <SplitText type="words" delay={0.15} stagger={0.035}>
            We build digital growth systems that
          </SplitText>{" "}
          <span className="text-gradient inline-block">
            <SplitText type="words" delay={0.4} stagger={0.035}>
              increase your revenue in 3 to 4 months.
            </SplitText>
          </span>
        </h1>

        {/* Muted Subline */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed"
        >
          {aboutStory.subheadline}
        </motion.p>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-[var(--color-surface-border)] pt-6">
        <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/50">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span>EST. 2023 &bull; GLOBAL CLIENT ROSTER</span>
        </div>

        <button
          type="button"
          onClick={scrollToStory}
          className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors group cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-full px-2 py-1"
          data-cursor="pointer"
          aria-label="Scroll to our story"
        >
          <span className="hidden sm:inline">EXPLORE OUR STORY</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
}
