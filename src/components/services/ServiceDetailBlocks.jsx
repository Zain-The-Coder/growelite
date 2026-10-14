"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import ServiceVisual from "@/components/services/ServiceVisuals";

function ServiceBlockItem({ service, index, isLast }) {
  const blockRef = useRef(null);
  const isEven = index % 2 === 0;

  // Parallax translation for large background number
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <article
      id={service.slug}
      ref={blockRef}
      className="scroll-mt-28 sm:scroll-mt-36 py-16 md:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
            isEven ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Text Content Column */}
          <div className="w-full lg:w-1/2 relative">
            {/* Parallax Outlined Number */}
            <motion.div
              className="absolute -top-14 -left-4 sm:-left-8 text-7xl sm:text-9xl font-display font-black text-transparent select-none pointer-events-none -z-10 opacity-20"
              style={{
                y: parallaxY,
                WebkitTextStroke: "2px rgba(176, 119, 45, 0.4)",
              }}
              aria-hidden="true"
            >
              {service.number}
            </motion.div>

            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 text-[11px] uppercase tracking-widest text-primary-light font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{service.category}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/50">SERVICE {service.number}</span>
            </div>

            {/* Service Title */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4 leading-[1.1]">
              {service.title}
            </h2>

            {/* Service Long Description */}
            <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed mb-8">
              {service.description}
            </p>

            {/* What's Included List */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>What&apos;s Included:</span>
              </h3>
              <ul className="space-y-2.5">
                {service.includes.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3 text-xs sm:text-sm text-white/85"
                  >
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary-light">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tools & Tech Chips */}
            <div className="mb-8">
              <h4 className="text-[11px] uppercase tracking-widest text-white/40 mb-3 font-medium">
                Tools &amp; Technologies:
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-surface-elevated/70 border border-white/10 hover:border-primary/40 text-white/80 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Expected Outcome Highlight Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border-l-4 border-primary border-y border-r border-white/5 mb-8">
              <div className="text-[10px] uppercase tracking-widest text-primary-light font-bold mb-1">
                EXPECTED IMPACT &amp; OUTCOME
              </div>
              <p className="text-xs sm:text-sm text-white font-medium">
                {service.outcome}
              </p>
            </div>

            {/* Action CTA Button */}
            <div>
              <MagneticButton
                href={`/contact?service=${service.slug}`}
                variant="primary"
                className="text-xs sm:text-sm uppercase tracking-wider font-semibold py-3.5 px-7 rounded-full shadow-lg shadow-primary/20"
              >
                Get this service
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>
            </div>
          </div>

          {/* Visual Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full relative">
              {/* Soft Ambient Background Glow */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl -z-10 opacity-50" />
              <ServiceVisual slug={service.slug} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border between services with animated gold gradient accent line */}
      {!isLast && (
        <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pointer-events-none">
          <div className="max-w-7xl mx-auto relative border-b border-[var(--color-surface-border)]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-[1px] left-0 right-0 h-[1px] origin-left pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(176, 119, 45, 0.4) 0%, rgba(176, 119, 45, 0.15) 35%, transparent 100%)",
              }}
            />
          </div>
        </div>
      )}
    </article>
  );
}

export default function ServiceDetailBlocks({ services = [] }) {
  // Category anchor targets for quick jumping
  const categoryAnchors = {
    Development: "development",
    AI: "ai",
    "Marketing & Growth": "marketing-growth",
    Creative: "creative",
  };

  return (
    <section className="relative z-10 bg-boxes">
      {/* Category Anchors injected transparently before first service of each category */}
      {services.map((service, index) => {
        const isFirstOfCategory =
          index === 0 || services[index - 1]?.category !== service.category;
        const anchorId = categoryAnchors[service.category];
        const isLast = index === services.length - 1;

        return (
          <div key={service.slug}>
            {isFirstOfCategory && anchorId && (
              <div id={anchorId} className="scroll-mt-28" />
            )}
            <ServiceBlockItem service={service} index={index} isLast={isLast} />
          </div>
        );
      })}
    </section>
  );
}
