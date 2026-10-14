"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { preloaderTagline } from "@/data/site";
import Logo from "@/components/ui/Logo";

const LINE1_WORDS = [
  {
    chars: [
      { char: "W", index: 0 },
      { char: "e", index: 1 },
      { char: "l", index: 2 },
      { char: "c", index: 3, flicker: "neon-flicker-a" },
      { char: "o", index: 4 },
      { char: "m", index: 5 },
      { char: "e", index: 6 },
    ],
  },
  {
    chars: [
      { char: "t", index: 7 },
      { char: "o", index: 8 },
    ],
  },
  {
    chars: [
      { char: "G", index: 9, flicker: "neon-flicker-b" },
      { char: "r", index: 10 },
      { char: "o", index: 11 },
      { char: "w", index: 12 },
      { char: "E", index: 13 },
      { char: "l", index: 14 },
      { char: "i", index: 15, flicker: "neon-flicker-c" },
      { char: "t", index: 16 },
      { char: "e", index: 17 },
    ],
  },
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [removeDOM, setRemoveDOM] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if session has already seen preloader
    const hasLoadedBefore = sessionStorage.getItem("has_seen_preloader");
    if (hasLoadedBefore) {
      setIsLoaded(true);
      setRemoveDOM(true);
      return;
    }

    // Disable body scroll during preload
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear realistic loader increments
      const jump = Math.floor(Math.random() * 12) + 4;
      current += jump;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        setTimeout(() => {
          setIsLoaded(true);
          document.body.style.overflow = "";
          sessionStorage.setItem("has_seen_preloader", "true");
          // Signal hero animations
          window.dispatchEvent(new CustomEvent("preloaderComplete"));
        }, 350);

        setTimeout(() => {
          setRemoveDOM(true);
        }, 1400);
      } else {
        setProgress(current);
      }
    }, 45);

    // Guaranteed fallback timeout so preloader can never hang or freeze
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      setIsLoaded(true);
      document.body.style.overflow = "";
      sessionStorage.setItem("has_seen_preloader", "true");
      window.dispatchEvent(new CustomEvent("preloaderComplete"));
      setTimeout(() => setRemoveDOM(true), 1200);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (removeDOM) return null;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div
          key="preloader-root"
          className="fixed inset-0 z-[10000] pointer-events-none flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Top Curtain Panel (Navy Brand Background) */}
          <motion.div
            key="curtain-panel"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-background flex flex-col items-center justify-center p-5 sm:p-10 z-10 pointer-events-auto overflow-hidden"
          >
            {/* SVG Displacement Filters for Electric Crackle Edge */}
            <svg
              className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                {/* Desktop: Scale 3.2, 2 octaves */}
                <filter
                  id="neon-electric-desktop"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                  colorInterpolationFilters="sRGB"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.045 0.08"
                    numOctaves="2"
                    result="noise"
                    seed="1"
                  >
                    <animate
                      attributeName="seed"
                      values="1;4;8;2;9;5;12;3;7;1"
                      dur="1.2s"
                      repeatCount="indefinite"
                      calcMode="discrete"
                    />
                    <animate
                      attributeName="baseFrequency"
                      values="0.04 0.075; 0.048 0.09; 0.042 0.08; 0.04 0.075"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="3.2"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                {/* Mobile: Scale 2, 1 octave for smooth 60fps */}
                <filter
                  id="neon-electric-mobile"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                  colorInterpolationFilters="sRGB"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.045 0.08"
                    numOctaves="1"
                    result="noise"
                    seed="1"
                  >
                    <animate
                      attributeName="seed"
                      values="1;5;2;7;3;6;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                      calcMode="discrete"
                    />
                  </feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="2"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>

            {/* Content Container (Fades out when load completes) */}
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center max-w-4xl w-full mx-auto px-5 select-none"
            >
              {/* 1. Logo: fades and scales in first with soft glow */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.88 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 sm:mb-8 flex items-center justify-center relative"
              >
                {/* Soft ambient glow behind logo */}
                <div
                  className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full pointer-events-none blur-2xl opacity-40 -z-10"
                  style={{
                    background:
                      "radial-gradient(circle, var(--color-neon) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <Logo
                  priority
                  width={220}
                  alt="GrowElite"
                  className="w-[160px] md:w-[220px] h-auto object-contain max-w-full drop-shadow-[0_0_24px_rgba(178,128,33,0.35)]"
                  style={{
                    width: "clamp(160px, 45vw, 220px)",
                    height: "auto",
                  }}
                />
              </motion.div>

              {/* 2. Neon Text block with breathing pulse */}
              <div className="neon-breathing-sign flex flex-col items-center justify-center text-center w-full">
                {/* Line 1: "Welcome to GrowElite" */}
                <h1 className="neon-tube-line1 text-[clamp(1.75rem,6.5vw,4.5rem)] leading-[1.15] text-center max-w-full">
                  {LINE1_WORDS.map((wordObj, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                      {wordObj.chars.map((charObj, cIdx) => {
                        const delay = 0.14 + charObj.index * 0.018;
                        return (
                          <span
                            key={cIdx}
                            className="inline-block neon-letter-item"
                            style={{ animationDelay: `${delay}s` }}
                          >
                            <span className={charObj.flicker || undefined}>
                              {charObj.char}
                            </span>
                          </span>
                        );
                      })}
                      {wIdx < LINE1_WORDS.length - 1 && (
                        <span className="inline-block w-[0.28em]">&nbsp;</span>
                      )}
                    </span>
                  ))}
                </h1>

                {/* Line 2: "Digital Marketing & Tech Agency" */}
                <motion.h2
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 6 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.54,
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="neon-tube-line2 mt-2 sm:mt-3 text-[clamp(0.8rem,2.6vw,1.5rem)] leading-snug text-center max-w-full"
                >
                  <span className="inline-block">Digital Marketing</span>{" "}
                  <span className="inline-block">&amp; Tech Agency</span>
                </motion.h2>
              </div>

              {/* 3. Simple White Tagline */}
              <motion.p
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.74,
                  duration: 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-6 sm:mt-8 font-sans font-normal text-[var(--text-primary)] text-[clamp(0.85rem,2.4vw,1.25rem)] tracking-normal text-center max-w-lg mx-auto leading-relaxed"
              >
                {preloaderTagline}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Secondary curtain reveal accent layer (brand primary color) */}
          <motion.div
            key="curtain-accent"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
            className="absolute inset-0 bg-primary z-[5]"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
