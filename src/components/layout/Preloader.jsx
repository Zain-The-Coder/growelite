"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [removeDOM, setRemoveDOM] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Disable body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Stay active for 5 seconds on every page load / refresh
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("preloaderComplete"));

      // Remove from DOM after exit animations complete
      setTimeout(() => {
        setRemoveDOM(true);
      }, 1200);
    }, 5000);

    return () => {
      clearTimeout(timer);
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
          {/* Main Background Panel */}
          <motion.div
            key="curtain-panel"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-background flex flex-col items-center justify-center p-6 sm:p-10 z-10 pointer-events-auto overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none blur-3xl opacity-25 -z-10"
              style={{
                background:
                  "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Content Container */}
            <motion.div
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center max-w-2xl w-full mx-auto px-4 select-none"
            >
              {/* 1. Welcome Text */}
              <motion.h1
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
              >
                Welcome to <span className="text-primary">GrowElite</span>
              </motion.h1>

              {/* 2. Logo */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.94 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="my-6 sm:my-8 flex items-center justify-center relative"
              >
                <Logo
                  priority
                  width={200}
                  alt="GrowElite Logo"
                  className="w-[150px] sm:w-[180px] md:w-[210px] h-auto object-contain max-w-full drop-shadow-[0_0_24px_var(--color-primary-glow)]"
                />
              </motion.div>

              {/* 3. Agency Subtitle */}
              <motion.p
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] text-text-secondary font-medium"
              >
                digital marketing and tech agency
              </motion.p>

              {/* 4. Elegant Minimal 5s Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-44 sm:w-56 h-[2px] bg-white/10 rounded-full mt-10 overflow-hidden"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.8, ease: "easeInOut" }}
                  className="h-full bg-primary rounded-full shadow-[0_0_8px_var(--color-primary)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Secondary curtain reveal accent layer (brand primary color) */}
          <motion.div
            key="curtain-accent"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
            className="absolute inset-0 bg-primary z-[5]"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
