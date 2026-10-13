"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { SITE_NAME, siteConfig } from "@/data/site";

// Lazy-load Three.js particle canvas with zero SSR overhead
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-radial from-primary/15 via-transparent to-transparent opacity-40 pointer-events-none" />
  ),
});

export default function Hero() {
  const containerRef = useRef(null);

  const scrollToExplore = () => {
    const nextSection = document.getElementById("marquee-section");
    if (nextSection) {
      if (window.__lenis) {
        window.__lenis.scrollTo(nextSection, { offset: -60, duration: 1.2 });
      } else {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 overflow-hidden bg-background"
    >
      {/* 3D Particle/Mesh Canvas */}
      <HeroCanvas />

      {/* Atmospheric lighting layers */}
      <div className="ambient-glow top-1/4 -left-40 w-[550px] h-[550px] bg-primary/20" />
      <div className="ambient-glow bottom-1/4 -right-40 w-[600px] h-[600px] bg-primary-light/10" />

      {/* Top Tagline Badge */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-primary/30 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-xs uppercase font-mono tracking-widest text-white/90">
            STRATEGY • DIGITAL ENGINEERING • WEBGL
          </span>
        </motion.div>
      </div>

      {/* Central Headline */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 md:py-16">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.92] text-white"
          >
            WE CRAFT DIGITAL
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white"
          >
            MONUMENTS
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5vw] font-black uppercase tracking-tighter leading-[0.92] text-white/90"
          >
            THAT COMMAND SCALE.
          </motion.h1>
        </div>

        {/* Subtitle & Mission Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 text-lg sm:text-xl text-white/70 font-light leading-relaxed max-w-xl"
          >
            {siteConfig.tagline}. We unite radical art direction with bleeding-edge technology to architect brands that win unfair market dominance.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-wrap items-center gap-4 md:justify-end"
          >
            <MagneticButton
              href="/portfolio"
              variant="primary"
              className="px-8 py-4 text-sm uppercase tracking-wider font-semibold"
            >
              Explore Portfolio
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>

            <MagneticButton
              href="/contact"
              variant="outline"
              className="px-7 py-4 text-sm uppercase tracking-wider font-medium"
            >
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar with Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-6">
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-white/40">
          <span>AWARDS: 48+ SOTD</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">GLOBAL CLIENTS</span>
        </div>

        <button
          type="button"
          onClick={scrollToExplore}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white transition-colors group cursor-pointer"
          data-cursor="pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </section>
  );
}
