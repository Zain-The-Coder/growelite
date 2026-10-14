"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Cpu, TrendingUp, Palette } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

const quickCategories = [
  { label: "Marketing & Growth", target: "#marketing-growth", icon: TrendingUp },
  { label: "AI", target: "#ai", icon: Cpu },
  { label: "Creative", target: "#creative", icon: Palette },
  { label: "Development", target: "#development", icon: Layers },
];

export default function ServicesHero() {
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

  const scrollToCategory = (target) => {
    const el = document.querySelector(target);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -110, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] pt-36 sm:pt-44 pb-20 px-6 md:px-12 bg-boxes overflow-hidden flex flex-col justify-center items-center text-center"
    >
      {/* Hero Ambient Glow */}
      <div className="hero-glow" />

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-transform duration-200 ease-out"
        style={{
          background:
            "radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)",
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        {/* Small gold label */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full  mb-8 shadow-lg shadow-black/20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-small font-semibold">
            OUR SERVICES
          </span>
        </motion.div>

        {/* Giant split-text headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white max-w-4xl leading-[1.05] mb-8">
          <SplitText type="words" stagger={0.045} duration={0.8}>
            Everything your brand needs to grow ! One team
          </SplitText>
        </h1>

        {/* Muted line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12"
        >
          From custom software to AI voice agents, we design, build, and market digital products that turn attention into revenue.
        </motion.p>

        {/* Two CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16"
        >
          <MagneticButton
            href="/contact"
            variant="glow"
            className="text-xs sm:text-sm uppercase tracking-widest font-semibold py-4 px-8 rounded-full"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </MagneticButton>

          <MagneticButton
            href="/portfolio"
            variant="outline"
            className="text-xs sm:text-sm uppercase tracking-widest font-medium py-4 px-8 rounded-full"
          >
            See our work
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}