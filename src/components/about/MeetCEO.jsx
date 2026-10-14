"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { UserCheck, Sparkles, Quote } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { ceo } from "@/data/ceo";

export default function MeetCEO() {
  const containerRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="ceo"
      ref={containerRef}
      className="relative py-24 sm:py-36 px-5 sm:px-8 md:px-12 section-base border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="ambient-glow top-1/2 -left-40 -translate-y-1/2 w-[550px] h-[550px] bg-[var(--color-primary-glow)] opacity-25"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill */}
        <div className="text-center sm:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <UserCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>MEET OUR CEO</span>
          </div>
        </div>

        {/* Featured Block: Desktop 40/60 Split, Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo Column (about 40% width on desktop) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.94, clipPath: "inset(10% 0 10% 0 round 1.5rem)" }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
                clipPath: "inset(0% 0 0% 0 round 1.5rem)",
              }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-2xl p-1.5 bg-gradient-to-tr from-[var(--color-primary)]/40 via-white/10 to-[var(--color-primary-light)]/40 shadow-2xl group"
            >
              {/* Outer soft glow */}
              <div
                className="absolute inset-0 rounded-2xl bg-[var(--color-primary)]/20 blur-xl -z-10 group-hover:bg-[var(--color-primary)]/30 transition-colors duration-500"
                aria-hidden="true"
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--color-surface)] flex items-center justify-center">
                {!imageError ? (
                  <Image
                    src={ceo.image}
                    alt="Abdul Basit, CEO of GrowElite"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    quality={90}
                    onError={() => setImageError(true)}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={false}
                  />
                ) : (
                  /* Fallback if photo is missing: logo mark centered on --color-surface background */
                  <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-[var(--color-surface)] w-full h-full">
                    <div className="p-4 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] shadow-md">
                      <Logo markOnly width={64} height={64} className="w-16 h-16" />
                    </div>
                    <span className="font-display text-lg font-bold text-white uppercase tracking-tight">
                      {ceo.name}
                    </span>
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      {ceo.role}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Text Column (about 60% width on desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center sm:text-left">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-2">
                {ceo.name}
              </h2>
              <p className="text-gold-small font-display text-lg sm:text-xl font-semibold uppercase tracking-wider">
                {ceo.role}
              </p>
            </div>

            {/* Subtle quote-style highlight line using story fact */}
            {ceo.highlight && (
              <div className="relative p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-left shadow-sm">
                <Quote className="w-6 h-6 text-[var(--color-primary-light)] mb-2 opacity-60" />
                <p className="text-white/90 text-base sm:text-lg font-medium italic leading-relaxed">
                  &ldquo;{ceo.highlight}&rdquo;
                </p>
              </div>
            )}

            {/* Bio text */}
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed">
              {ceo.bio}
            </p>

            {/* 3 Small Focus Area Chips */}
            <div className="pt-2">
              <span className="block text-xs uppercase font-mono tracking-widest text-white/40 mb-3 font-semibold text-center sm:text-left">
                STRATEGIC FOCUS
              </span>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                {ceo.focus.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-xs font-medium text-white/80 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
