"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Smartphone,
  ShoppingBag,
  ShoppingCart,
  LayoutDashboard,
  Layers,
  Box,
  Mic,
  Phone,
  Target,
  Megaphone,
  Search,
  TrendingUp,
  Share2,
  Briefcase,
  Film,
  Clapperboard,
  PenTool,
  PenLine,
  Palette,
  Code2,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  Cpu,
  Smartphone,
  ShoppingBag,
  ShoppingCart,
  LayoutDashboard,
  Layers,
  Box,
  Mic,
  Phone,
  Target,
  Megaphone,
  Search,
  TrendingUp,
  Share2,
  Briefcase,
  Film,
  Clapperboard,
  PenTool,
  PenLine,
  Palette,
  Code2,
};

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[service.icon] || Cpu;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(service.slug);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -90, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="card relative h-full p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer select-none group bg-surface/90 border border-white/10 hover:border-primary/50"
        data-cursor="pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick(e);
          }
        }}
      >
        {/* Interactive Cursor Spotlight Glow */}
        <div
          className="pointer-events-none absolute w-[260px] h-[260px] rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)",
            transform: `translate(${mousePos.x - 130}px, ${mousePos.y - 130}px)`,
          }}
        />

        {/* Top Header: Number & Category & Arrow */}
        <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gold-small tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              {service.number}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-white/40 font-medium">
              {service.category}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-primary-light group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Middle: Icon & Title */}
        <div className="relative z-10 mb-6">
          <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_var(--color-primary-glow)] transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>

          <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-primary-light transition-colors mb-2">
            {service.title}
          </h3>

          <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed line-clamp-2">
            {service.tagline}
          </p>
        </div>

        {/* Bottom: Jump indicator with surface border */}
        <div className="relative z-10 pt-4 border-t border-[var(--color-surface-border)] flex items-center justify-between text-xs font-medium uppercase tracking-wider text-white/40 group-hover:text-white/80 transition-colors">
          <span>Explore Details</span>
          <span className="text-primary font-bold">→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({ services = [] }) {
  return (
    <section id="services-grid" className="py-20 px-6 md:px-12 relative z-10 border-b border-[var(--color-surface-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Section title & count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
              <span className="w-4 h-[1px] bg-primary" />
              <span>CAPABILITIES OVERVIEW</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Complete Service Index
            </h2>
          </div>
          <p className="text-white/50 text-xs uppercase tracking-widest font-medium">
            Showing {services.length} Specialized Capabilities
          </p>
        </div>

        {/* Dynamic Grid with Framer Motion layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
