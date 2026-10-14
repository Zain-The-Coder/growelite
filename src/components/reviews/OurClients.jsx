"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import { clients } from "@/data/clients";

function ClientCard({ client, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Extract initials for monogram badge
  const initials = client.name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const hasMetrics = Boolean(client.results && client.results.length > 0);

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
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`card relative h-full p-6 sm:p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-primary)] hover:shadow-[0_0_35px_var(--color-primary-muted)] ${
          hasMetrics ? "border-t-2 border-t-[var(--color-primary)] shadow-md" : ""
        }`}
        data-cursor="pointer"
        tabIndex={0}
      >
        {/* Cursor-Following Gold Spotlight Glow */}
        {!shouldReduceMotion && isHovered && (
          <div
            className="pointer-events-none absolute w-60 h-60 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl transition-opacity duration-300"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              background:
                "radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10">
          {/* Card Top: Monogram / Logo badge + Industry chip */}
          <div className="flex items-start justify-between gap-4 mb-6">
            {client.logo ? (
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--color-surface-elevated)] ring-2 ring-[var(--color-primary)]/50 shrink-0">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-elevated)] ring-2 ring-[var(--color-primary)]/50 flex items-center justify-center font-display font-black text-sm text-[var(--color-primary-light)] shrink-0 shadow-sm group-hover:ring-[var(--color-primary)] transition-all">
                {initials}
              </div>
            )}

            {/* Industry Chip */}
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-white/70 text-right">
              {client.industry}
            </span>
          </div>

          {/* Optional Gold Subtitle */}
          {client.subtitle && (
            <span className="text-gold-small text-xs font-mono uppercase tracking-widest font-semibold block mb-1">
              {client.subtitle}
            </span>
          )}

          {/* Client Name (h3, Poppins 600) */}
          <h3 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight mb-3">
            {client.name}
          </h3>

          {/* Description */}
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-6">
            {client.description}
          </p>
        </div>

        {/* Results Block for cards with metrics (Cover-Outfit & Nexsa) */}
        {hasMetrics && (
          <div className="relative z-10 pt-5 mt-4 border-t border-[var(--color-surface-border)] bg-[var(--color-background)]/50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-[1.2rem]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-primary-light)] font-bold mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>KEY PERFORMANCE METRICS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {client.results.map((res, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-surface-border)]"
                >
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    {res.label}
                  </span>
                  <span className="text-gold-small font-display text-base sm:text-lg font-bold block">
                    {res.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Outcome Line */}
            {client.outcome && (
              <div className="flex items-start gap-2 pt-2 text-xs text-white/80 leading-relaxed font-light">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-medium">Outcome:</strong>{" "}
                  {client.outcome}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function OurClients() {
  return (
    <section
      id="clients"
      className="relative py-24 sm:py-32 section-dark border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="ambient-glow top-1/4 -right-40 w-[600px] h-[600px] bg-[var(--color-primary-glow)] opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>PORTFOLIO DIRECTORY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Our clients.
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light">
            A selection of brands we&apos;ve helped grow through full-funnel acquisition, tech systems, and creative scale.
          </p>
        </div>

        {/* Marquee of Client Names with Edge Fade Masks */}
        <div className="relative w-full overflow-hidden mb-16 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface)]/40 py-4">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[var(--color-navy-dark)] to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[var(--color-navy-dark)] to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          <Marquee speed={36} pauseOnHover={true}>
            <div className="flex items-center">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-6 px-6 py-2 text-sm sm:text-base font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors shrink-0 select-none"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] inline-block" />
                </div>
              ))}
            </div>
          </Marquee>
        </div>

        {/* Responsive Grid of Client Cards: 3 col desktop, 2 col tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {clients.map((client, index) => (
            <ClientCard key={client.id} client={client} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
