"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Target, Zap, Users, Lightbulb, Compass } from "lucide-react";
import { valuesData } from "@/data/values";

const ICON_MAP = {
  Target,
  Zap,
  Users,
  Lightbulb,
};

function ValueCard({ item, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const IconComponent = ICON_MAP[item.icon] || Target;

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="card relative h-full min-h-[220px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300"
        data-cursor="pointer"
      >
        {/* Cursor-Following Gold Spotlight Glow */}
        {!shouldReduceMotion && isHovered && (
          <div
            className="pointer-events-none absolute w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl transition-opacity duration-300"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              background:
                "radial-gradient(circle, rgba(176, 119, 45, 0.28) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        <div>
          {/* Icon with Gold Badge */}
          <div className="w-12 h-12 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/50 transition-colors mb-6 shadow-sm">
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {/* Title (h3) */}
          <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
            {item.text}
          </p>
        </div>

        {/* Bottom subtle accent line */}
        <div className="h-0.5 w-8 bg-[var(--color-primary)]/40 group-hover:w-16 group-hover:bg-[var(--color-primary)] transition-all duration-300 mt-6" />
      </div>
    </motion.div>
  );
}

export default function ValuesGrid() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 section-dark border-b border-[var(--color-surface-border)] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="ambient-glow -top-32 right-1/4 w-[500px] h-[500px] bg-[var(--color-primary-glow)] opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>CORE VALUES</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            What Drives Us.
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light">
            Principles that guide every deployment, creative strategy, and client partnership.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {valuesData.map((item, index) => (
            <ValueCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
