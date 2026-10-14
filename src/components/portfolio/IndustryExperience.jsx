"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import { experience } from "@/data/portfolio";

function ExperienceRow({ item, index }) {
  const shouldReduceMotion = useReducedMotion();
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative group border-b border-[var(--color-surface-border)] py-8 sm:py-10"
    >
      {/* Gold Accent Line that Draws In from Left on Scroll */}
      <motion.div
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-transparent origin-left"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start sm:items-center">
        {/* Outlined Number */}
        <div className="lg:col-span-1 shrink-0">
          <span
            className="font-mono text-3xl sm:text-5xl font-black text-transparent select-none opacity-40 group-hover:opacity-80 transition-opacity"
            style={{
              WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.45)",
            }}
          >
            {stepNumber}
          </span>
        </div>

        {/* Brand Name & Industry Chip */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-white group-hover:text-[var(--color-primary-light)] transition-all group-hover:translate-x-1.5 duration-300">
              {item.name}
            </h3>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[var(--color-primary-light)]">
            {item.industry}
          </span>
        </div>

        {/* Description */}
        <div className="lg:col-span-6">
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function IndustryExperience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 section-dark border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="ambient-glow top-1/3 -left-40 w-[600px] h-[600px] bg-[var(--color-primary-glow)] opacity-15"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>VERTICAL EXPERTISE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Industry experience.
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light">
            Hands-on work with real brands, across every stage of the funnel.
          </p>
        </div>

        {/* Experience Rows */}
        <div className="border-t border-[var(--color-surface-border)] mb-16">
          {experience.map((item, index) => (
            <ExperienceRow key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Closing Statement Card */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card p-8 sm:p-10 bg-[var(--color-surface)]/80 border border-[var(--color-surface-border)] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)] shrink-0 shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <p className="text-base sm:text-lg font-medium text-white/90 leading-relaxed">
            Across all of these, we built and ran full-funnel structures ourselves: creative testing, audiences, budgets, funnels, reporting, and decision making.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
