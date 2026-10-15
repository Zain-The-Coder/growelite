"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import MagneticButton from "@/components/ui/MagneticButton";
import { servicesData } from "@/data/services";

export default function ServicesStrip() {
  return (
    <section className="relative py-20 sm:py-28 section-dark border-b border-[var(--color-surface-border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>FULL-SPECTRUM CAPABILITIES</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
          Engineered for Growth
        </h2>
      </div>

      {/* Infinite Services Marquee */}
      <div className="w-full my-6">
        <Marquee speed={35} pauseOnHover={true} className="py-2 border-y border-white/5 bg-[var(--color-surface)]/30">
          <div className="flex items-center">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="flex items-center gap-6 px-6 py-3 text-sm sm:text-base font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors group select-none shrink-0"
                data-cursor="pointer"
              >
                <span className="group-hover:text-[var(--color-primary-light)] transition-colors">
                  {service.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] inline-block" />
              </Link>
            ))}
          </div>
        </Marquee>
      </div>

      {/* Explore All Services Gold Button */}
      <div className="mt-10 flex justify-center px-4">
        <MagneticButton
          href="/services"
          variant="glow"
          className="text-xs sm:text-sm uppercase tracking-widest font-bold py-4 px-8 rounded-full"
        >
          <span>Explore All 14 Services</span>
          <ArrowUpRight className="w-4 h-4 ml-1.5 text-white" />
        </MagneticButton>
      </div>
    </section>
  );
}
