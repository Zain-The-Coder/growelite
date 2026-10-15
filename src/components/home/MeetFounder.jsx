"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Quote, Award, ArrowUpRight, ShieldCheck } from "lucide-react";
import { founder } from "@/data/founder";
import Logo from "@/components/ui/Logo";

export default function MeetFounder() {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-boxes relative overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div
        className="ambient-glow top-1/4 -left-36 w-[550px] h-[550px] bg-primary/10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="ambient-glow bottom-10 -right-40 w-[500px] h-[500px] bg-primary-light/10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill & Heading */}
        <div className="mb-14 sm:mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/70 border border-white/10 text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-4 shadow-sm backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>LEADERSHIP & ROOTS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-white">FOUNDER</span>.
          </h2>
        </div>

        {/* Founder Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center rounded-3xl bg-surface/40 backdrop-blur-xl border border-white/10 p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle watermark quote icon in background */}
          <Quote className="absolute right-6 top-6 w-32 h-32 text-white/[0.02] pointer-events-none" />

          {/* Left Column: Founder Photo Card */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95, y: 20 }
              }
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-2xl p-1 bg-gradient-to-tr from-primary/50 via-white/10 to-primary-light/40 shadow-2xl group"
            >
              {/* Outer Glow */}
              <div
                className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl -z-10 group-hover:bg-primary/30 transition-colors duration-500"
                aria-hidden="true"
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-surface flex items-center justify-center">
                {!imageError ? (
                  <>
                    <Image
                      src={founder.image}
                      alt={`${founder.name}, ${founder.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 400px"
                      quality={92}
                      onError={() => setImageError(true)}
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={false}
                    />

                    {/* Gradient overlay at base of image for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-darker/90 via-navy-darker/20 to-transparent pointer-events-none" />

                    {/* Bottom Floating Badge inside image */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-primary-light font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-primary" />
                          <span>FOUNDING PILLAR</span>
                        </div>
                        <div className="text-xs font-bold text-white font-display uppercase tracking-wider">
                          GrowElite Agency
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 p-8 text-center bg-surface w-full h-full">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-md">
                      <Logo markOnly width={64} height={64} className="w-16 h-16" />
                    </div>
                    <span className="font-display text-lg font-bold text-white uppercase tracking-tight">
                      {founder.name}
                    </span>
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      {founder.role}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Founder Narrative & Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Name & Role */}
              <div className="mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-primary-light font-bold block mb-1">
                  {founder.role}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                  {founder.name}
                </h3>
              </div>

              {/* Founder Quote */}
              <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                <Quote className="w-6 h-6 text-primary-light mb-2 opacity-60" />
                <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium italic leading-relaxed">
                  &ldquo;{founder.quote}&rdquo;
                </p>
              </div>

              {/* Bio */}
              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light mb-6">
                {founder.bio}
              </p>
            </div>

            {/* Strategic Focus Chips */}
            <div>
              <span className="block text-[11px] uppercase font-mono tracking-widest text-white/40 mb-3 font-semibold">
                FOUNDATIONAL PRINCIPLES
              </span>
              <div className="flex flex-wrap gap-2.5">
                {founder.focus.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-white/80"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Stats / Milestones Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {founder.stats.map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="font-display text-lg sm:text-2xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-white/50 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold text-primary hover:text-primary-light transition-colors group"
              >
                <span>Discover GrowElite&apos;s Full Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
