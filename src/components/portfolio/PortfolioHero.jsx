"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ShieldCheck, Layers, ArrowDown } from "lucide-react";
import SplitText from "@/components/ui/SplitText";

export default function PortfolioHero() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
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
      className="relative min-h-[85vh] w-full flex flex-col justify-between pt-36 pb-12 px-5 sm:px-8 md:px-12 overflow-hidden section-base border-b border-[var(--color-surface-border)]"
    >
      {/* Background Hero Glow & Atmosphere */}
      <div className="hero-glow" />
      <div
        className="ambient-glow top-1/4 -left-36 w-[500px] h-[500px] bg-[var(--color-primary-glow)] opacity-25"
        aria-hidden="true"
      />
      <div
        className="ambient-glow bottom-10 -right-36 w-[550px] h-[550px] bg-[var(--color-primary-light)] opacity-20"
        aria-hidden="true"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-10 sm:py-16 text-center sm:text-left">
        {/* Gold Label */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>OUR WORK</span>
        </motion.div>

        {/* Giant Split-Text Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.08] tracking-tight text-white mb-6">
          <SplitText type="words" delay={0.15} stagger={0.035}>
            Proof, not promises
          </SplitText>
        </h1>

        {/* Muted Subline */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10"
        >
          Real ad accounts, real budgets, real results. Here is the work behind our claims.
        </motion.p>

        {/* Quick Links */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center sm:justify-start gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection("proof")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)]/60 text-white text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all shadow-md group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer"
            data-cursor="pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
            <span>See the proof</span>
            <ArrowDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors ml-1" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("experience")}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white/80 hover:text-white text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer"
            data-cursor="pointer"
          >
            <Layers className="w-4 h-4 text-white/50 group-hover:text-[var(--color-primary-light)] transition-colors" />
            <span>Industries we&apos;ve worked in</span>
            <ArrowDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors ml-1" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between border-t border-[var(--color-surface-border)] pt-6 text-xs font-mono uppercase tracking-widest text-white/50">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span>VERIFIED AD ENGINE ARCHITECTURE</span>
        </div>
        <span className="hidden sm:inline">ZERO AFFILIATE • 100% DIRECT BRAND SCALE</span>
      </div>
    </section>
  );
}
