"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  ArrowRight,
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
} from "lucide-react";
import { SITE_NAME, siteConfig } from "@/data/site";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import ServicesMegaMenu from "@/components/layout/ServicesMegaMenu";
import { megaMenuGrowthServices, megaMenuTechServices } from "@/data/services";
import { cn } from "@/lib/utils";

const mobileIconMap = {
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

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Desktop Mega Menu state
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesTriggerRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const handleCloseMegaMenu = useCallback(() => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsMegaMenuOpen(false);
  }, []);

  // Mega menu hover delay logic: 60ms open delay, 200ms close delay
  const handleServicesMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(true);
    }, 60);
  };

  const handleServicesMouseLeave = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const handleMegaMenuMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMegaMenuMouseLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect if user has scrolled past top
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide navbar when scrolling down fast, show when scrolling up
      if (currentScrollY > 200 && currentScrollY > lastScrollY && !isMobileMenuOpen) {
        setIsVisible(false);
        setIsMegaMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  // Close menus upon navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, [pathname]);

  // If navbar hides on scroll, automatically close mega menu
  useEffect(() => {
    if (!isVisible) {
      setIsMegaMenuOpen(false);
    }
  }, [isVisible]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: 1,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-12 bg-[#534a3a]/80 backdrop-blur-xl border-b border-[#c9a063]/20 overflow-visible",
          isScrolled
            ? "shadow-xl shadow-black/20 py-3 sm:py-3.5"
            : "shadow-md py-4 sm:py-5"
        )}
      >
        {/* Tech boxes grid background */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-40 rounded-none overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center transition-transform duration-300 hover:scale-105"
            data-cursor="pointer"
          >
            <Logo
              priority
              className={cn(
                "w-auto transition-all duration-300",
                isScrolled
                  ? "h-[56px] sm:h-[40px] md:h-[56px]"
                  : "h-[52px] sm:h-[50px] md:h-[88px]"
              )}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#192e41]/90 p-1.5 rounded-full border border-black/15 backdrop-blur-md shadow-md">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isServices = link.href === "/services";

              if (isServices) {
                return (
                  <div
                    key={link.href}
                    ref={servicesTriggerRef}
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                    className="relative inline-block"
                  >
                    <MagneticButton
                      href={link.href}
                      variant="nav"
                      aria-haspopup="true"
                      aria-expanded={isMegaMenuOpen}
                      onMouseEnter={handleServicesMouseEnter}
                      onMouseLeave={handleServicesMouseLeave}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown" || e.key === "Enter") {
                          setIsMegaMenuOpen(true);
                        }
                      }}
                      className={cn(
                        "text-xs uppercase tracking-wider font-medium transition-all duration-200 inline-flex items-center gap-1.5",
                        isActive || isMegaMenuOpen
                          ? "text-white bg-white/15 shadow-inner"
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-300 text-white/60",
                          isMegaMenuOpen && "rotate-180 text-primary-light"
                        )}
                      />
                    </MagneticButton>
                  </div>
                );
              }

              return (
                <MagneticButton
                  key={link.href}
                  href={link.href}
                  variant="nav"
                  className={cn(
                    "text-xs uppercase tracking-wider font-medium transition-all duration-200",
                    isActive
                      ? "text-white bg-white/15 shadow-inner"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                </MagneticButton>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton
              href="/contact"
              variant="default"
              className="text-xs uppercase tracking-wider font-semibold py-2.5 px-5 bg-[#192e41] hover:bg-[#122232] text-white border border-black/20 shadow-lg"
            >
              Let&apos;s Start Project
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#c9a063]" />
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#192e41] text-white border border-black/20 shadow-md hover:scale-105 transition-all"
            aria-label="Toggle menu"
            data-cursor="pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Desktop Services Mega Menu (Opens on hover) */}
      <ServicesMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={handleCloseMegaMenu}
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuMouseLeave}
        triggerRef={servicesTriggerRef}
      />

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 40px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99] bg-background bg-boxes flex flex-col justify-between p-6 sm:p-10 md:hidden overflow-y-auto"
          >
            <div className="pt-16 pb-8 flex flex-col gap-5">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-block mb-2 transition-transform duration-300 hover:scale-105"
              >
                <Logo
                  priority
                  className="h-[44px] sm:h-[50px] w-auto"
                />
              </Link>
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                NAVIGATION
              </span>

              {siteConfig.navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                const isServices = link.href === "/services";

                // In mobile menu, "Services" is an interactive accordion
                if (isServices) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.08,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-white/5 pb-3"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex-1",
                            isActive ? "text-primary" : "text-white/80 hover:text-white"
                          )}
                        >
                          {link.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          aria-expanded={isMobileServicesOpen}
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-primary transition-colors cursor-pointer"
                          aria-label="Toggle Services list"
                        >
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 transition-transform duration-300",
                              isMobileServicesOpen && "rotate-180 text-primary"
                            )}
                          />
                        </button>
                      </div>

                      {/* Mobile Accordion Sub-list */}
                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pt-4 space-y-4"
                          >
                            {/* Group 1: Growth, Creative & AI */}
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-small font-bold block mb-2">
                                GROWTH, CREATIVE &amp; AI
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {megaMenuGrowthServices.map((service, sIdx) => {
                                  const IconComponent =
                                    mobileIconMap[service.icon] || Megaphone;
                                  return (
                                    <motion.div
                                      key={service.slug}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: sIdx * 0.02, duration: 0.2 }}
                                    >
                                      <Link
                                        href={`/services#${service.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-primary/40 text-white/85 text-xs font-medium"
                                      >
                                        <div className="w-6 h-6 rounded-md bg-surface-elevated text-primary flex items-center justify-center shrink-0">
                                          <IconComponent className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="truncate">{service.title}</span>
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Group 2: Tech Services */}
                            <div>
                              <span className="font-mono text-[10px] uppercase tracking-widest text-gold-small font-bold block mb-2">
                                TECH SERVICES
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {megaMenuTechServices.map((service, sIdx) => {
                                  const IconComponent =
                                    mobileIconMap[service.icon] || Code2;
                                  return (
                                    <motion.div
                                      key={service.slug}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        delay: 0.16 + sIdx * 0.02,
                                        duration: 0.2,
                                      }}
                                    >
                                      <Link
                                        href={`/services#${service.slug}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-primary/40 text-white/85 text-xs font-medium"
                                      >
                                        <div className="w-6 h-6 rounded-md bg-surface-elevated text-primary flex items-center justify-center shrink-0">
                                          <IconComponent className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="truncate">{service.title}</span>
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* See All Services Link */}
                            <div className="pt-1">
                              <Link
                                href="/services"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary font-bold"
                              >
                                <span>See all services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.08,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight flex items-center justify-between group",
                        isActive ? "text-primary" : "text-white/80 hover:text-white"
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom info in mobile drawer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="border-t border-white/10 pt-6 flex flex-col gap-4 font-mono text-xs text-white/50"
            >
              <div className="flex justify-between items-center">
                <span>NEW YORK / TOKYO / BERLIN</span>
                <span className="text-primary-light font-bold">ACTIVE CLIENTS: 18</span>
              </div>
              <div className="flex gap-4">
                {siteConfig.socials.slice(0, 3).map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {soc.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
