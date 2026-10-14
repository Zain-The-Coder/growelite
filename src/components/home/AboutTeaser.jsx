"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

// Lazy-load Three.js particle canvas with zero SSR overhead
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
});

const MANIFESTO_TEXT =
  "Most agencies sell templates and promises. We build digital growth systems that increase your revenue in 3 to 4 months.";

export default function AboutTeaser() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Trigger mounting when approaching the section to ensure smooth appearance
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      { rootMargin: "400px" }
    );

    // Track active visibility to pause rendering when off-screen
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    nearObserver.observe(el);
    viewObserver.observe(el);

    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

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
      {/* 3D Wireframe & Particle Sphere Animation (anchored to right half, fills empty area next to text) */}
      {isNearViewport && (
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[-6%] lg:right-[-4%] w-[85%] sm:w-[70%] lg:w-[52%] aspect-square max-w-[850px] pointer-events-none z-0 opacity-25 lg:opacity-100 transition-opacity duration-700"
          aria-hidden="true"
        >
          <HeroCanvas isPaused={!isInView} eventSource={containerRef} />
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-16 text-xs uppercase tracking-[0.25em] text-primary font-semibold">
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
                className="py-3 px-6 text-xs uppercase tracking-widest font-semibold border-white/20 hover:border-primary text-white hover:text-primary-light"
              >
                Our Complete Story
                <ArrowUpRight className="w-4 h-4 ml-1 text-primary" />
              </MagneticButton>

              <div className="flex items-center gap-3 text-white/50 text-xs uppercase font-medium tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span>Zero Templates • 100% Bespoke Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
