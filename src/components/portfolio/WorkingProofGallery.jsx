"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShieldCheck, Calendar, Maximize2, Sparkles, Filter } from "lucide-react";

// Dynamic import of Lightbox for code-splitting
const ProofLightbox = dynamic(() => import("./ProofLightbox"), {
  ssr: false,
});

const TABS = ["All", "Meta", "Google", "TikTok", "Lead Gen"];

export default function WorkingProofGallery({ proofs = [] }) {
  const [activeTab, setActiveTab] = useState("All");
  const [activeProofIndex, setActiveProofIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter proofs by active tab
  const filteredProofs = proofs.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Lead Gen") {
      return item.tags?.includes("Lead Gen");
    }
    return item.platform === activeTab || item.tags?.includes(activeTab);
  });

  const openLightbox = (index) => {
    setActiveProofIndex(index);
  };

  const closeLightbox = () => {
    setActiveProofIndex(null);
  };

  const handlePrev = () => {
    if (activeProofIndex === null) return;
    setActiveProofIndex((prev) =>
      prev === 0 ? filteredProofs.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (activeProofIndex === null) return;
    setActiveProofIndex((prev) =>
      prev === filteredProofs.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      id="proof"
      className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 section-surface border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="ambient-glow top-1/4 -right-40 w-[600px] h-[600px] bg-[var(--color-primary-glow)] opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>TRANSPARENT TELEMETRY</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            Working proof
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light mb-2">
            Screenshots from the ad accounts we run.
          </p>

          <span className="inline-block text-xs font-mono text-[var(--color-primary-light)] tracking-wide">
            &bull; Click any screenshot to zoom in
          </span>
        </div>

        {/* Filter Tabs with Sliding Gold Indicator */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer ${
                  isActive ? "text-white font-bold" : "text-white/60 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProofFilter"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-full -z-10 shadow-md shadow-primary/20"
                  />
                )}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry / 2-Column Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProofs.map((item, index) => {
              const hasDate = Boolean(item.dateRange && item.dateRange.trim());
              const hasHighlights = Boolean(
                item.highlights && item.highlights.length > 0
              );

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.95, y: 20 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openLightbox(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                  tabIndex={0}
                  className="card relative rounded-2xl overflow-hidden p-0 group cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:border-[var(--color-border-primary)] hover:shadow-[0_0_40px_var(--color-primary-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] bg-[var(--color-surface)] shadow-xl"
                  data-cursor="pointer"
                  role="button"
                  aria-label={`View proof: ${item.title}`}
                >
                  {/* Browser-Style Top Frame */}
                  <div className="bg-[var(--color-navy-dark)] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                    {/* Three window control dots */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    {/* Simulated tab / URL pill */}
                    <div className="bg-black/30 px-3 py-1 rounded-md text-[10px] font-mono text-white/50 truncate max-w-[200px] sm:max-w-xs">
                      {item.platform.toLowerCase()}-ads.manager/telemetry
                    </div>

                    {/* Platform Tag */}
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-primary-light)]">
                      {item.platform}
                    </span>
                  </div>

                  {/* Screenshot Container (Light/clean backdrop so tables stay readable) */}
                  <div className="relative w-full aspect-[16/10] bg-[#f8fafc] overflow-hidden p-2 sm:p-3 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={`${item.title} ad account report`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={90}
                      className="object-contain p-1 rounded transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Hover Overlay with "View Full Size" Pill */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-primary)] text-white text-xs font-mono font-bold uppercase tracking-widest shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        <span>View full size</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom: Title, Date, Highlight Metrics */}
                  <div className="p-6 sm:p-7 space-y-4 bg-[var(--color-surface)]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight group-hover:text-[var(--color-primary-light)] transition-colors">
                        {item.title}
                      </h3>

                      {hasDate && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                          <span>{item.dateRange}</span>
                        </div>
                      )}
                    </div>

                    {/* Highlight Metrics Chips (Hidden if empty) */}
                    {hasHighlights && (
                      <div className="pt-2 border-t border-[var(--color-surface-border)] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {item.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-surface-border)]"
                          >
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-0.5 truncate">
                              {h.label}
                            </span>
                            <span className="text-gold-small font-display text-sm sm:text-base font-bold block truncate">
                              {h.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeProofIndex !== null && filteredProofs[activeProofIndex] && (
          <ProofLightbox
            proof={filteredProofs[activeProofIndex]}
            currentIndex={activeProofIndex}
            total={filteredProofs.length}
            onClose={closeLightbox}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
