"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { processSteps } from "@/data/process";

export default function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (!lineRef.current || !containerRef.current) return;

      // Draw vertical SVG progress line as user scrolls through the timeline
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 bg-boxes overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span className="w-6 h-[1px] bg-primary" />
            <span>OPERATIONAL RIGOR</span>
            <span className="w-6 h-[1px] bg-primary" />
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            OUR EXECUTION ENGINE.
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light">
            A battle-tested 4-phase methodology that removes guesswork and guarantees monumental delivery.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Glowing Animated Scroll Progress Line - Gold */}
          <div
            ref={lineRef}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-primary-light to-primary -translate-x-1/2 shadow-[0_0_12px_var(--color-primary-glow)]"
          />

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } gap-8 md:gap-16`}
                >
                  {/* Central Node Dot */}
                  <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-surface border-2 border-primary flex items-center justify-center z-20 shadow-[0_0_15px_var(--color-primary-glow)]">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Step Content Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-16 text-left" : "md:pr-16 text-left md:text-right"
                    }`}
                  >
                    <div className="p-8 rounded-2xl bg-surface/70 border border-white/10 hover:border-primary/40 transition-all duration-300 group">
                      <div
                        className={`flex items-center gap-4 mb-3 font-mono text-xs uppercase tracking-widest ${
                          isEven ? "justify-start" : "justify-start md:justify-end"
                        }`}
                      >
                        <span className="text-primary font-bold">{step.phase}</span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/40">STEP {step.step}</span>
                      </div>

                      <h3 className="font-display text-2xl font-bold uppercase text-white mb-3 group-hover:text-white transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                        {step.description}
                      </p>

                      <div
                        className={`flex flex-wrap gap-2 ${
                          isEven ? "justify-start" : "justify-start md:justify-end"
                        }`}
                      >
                        {step.deliverables.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase bg-white/5 border border-white/10 text-white/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Symmetry */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
