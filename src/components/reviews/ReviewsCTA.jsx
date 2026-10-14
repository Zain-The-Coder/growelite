"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteConfig } from "@/data/site";

export default function ReviewsCTA() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-full box-border overflow-x-hidden py-24 sm:py-36 px-5 sm:px-8 md:px-12 section-base text-center flex flex-col items-center justify-center border-t border-[var(--color-surface-border)]"
    >
      {/* Decorative ambient radial gold glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="pointer-events-none absolute w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full blur-[100px] sm:blur-[130px] opacity-25 transition-transform duration-200 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(176, 119, 45, 0.6) 0%, rgba(201, 141, 59, 0.2) 50%, transparent 70%)",
            transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * 0.08}px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Small Line Above CTA */}
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[var(--color-primary-light)] font-semibold mb-4">
          Want to be our next success story?
        </p>

        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-8 text-xs font-mono uppercase tracking-widest text-white/80 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CURRENT SPRINT CAPACITY: OPEN</span>
        </div>

        {/* Headline */}
        <h2
          className="font-display font-black uppercase text-white mb-6 text-center break-normal [overflow-wrap:anywhere] max-w-full tracking-[-0.01em] sm:tracking-tighter"
          style={{
            fontSize: "clamp(2rem, 7vw, 4.5rem)",
            lineHeight: 1.05,
          }}
        >
          LET&apos;S BUILD SOMETHING{" "}
          <span className="text-gradient inline-block">
            MONUMENTAL
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 max-w-xl text-sm sm:text-lg md:text-xl font-light leading-relaxed mb-10 sm:mb-12 px-2">
          Have an ambitious roadmap or category-defining vision? Let&apos;s turn your digital presence into an unfair competitive advantage.
        </p>

        {/* Action Button & Email */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full max-w-full">
          <MagneticButton
            href="/contact"
            variant="glow"
            className="w-full max-w-[360px] text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest font-bold py-4 px-6 sm:py-5 sm:px-10 rounded-full"
          >
            <span className="text-center leading-snug">Schedule Discovery Call</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 ml-1.5" />
          </MagneticButton>

          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[11px] sm:text-xs font-medium uppercase tracking-wider sm:tracking-widest text-white/50 hover:text-white transition-colors underline underline-offset-4 text-center break-all max-w-full px-2"
            data-cursor="pointer"
          >
            Direct Inquiry: {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
