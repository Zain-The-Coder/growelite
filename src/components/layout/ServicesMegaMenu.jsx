"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Megaphone,
  Search,
  Share2,
  TrendingUp,
  Clapperboard,
  PenLine,
  Palette,
  Phone,
  Code2,
  Smartphone,
  ShoppingCart,
  LayoutDashboard,
  Layers,
  Box,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { megaMenuGrowthServices, megaMenuTechServices } from "@/data/services";

const iconMap = {
  Megaphone,
  Search,
  Share2,
  TrendingUp,
  Clapperboard,
  PenLine,
  Palette,
  Phone,
  Code2,
  Smartphone,
  ShoppingCart,
  LayoutDashboard,
  Layers,
  Box,
};

export default function ServicesMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  triggerRef,
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const menuRef = useRef(null);
  const itemsRef = useRef([]);
  const prevPathnameRef = useRef(pathname);

  // Close only if route ACTUALLY changes (not on initial mount!)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Close on window resize or user scroll
  useEffect(() => {
    if (!isOpen) return;

    const startScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - startScrollY) > 35) {
        onClose();
      }
    };

    const handleResize = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose]);

  // Keyboard accessibility: Escape to close, Arrow keys to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        if (triggerRef?.current) {
          triggerRef.current.focus();
        }
        return;
      }

      if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) {
        const focusable = itemsRef.current.filter(Boolean);
        if (focusable.length === 0) return;

        const currentIndex = focusable.indexOf(document.activeElement);
        let nextIndex = 0;

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          nextIndex = currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1;
          focusable[nextIndex]?.focus();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
          focusable[nextIndex]?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  // Click handler on item: closes menu and triggers Lenis smooth scroll if already on /services
  const handleItemClick = (slug) => {
    onClose();
    if (pathname === "/services") {
      const target = document.getElementById(slug);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: -90, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  // Motion variants
  const panelVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -12, scale: 0.98 },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          },
        },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          scale: 0.98,
          transition: {
            duration: 0.18,
            ease: "easeIn",
          },
        },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.04 + i * 0.02,
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  itemsRef.current = [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Page Dimming Backdrop (behind menu, doesn't block navbar hover) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 top-[70px] z-[80] bg-black/55 backdrop-blur-[2px] transition-opacity pointer-events-auto"
            aria-hidden="true"
          />

          {/* Mega Menu Wrapper with Invisible Hover Bridge */}
          <div
            className="fixed left-0 right-0 top-[60px] sm:top-[68px] z-[110] flex justify-center px-4 sm:px-6 pointer-events-none"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {/* The Floating Panel */}
            <motion.div
              ref={menuRef}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="region"
              aria-label="Services Navigation Menu"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              className="relative w-full max-w-[1020px] rounded-2xl bg-[var(--color-surface)]/95 backdrop-blur-2xl border border-[var(--color-surface-border)] shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_40px_var(--color-primary-glow)] overflow-visible pointer-events-auto mt-2"
            >
              {/* Invisible Hover Bridge above the panel connecting to navbar */}
              <div
                className="absolute -top-4 left-0 right-0 h-6 pointer-events-auto"
                aria-hidden="true"
              />

              {/* Top pointer notch pointing to Services */}
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-[var(--color-surface)] border-t border-l border-[var(--color-surface-border)] shadow-sm pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Two-Column Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 p-6 sm:p-7 gap-6 lg:gap-0">
                {/* Left Column (Growth, Creative & AI) - 8 items */}
                <div className="lg:col-span-8 lg:pr-7">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-small font-bold">
                      GROWTH, CREATIVE &amp; AI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {megaMenuGrowthServices.map((service, idx) => {
                      const IconComponent = iconMap[service.icon] || Megaphone;

                      return (
                        <motion.div
                          key={service.slug}
                          custom={idx}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            ref={(el) => (itemsRef.current[idx] = el)}
                            href={`/services#${service.slug}`}
                            onClick={() => handleItemClick(service.slug)}
                            className="group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.06] border border-transparent hover:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            data-cursor="pointer"
                          >
                            {/* Icon Box */}
                            <div className="w-9 h-9 rounded-xl bg-surface-elevated/90 border border-white/10 text-primary flex items-center justify-center shrink-0 transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-[0_0_12px_var(--color-primary-glow)] group-hover:scale-105">
                              <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                            </div>

                            {/* Text Info */}
                            <div className="flex-1 min-w-0 pr-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-primary-light transition-colors truncate">
                                  {service.title}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-1" />
                              </div>
                              <p className="text-[11px] text-white/55 font-light leading-snug line-clamp-1 mt-0.5">
                                {service.menuBlurb}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column (Tech Services) - 6 items */}
                <div className="lg:col-span-4 lg:pl-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 className="w-3.5 h-3.5 text-primary" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-small font-bold">
                        TECH SERVICES
                      </span>
                    </div>

                    <div className="space-y-1">
                      {megaMenuTechServices.map((service, idx) => {
                        const IconComponent = iconMap[service.icon] || Code2;
                        const overallIndex = megaMenuGrowthServices.length + idx;

                        return (
                          <motion.div
                            key={service.slug}
                            custom={overallIndex}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <Link
                              ref={(el) => (itemsRef.current[overallIndex] = el)}
                              href={`/services#${service.slug}`}
                              onClick={() => handleItemClick(service.slug)}
                              className="group flex items-center justify-between p-2 rounded-xl transition-all duration-200 hover:bg-white/[0.06] border border-transparent hover:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                              data-cursor="pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-surface-elevated/90 border border-white/10 text-primary flex items-center justify-center shrink-0 transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_var(--color-primary-glow)] group-hover:scale-105">
                                  <IconComponent className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-white group-hover:text-primary-light transition-colors truncate">
                                  {service.title}
                                </span>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-1" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar Spanning Both Columns */}
              <div className="border-t border-white/10 p-3.5 sm:p-4 px-6 sm:px-7 flex items-center justify-between bg-white/[0.02]">
                <Link
                  href="/services"
                  onClick={onClose}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary hover:text-primary-light font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1"
                >
                  <span>See all services</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  onClick={onClose}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1"
                >
                  <span>Start a project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-primary" />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
