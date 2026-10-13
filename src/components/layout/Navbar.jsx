"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { SITE_NAME, siteConfig } from "@/data/site";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Close mobile menu upon navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-12",
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-navy-darker/60 py-3 sm:py-3.5"
            : "bg-transparent py-5 sm:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo - 56-64px desktop, 44-48px mobile, min 40px scrolled */}
          <Link
            href="/"
            className="group flex items-center transition-transform duration-300"
            data-cursor="pointer"
          >
            <Logo
              variant="light"
              width={280}
              priority
              className={cn(
                "w-auto transition-all duration-300 group-hover:scale-105",
                isScrolled
                  ? "h-[40px] sm:h-[44px] md:h-[48px]"
                  : "h-[46px] sm:h-[56px] md:h-[64px]"
              )}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/70 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <MagneticButton
                  key={link.href}
                  href={link.href}
                  variant="nav"
                  className={cn(
                    "text-xs uppercase tracking-wider font-medium transition-all duration-200",
                    isActive
                      ? "text-white bg-white/10 shadow-inner"
                      : "text-white/70 hover:text-white"
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
              variant="primary"
              className="text-xs uppercase tracking-wider font-semibold py-2.5 px-5"
            >
              Let&apos;s Build
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-surface/80 text-white border border-white/15 backdrop-blur-md hover:border-primary/50 transition-colors"
            aria-label="Toggle menu"
            data-cursor="pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 40px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 40px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 40px)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[99] bg-background flex flex-col justify-between p-8 sm:p-12 md:hidden"
          >
            <div className="pt-16 flex flex-col gap-6">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-block mb-3"
              >
                <Logo
                  variant="light"
                  width={220}
                  className="h-[48px] sm:h-[56px] w-auto"
                />
              </Link>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary">
                NAVIGATION
              </span>
              {siteConfig.navLinks.map((link, index) => {
                const isActive = pathname === link.href;
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
                        "font-display text-4xl font-extrabold uppercase tracking-tight flex items-center justify-between group",
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
