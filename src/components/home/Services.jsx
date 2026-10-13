"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { servicesData } from "@/data/services";
import MagneticButton from "@/components/ui/MagneticButton";

function ServiceCard({ service, index, isActive, onToggle }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      className="relative rounded-2xl border border-white/10 bg-surface/80 backdrop-blur-md p-8 transition-transform duration-200 ease-out hover:border-primary/40 overflow-hidden group cursor-pointer"
      onClick={onToggle}
    >
      {/* Dynamic ambient accent glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        {/* Top header row */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-2xl font-black text-white/30 group-hover:text-primary transition-colors tabular-nums">
            {service.number}
          </span>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-primary-light group-hover:border-primary/40 transition-colors">
            <motion.div
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-sm font-mono text-primary-light mb-4 uppercase tracking-wider">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 font-light">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-white/5 border border-white/10 text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable deliverables on hover/click */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/10 pt-4 mt-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-3">
                KEY DELIVERABLES:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-mono text-white/80"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="ambient-glow top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <span className="w-8 h-[1px] bg-primary" />
              <span>CAPABILITIES & ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              WHAT WE ENGINEER.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-sm sm:text-base font-light">
            End-to-end creative technology solutions designed to replace fragmented agencies with one uncompromising partner.
          </p>
        </div>

        {/* 2-column or 3-column Service Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isActive={activeCard === index}
              onToggle={() => setActiveCard(activeCard === index ? null : index)}
            />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 text-center">
          <MagneticButton
            href="/services"
            variant="outline"
            className="py-4 px-8 text-xs font-mono tracking-widest border-white/20 hover:border-primary text-white hover:text-primary-light"
          >
            Explore Complete Service Catalog
            <ArrowUpRight className="w-4 h-4 ml-2 text-primary" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
