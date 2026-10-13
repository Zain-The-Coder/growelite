"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { projectsData } from "@/data/projects";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Only enable horizontal pinning on desktop/tablet (width >= 768px)
      mm.add("(min-width: 768px)", () => {
        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 160;

        const pinTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          pinTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Top Header Row inside the pinned section */}
      <div className="pt-16 pb-8 px-6 md:px-16 w-full max-w-7xl mx-auto flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span className="w-8 h-[1px] bg-primary" />
            <span>SELECTED ARCHIVES 2024–2025</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            FEATURED WORKS.
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">
            DRAG OR SCROLL HORIZONTALLY
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
        </div>
      </div>

      {/* Horizontal Scrolling Track */}
      <div className="w-full overflow-x-auto md:overflow-visible pb-12 pt-4 no-scrollbar">
        <div
          ref={trackRef}
          className="flex flex-nowrap gap-8 px-6 md:px-16 w-max items-center"
        >
          {projectsData.map((project, index) => (
            <Link
              key={project.id}
              href="/portfolio"
              className="group relative block w-[85vw] sm:w-[540px] md:w-[620px] rounded-3xl overflow-hidden bg-surface border border-white/10 hover:border-primary/50 transition-all duration-500 shrink-0 select-none shadow-2xl"
              data-cursor="view"
            >
              {/* Visual Presentation Card with Geometric Abstract Composition */}
              <div
                className={`relative h-[320px] sm:h-[400px] w-full bg-gradient-to-br ${project.gradient} p-8 flex flex-col justify-between overflow-hidden`}
              >
                {/* Ambient glow mesh */}
                <div
                  className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: project.color }}
                />

                {/* Top card metadata */}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/80">
                  <span className="uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    {project.client}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Center graphic artwork */}
                <div className="relative z-10 my-auto text-center py-6">
                  <h3 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-mono text-white/80 uppercase tracking-widest">
                    {project.category}
                  </p>
                </div>

                {/* Bottom card metric & arrow */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-4">
                  <span className="text-xs sm:text-sm font-mono font-bold text-white bg-black/50 px-3 py-1.5 rounded-lg border border-white/15">
                    {project.metrics}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Card Footer Detail Content */}
              <div className="p-6 sm:p-8 bg-navy-dark">
                <p className="text-white/70 text-sm leading-relaxed mb-4 font-light line-clamp-2">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono uppercase bg-white/5 text-white/60 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}

          {/* End Card - Explore All Archive */}
          <div className="w-[300px] sm:w-[380px] h-[480px] rounded-3xl border border-dashed border-white/20 bg-surface/40 p-8 flex flex-col justify-between items-center text-center shrink-0">
            <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center my-auto">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-2xl font-bold uppercase text-white mb-2">
                FULL ARCHIVE
              </h4>
              <p className="text-xs font-mono text-white/50 mb-6">
                Explore 40+ case studies across AI, e-commerce, and high-growth fintech.
              </p>
              <MagneticButton
                href="/portfolio"
                variant="primary"
                className="text-xs uppercase font-mono tracking-wider py-3 px-6"
              >
                View All Projects
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
