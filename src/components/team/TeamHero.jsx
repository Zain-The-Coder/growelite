"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Users, ArrowDown } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

export default function TeamHero() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToTeam = () => {
    const el = document.getElementById("team-grid");
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -40, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] w-full flex flex-col justify-between pt-36 pb-12 px-5 sm:px-8 md:px-12 overflow-hidden section-base border-b border-[var(--color-surface-border)]"
    >
      {/* Background Hero Glow */}
      <div className="hero-glow" />
      <div
        className="ambient-glow top-1/4 -left-36 w-[500px] h-[500px] bg-[var(--color-primary-glow)] opacity-25"
        aria-hidden="true"
      />
      <div
        className="ambient-glow bottom-10 -right-36 w-[550px] h-[550px] bg-[var(--color-primary-light)] opacity-20"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-10 sm:py-16 text-center sm:text-left">
        {/* Label */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm"
        >
          <Users className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>OUR SPECIALISTS &amp; LEADERSHIP</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.08] tracking-tight text-white mb-6">
          <SplitText type="words" delay={0.15} stagger={0.035}>
            The minds behind GrowElite
          </SplitText>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10"
        >
          A battle-tested team of media architects, software engineers, and creative strategists dedicated to turning attention into compounding commercial scale.
        </motion.p>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-6 flex items-center justify-between border-t border-white/10 text-xs font-mono text-white/40">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="uppercase tracking-widest text-white/70">
            Multidisciplinary Growth Squad
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToTeam}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
          data-cursor="pointer"
        >
          <span className="uppercase tracking-widest text-[11px]">Explore Roster</span>
          <ArrowDown className="w-3.5 h-3.5 text-primary group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
