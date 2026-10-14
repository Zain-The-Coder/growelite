"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteConfig } from "@/data/site";

export default function CTA() {
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
      className="relative w-full max-w-full box-border overflow-x-hidden py-24 sm:py-36 px-5 sm:px-8 md:px-12 bg-boxes text-center flex flex-col items-center justify-center border-t border-white/5"
    >
      {/* Decorative background wrapper - prevents horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="pointer-events-none absolute w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full blur-[100px] sm:blur-[130px] opacity-25 transition-transform duration-200 ease-out"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-glow) 0%, color-mix(in srgb, var(--color-primary-light) 20%, transparent) 50%, transparent 70%)",
            transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 200}px)`,
          }}
        />
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center box-border">
        {/* Top availability pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-8 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-primary-light max-w-full text-center flex-wrap"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <span className="break-words">CURRENT SPRINT CAPACITY: OPEN</span>
        </motion.div>

        {/* Fluid Responsive Headline */}
        <h2
          className="font-display font-black uppercase text-white mb-6 text-center break-normal [overflow-wrap:anywhere] max-w-full tracking-[-0.01em] sm:tracking-tighter"
          style={{
            fontSize: "clamp(1.9rem, 8.5vw, 5.5rem)",
            lineHeight: 1.05,
          }}
        >
          LET&apos;S BUILD SOMETHING{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light inline-block">
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
