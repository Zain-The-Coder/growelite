"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const MANIFESTO_TEXT =
  "We reject generic corporate monotony. In an era saturated with commoditized templates, true brand velocity demands unreasonable aesthetic precision, custom interaction design, and unrelenting technical architecture. We transform ambitious enterprises into cultural juggernauts.";

export default function AboutTeaser() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      // Word-by-word progressive scrub reveal
      const words = containerRef.current.querySelectorAll(".scrub-word");
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2, color: "#475569" },
          {
            opacity: 1,
            color: "#ffffff",
            stagger: 0.15,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 40%",
              scrub: 0.8,
            },
          }
        );
      }

      // Parallax & Clip-path reveal for the visual showcase card
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: "polygon(0 15%, 100% 0%, 100% 85%, 0 100%)",
            y: 80,
          },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 1.2,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const words = MANIFESTO_TEXT.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span className="w-8 h-[1px] bg-primary" />
          <span>MANIFESTO & PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Progressive Scrub Text Column */}
          <div ref={textRef} className="lg:col-span-7 space-y-12">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.12] tracking-tight text-white">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="scrub-word inline-block mr-[0.25em] transition-colors duration-100"
                >
                  {word}
                </span>
              ))}
            </h2>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <MagneticButton
                href="/about"
                variant="outline"
                className="py-3 px-6 text-xs uppercase font-mono tracking-widest border-white/20 hover:border-primary text-white hover:text-primary-light"
              >
                Our Complete Story
                <ArrowUpRight className="w-4 h-4 ml-1 text-primary" />
              </MagneticButton>

              <div className="flex items-center gap-3 text-white/50 font-mono text-xs uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span>Zero Templates • 100% Bespoke Code</span>
              </div>
            </div>
          </div>

          {/* Parallax Card with Clip-Path Reveal */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface via-surface-elevated to-navy-dark border border-white/10 p-8 shadow-2xl transition-all duration-300"
            >
              {/* Graphic Composition Placeholder Visual */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tr from-primary/20 via-surface to-primary-light/10 flex flex-col justify-between p-8 border border-white/10">
                <div className="flex justify-between items-start font-mono text-xs text-white/60">
                  <span className="uppercase">EST. 2014 // LAB</span>
                  <span>SYSTEM // V.4</span>
                </div>

                {/* Geometric Central Monogram */}
                <div className="flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-24 h-24 rounded-full border border-primary/40 flex items-center justify-center relative mb-4 bg-navy-dark/60">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-primary-light opacity-80 animate-pulse" />
                    <span className="absolute font-display font-black text-2xl text-white">GE</span>
                  </div>
                  <span className="text-white font-display font-bold text-xl uppercase tracking-wider">
                    GROW ELITE
                  </span>
                  <span className="text-primary-light text-xs font-mono mt-1">
                    DIGITAL INNOVATION
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center font-mono text-xs text-white/50">
                  <span>LATENCY: 8.2MS</span>
                  <span className="text-primary-light font-bold">60 FPS LOCKED</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-mono text-white/60">
                <span className="uppercase text-white/80">CORE VALUES</span>
                <span className="text-primary-light">01 // RELENTLESS PERFECTION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
