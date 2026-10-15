"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Wallet, DollarSign, Layers, CheckCircle2 } from "lucide-react";
import Counter from "@/components/ui/Counter";

const PLATFORMS = [
  "Meta Ads",
  "TikTok Ads",
  "Snapchat Ads",
  "Google Ads (Search + P.Max)",
];

export default function BudgetManagement() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="budget"
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 section-surface border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="ambient-glow top-1/2 -right-40 -translate-y-1/2 w-[550px] h-[550px] bg-[var(--color-primary-glow)] opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <Wallet className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>FINANCIAL CAPACITY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Budget management
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light">
            We operate at scale with rigorous conversion optimization, algorithmic bidding, and complete attribution transparency.
          </p>
        </div>

        {/* Two Big Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: $20K to $25K */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card relative p-8 sm:p-12 overflow-hidden shadow-2xl group transition-all duration-300 hover:border-[var(--color-border-primary)] hover:shadow-[0_0_40px_var(--color-primary-muted)]"
          >
            {/* Corner Decorative Watermark */}
            <DollarSign className="absolute -bottom-6 -right-6 w-32 h-32 text-white/[0.02] pointer-events-none group-hover:text-[var(--color-primary)]/5 transition-colors" />

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary-light)] font-bold block mb-4">
                PEAK AD ACCOUNT SCALE
              </span>

              {/* Number display with Counter animation */}
              <div className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 flex items-baseline flex-wrap gap-1">
                {shouldReduceMotion ? (
                  <span>$20K to $25K</span>
                ) : (
                  <>
                    <span>$</span>
                    <Counter value={20} duration={2} />
                    <span>K to $</span>
                    <Counter value={25} duration={2.2} />
                    <span>K</span>
                  </>
                )}
              </div>

              <div className="h-1 w-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] mb-6 group-hover:w-24 transition-all duration-300" />

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Largest monthly budget managed on Meta Ads alone.
              </p>
            </div>
          </motion.div>

          {/* Card 2: $30K+ */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="card relative p-8 sm:p-12 overflow-hidden shadow-2xl group transition-all duration-300 hover:border-[var(--color-border-primary)] hover:shadow-[0_0_40px_var(--color-primary-muted)]"
          >
            {/* Corner Decorative Watermark */}
            <DollarSign className="absolute -bottom-6 -right-6 w-32 h-32 text-white/[0.02] pointer-events-none group-hover:text-[var(--color-primary)]/5 transition-colors" />

            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary-light)] font-bold block mb-4">
                MULTI-CHANNEL DEPLOYMENT
              </span>

              {/* Number display with Counter animation */}
              <div className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 flex items-baseline">
                {shouldReduceMotion ? (
                  <span>$30K+</span>
                ) : (
                  <Counter value={30} prefix="$" suffix="K+" duration={2.2} />
                )}
              </div>

              <div className="h-1 w-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] mb-6 group-hover:w-24 transition-all duration-300" />

              <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
                Managed spend per client, per month, across platforms.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Platform Chips */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {PLATFORMS.map((platform) => (
            <div
              key={platform}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-xs sm:text-sm font-medium text-white/80 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span>{platform}</span>
            </div>
          ))}
        </div>

        {/* Highlighted Sentence Under It */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border-l-4 border-l-[var(--color-primary)] border border-[var(--color-surface-border)] shadow-md">
          <p className="text-base sm:text-lg md:text-xl font-medium text-white leading-relaxed">
            We work with brands that sell their own products and services, not affiliate setups or dropshipping.
          </p>
        </div>
      </div>
    </section>
  );
}
