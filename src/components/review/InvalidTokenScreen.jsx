"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function InvalidTokenScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none bg-[var(--color-background)]">
      {/* Background Soft Gold Glow */}
      <div
        className="ambient-glow w-72 h-72 sm:w-96 sm:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md card p-6 sm:p-10 relative z-10 border border-[var(--color-border-secondary)] bg-[var(--color-surface)] shadow-2xl rounded-2xl text-center"
      >
        <div className="mb-6 flex justify-center">
          <Logo priority width={160} alt="GrowElite" className="w-[140px] sm:w-[160px] h-auto object-contain" />
        </div>

        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-primary-light)] mx-auto mb-5 shadow-inner">
          <AlertCircle className="w-7 h-7 text-[var(--color-primary)]" />
        </div>

        <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
          Unable to Access Review
        </h1>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
          This link is invalid, has expired, or has already been used.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl bg-[var(--color-surface-elevated)] hover:bg-white/10 border border-[var(--color-surface-border)] hover:border-[var(--color-primary)] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Return to GrowElite</span>
        </Link>
      </motion.div>
    </div>
  );
}
