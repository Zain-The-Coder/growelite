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
      className="relative py-36 px-6 md:px-12 bg-background overflow-hidden text-center flex flex-col items-center justify-center border-t border-white/5"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute w-[650px] h-[650px] rounded-full blur-[130px] opacity-25 transition-transform duration-200 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(176, 119, 45, 0.6) 0%, rgba(201, 141, 59, 0.2) 50%, transparent 70%)",
          transform: `translate(${mousePos.x - 325}px, ${mousePos.y - 325}px)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        {/* Top availability pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 font-mono text-xs uppercase tracking-widest text-primary-light"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>CURRENT SPRINT CAPACITY: OPEN</span>
        </motion.div>

        {/* Giant Headline */}
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.92] text-white mb-6">
          LET&apos;S BUILD SOMETHING{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            MONUMENTAL.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/70 max-w-xl text-base sm:text-xl font-light leading-relaxed mb-12">
          Have an ambitious roadmap or category-defining vision? Let&apos;s turn your digital presence into an unfair competitive advantage.
        </p>

        {/* Large Magnetic Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <MagneticButton
            href="/contact"
            variant="glow"
            className="text-sm uppercase tracking-widest font-bold py-5 px-10 rounded-full"
          >
            Schedule Discovery Call
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </MagneticButton>

          <a
            href={`mailto:${siteConfig.email}`}
            className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors underline underline-offset-4"
            data-cursor="pointer"
          >
            Direct Inquiry: {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
