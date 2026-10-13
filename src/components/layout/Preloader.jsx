"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_NAME } from "@/data/site";
import Logo from "@/components/ui/Logo";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [removeDOM, setRemoveDOM] = useState(false);

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

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (removeDOM) return null;

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="fixed inset-0 z-[10000] pointer-events-none flex flex-col justify-between overflow-hidden select-none">
          {/* Top Curtain Panel */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-background flex flex-col justify-between p-8 sm:p-16 z-10 pointer-events-auto"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-xs sm:text-sm tracking-widest uppercase text-white/50 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                INIT SYSTEM
              </span>
              <span>CREATIVE TECH LAB</span>
            </div>

            {/* Center Animated Logo Reveal */}
            <div className="flex flex-col items-center justify-center text-center my-auto relative">
              {/* Luminous aura behind logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.15, 0.35, 0.2], scale: [0.8, 1.2, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-primary/20 via-primary-light/25 to-primary/10 blur-3xl pointer-events-none"
              />

              {/* 1. Symbol draws in & scales with spring/glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: -12, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 relative"
              >
                <div className="p-4 sm:p-5 rounded-3xl bg-white/95 shadow-2xl shadow-primary/30 border border-white/40 inline-flex items-center justify-center">
                  <Logo
                    markOnly
                    width={90}
                    height={90}
                    priority
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                </div>
              </motion.div>

              {/* 2. Wordmark slides up through overflow mask */}
              <div className="overflow-hidden py-1">
                <motion.div
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center"
                >
                  <div className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-white/95 shadow-2xl shadow-black/40 border border-white/40 inline-flex items-center justify-center">
                    <Logo
                      variant="dark"
                      priority
                      className="h-11 sm:h-13 md:h-15 w-auto"
                    />
                  </div>
                </motion.div>
              </div>

              {/* 3. Tagline expands */}
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.15em", y: 10 }}
                animate={{ opacity: 1, letterSpacing: "0.3em", y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-[10px] sm:text-xs uppercase text-white/60 font-mono tracking-[0.3em]"
              >
                DIGITAL INNOVATION &bull; ENGINEERING EXCELLENCE
              </motion.p>
            </div>

            {/* Bottom Progress Bar & Counter */}
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between font-mono">
                <span className="text-xs uppercase tracking-wider text-white/40">
                  BUILDING SHADERS & SCENARIO
                </span>
                <span className="text-3xl sm:text-5xl font-bold tabular-nums text-white">
                  {progress}
                  <span className="text-lg text-primary ml-1">%</span>
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-light"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Secondary curtain reveal accent layer */}
          <motion.div
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
