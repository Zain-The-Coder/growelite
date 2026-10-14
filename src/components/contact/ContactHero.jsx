"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import { contactFormContent } from "@/data/contactForm";

export default function ContactHero() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { hero } = contactFormContent;

  return (
    <section
      ref={containerRef}
      className="relative pt-36 pb-12 sm:pb-16 px-5 sm:px-8 md:px-12 overflow-hidden section-base border-b border-[var(--color-surface-border)]"
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

      <div className="relative z-10 max-w-5xl mx-auto text-center sm:text-left">
        {/* Gold Label */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>{hero.label}</span>
        </motion.div>

        {/* Giant Split-Text Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.08] tracking-tight text-white mb-6">
          <SplitText type="words" delay={0.15} stagger={0.035}>
            {hero.headline}
          </SplitText>
        </h1>

        {/* Muted Subline */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed"
        >
          {hero.subline}
        </motion.p>
      </div>
    </section>
  );
}
