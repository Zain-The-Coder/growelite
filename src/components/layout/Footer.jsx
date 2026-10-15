"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Sparkles } from "lucide-react";
import { SITE_NAME, siteConfig } from "@/data/site";
import Logo from "@/components/ui/Logo";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  const [timeNYC, setTimeNYC] = useState("");
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  const updateTime = () => {
  const options = {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  setTimeNYC(new Intl.DateTimeFormat([], options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-navy-darker bg-boxes text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="ambient-glow -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/15" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top summary row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Col 1: Agency mission & live time */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center mb-6 group transition-all duration-300 hover:scale-105"
              >
                <Logo
                  className="h-10 sm:h-12 w-auto transition-transform duration-300"
                />
              </Link>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs uppercase font-mono tracking-widest text-primary-light font-bold">
                  Accepting Select Projects for Q3/Q4
                </span>
              </div>
              <p className="text-lg sm:text-xl text-white/70 font-light max-w-lg leading-relaxed">
                We partner with bold founders and visionary executives to engineer award-winning brands and high-throughput digital software.
              </p>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-white/50 pt-4">
              <div>
                <span className="block text-white/30 text-[10px] uppercase">HQ — NYC</span>
                <span className="text-white font-medium">{timeNYC || "EST"} EDT</span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div>
                <span className="block text-white/30 text-[10px] uppercase">STATUS</span>
                <span className="text-primary-light font-medium">OPEN FOR COLLAB</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col space-y-3 font-mono text-sm">
            <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">
              DIRECTORY
            </span>
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors flex items-center justify-between group py-1"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom copyright & Back-to-Top bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 font-mono text-xs text-white/40">
          <div>
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <MagneticButton
              onClick={scrollToTop}
              variant="outline"
              className="py-2.5 px-4 text-xs font-mono tracking-wider flex items-center gap-2 rounded-full border-white/10 hover:border-white/40"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
