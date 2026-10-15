"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function SuccessScreen({ name = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const firstName = name.trim().split(" ")[0] || "Valued Client";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none bg-[var(--color-background)]">
      {/* Background Soft Gold Glow */}
      <div
        className="ambient-glow w-72 h-72 sm:w-96 sm:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md card p-6 sm:p-10 relative z-10 border border-[var(--color-border-primary)] bg-[var(--color-surface)] shadow-2xl rounded-2xl text-center"
      >
        <div className="mb-6 flex justify-center">
          <Logo priority width={160} alt="GrowElite" className="w-[140px] sm:w-[160px] h-auto object-contain" />
        </div>

        {/* Animated Gold Checkmark */}
        <motion.div
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-[var(--color-primary)]/20 border-2 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-light)] mx-auto mb-6 shadow-[0_0_30px_var(--color-primary-glow)]"
        >
          <Check className="w-8 h-8 text-[var(--color-primary)] stroke-[3]" />
        </motion.div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>Feedback Recorded</span>
        </span>

        <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
          Thank you, {firstName}!
        </h1>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
          Your review has been submitted and will help other forward-thinking brands discover what we build together.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-md"
        >
          <span>Visit Website</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
