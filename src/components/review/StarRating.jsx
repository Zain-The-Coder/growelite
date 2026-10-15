"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

// Particles for the 5-star burst animation
const BURST_PARTICLES = [
  { id: 1, x: -24, y: -24, scale: 0.9, delay: 0 },
  { id: 2, x: 0, y: -32, scale: 1.1, delay: 0.04 },
  { id: 3, x: 24, y: -24, scale: 0.8, delay: 0.08 },
  { id: 4, x: -32, y: 0, scale: 1, delay: 0.02 },
  { id: 5, x: 32, y: 0, scale: 1, delay: 0.06 },
  { id: 6, x: -20, y: 20, scale: 0.7, delay: 0.1 },
  { id: 7, x: 20, y: 20, scale: 0.9, delay: 0.05 },
];

export default function StarRating({ value = 0, onChange, error }) {
  const [hoverValue, setHoverValue] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeRating = hoverValue || value;

  const handleSelect = (rating) => {
    onChange(rating);
    if (rating === 5 && !shouldReduceMotion) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 900);
    }
  };

  const handleKeyDown = (e, starIndex) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(5, starIndex + 1);
      handleSelect(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(1, starIndex - 1);
      handleSelect(prev);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleSelect(starIndex);
    }
  };

  return (
    <div className="flex flex-col items-center select-none py-2">
      <span className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-3">
        Rate us <span className="text-[var(--color-primary)]">*</span>
      </span>

      {/* Accessible Star Radio Group */}
      <div
        role="radiogroup"
        aria-label="Rating out of 5 stars"
        aria-required="true"
        className="relative flex items-center justify-center gap-2 sm:gap-3"
      >
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= activeRating;
          const isCurrentSelected = starIndex === value;

          return (
            <div key={starIndex} className="relative">
              <motion.button
                type="button"
                role="radio"
                aria-checked={isCurrentSelected}
                aria-label={`${starIndex} star${starIndex > 1 ? "s" : ""}, ${RATING_LABELS[starIndex]}`}
                tabIndex={value === starIndex || (value === 0 && starIndex === 1) ? 0 : -1}
                onMouseEnter={() => setHoverValue(starIndex)}
                onMouseLeave={() => setHoverValue(0)}
                onClick={() => handleSelect(starIndex)}
                onKeyDown={(e) => handleKeyDown(e, starIndex)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.18 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                className="p-1 sm:p-2 rounded-xl text-white/20 hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer"
              >
                <motion.div
                  animate={
                    isFilled && !shouldReduceMotion
                      ? { scale: [1, 1.25, 1], rotate: [0, -6, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{
                    duration: 0.35,
                    delay: (starIndex - 1) * 0.04,
                    ease: "easeOut",
                  }}
                >
                  <Star
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                      isFilled
                        ? "fill-[var(--color-primary)] text-[var(--color-primary)] drop-shadow-[0_0_12px_var(--color-primary-glow)]"
                        : "text-white/20"
                    }`}
                  />
                </motion.div>
              </motion.button>
            </div>
          );
        })}

        {/* 5-Star Particle Burst Animation */}
        {showBurst && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {BURST_PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: p.x,
                  y: p.y,
                  scale: [0.5, p.scale, 0],
                }}
                transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full bg-[var(--color-primary-light)] shadow-[0_0_8px_var(--color-primary)]"
              />
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Rating Label */}
      <div className="h-6 mt-3 flex items-center justify-center">
        {activeRating > 0 ? (
          <motion.span
            key={activeRating}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm font-semibold text-[var(--color-primary-light)] uppercase tracking-wider font-display"
          >
            {activeRating} — {RATING_LABELS[activeRating]}
          </motion.span>
        ) : (
          <span className="text-xs text-[var(--color-text-muted)] italic">
            Select a rating
          </span>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-400 mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
