"use client";

import { motion } from "framer-motion";
import { Check, Clock, Sparkles, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { packagesData } from "@/data/packages";

export default function ServicesPackages() {
  return (
    <section className="py-28 px-6 md:px-12 relative z-10 bg-boxes border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/10 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED ENGAGEMENT MODELS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Packages &amp; Scopes
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light">
            Whether launching a rapid MVP or embedding an enterprise innovation pod, choose the scope built for your growth trajectory.
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packagesData.map((pkg, index) => {
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-surface-elevated/95 border-2 border-primary shadow-[0_0_40px_var(--color-primary-glow)] lg:-translate-y-3 z-10"
                    : "bg-surface/80 border border-white/10 hover:border-white/25"
                }`}
              >
                {/* Most Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-mono text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/30 flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                {/* Card Top: Package Info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white">
                      {pkg.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{pkg.turnaround}</span>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-primary-light font-medium mb-3">
                    {pkg.tagline}
                  </div>

                  <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/50 mb-8">
                    <span className="text-white/30 uppercase block text-[10px] tracking-wider mb-1">
                      Ideal For:
                    </span>
                    <span className="text-white/80">{pkg.idealFor}</span>
                  </div>

                  {/* Included Services */}
                  <div className="mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                      Included Capabilities:
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.includedServices.map((service, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-white/85"
                        >
                          <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 text-primary-light flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Deliverables */}
                  <div className="mb-8 pt-4 border-t border-white/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                      Key Deliverables:
                    </div>
                    <ul className="space-y-2">
                      {pkg.deliverables.map((deliv, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[11px] text-white/60 font-mono"
                        >
                          <span className="text-primary font-bold">•</span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 border-t border-white/10 mt-auto">
                  <MagneticButton
                    href={`/contact?package=${pkg.slug}`}
                    variant={isPopular ? "glow" : "default"}
                    className="w-full text-xs uppercase tracking-widest font-semibold py-4 rounded-full justify-center"
                  >
                    {pkg.ctaText}
                    <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
