"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Calendar, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProofLightbox({
  proof,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  total,
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const containerRef = useRef(null);

  // Lock body scroll & Lenis
  useEffect(() => {
    if (window.__lenis) window.__lenis.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Keyboard navigation & close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Reset zoom & pan when switching proofs
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [proof?.id]);

  // Double click toggles zoom
  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.2);
    }
  };

  // Zoom controls
  const zoomIn = () => setScale((s) => Math.min(3.5, s + 0.5));
  const zoomOut = () =>
    setScale((s) => {
      const next = Math.max(1, s - 0.5);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((s) => Math.min(3.5, s + 0.25));
    } else {
      setScale((s) => {
        const next = Math.max(1, s - 0.25);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Pointer Drag for panning when zoomed in
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    if (scale > 1) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Touch Swipe for mobile navigation (when not zoomed)
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (scale === 1 && e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 100 && deltaTime < 400) {
        if (deltaX < 0) {
          onNext();
        } else {
          onPrev();
        }
      }
    }
  };

  if (!proof) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-xl flex flex-col justify-between select-none overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={proof.title}
    >
      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-black/40">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-primary-light)] font-bold block">
            {proof.platform} AD ACCOUNT PROOF &bull; {currentIndex + 1} OF {total}
          </span>
          <h4 className="font-display font-bold text-base sm:text-xl text-white tracking-tight truncate max-w-sm sm:max-w-xl">
            {proof.title}
          </h4>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/10">
            <button
              type="button"
              onClick={zoomOut}
              className="p-1.5 text-white/70 hover:text-white transition-colors rounded-full"
              aria-label="Zoom out"
              data-cursor="pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono px-1 text-white/50">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              className="p-1.5 text-white/70 hover:text-white transition-colors rounded-full"
              aria-label="Zoom in"
              data-cursor="pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {scale !== 1 && (
              <button
                type="button"
                onClick={resetZoom}
                className="p-1.5 text-[var(--color-primary-light)] hover:text-white transition-colors rounded-full"
                aria-label="Reset zoom"
                data-cursor="pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Close lightbox"
            data-cursor="pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Image Stage */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        className={`relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden ${
          scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
      >
        <div
          className="relative max-w-full max-h-full transition-transform duration-75 will-change-transform"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white p-1 sm:p-2 border border-white/20">
            <Image
              src={proof.image}
              alt={proof.title}
              width={1600}
              height={1000}
              priority
              quality={95}
              className="max-h-[68vh] sm:max-h-[72vh] w-auto h-auto object-contain select-none pointer-events-none rounded-lg"
            />
          </div>
        </div>

        {/* Previous / Next Arrow Buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Previous proof"
          data-cursor="pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Next proof"
          data-cursor="pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption & Highlights Bar */}
      <div className="relative z-20 px-4 sm:px-8 py-4 border-t border-white/10 bg-black/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Date range if present */}
        {proof.dateRange ? (
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>{proof.dateRange}</span>
          </div>
        ) : (
          <div />
        )}

        {/* Highlight Metrics */}
        {proof.highlights && proof.highlights.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {proof.highlights.map((h, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs"
              >
                <span className="text-white/50">{h.label}:</span>
                <span className="text-gold-small font-bold font-mono">
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
