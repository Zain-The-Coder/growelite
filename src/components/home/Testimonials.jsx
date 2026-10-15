"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { reviews as defaultReviews } from "@/data/reviews";

export default function Testimonials({ reviews = defaultReviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex] || reviews[0];

  const initials = (current.name || "GE")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="py-32 px-6 md:px-12 bg-boxes relative overflow-hidden border-t border-white/5">
      <div className="ambient-glow top-1/3 -right-40 w-[600px] h-[600px] bg-primary/10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-[0.25em] text-primary font-semibold">
              <span className="w-8 h-[1px] bg-primary" />
              <span>ENDORSEMENTS &amp; IMPACT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              WHAT FOUNDERS SAY.
            </h2>
          </div>

          {/* Navigation Arrow Buttons (if more than 1 review) */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevReview}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer"
                aria-label="Previous review"
                data-cursor="pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer"
                aria-label="Next review"
                data-cursor="pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-3xl bg-surface/50 backdrop-blur-md border border-white/10 p-8 sm:p-14 overflow-hidden shadow-2xl">
          <Quote className="absolute right-8 top-8 w-20 h-20 text-white/[0.03] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag={reviews.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (reviews.length > 1) {
                  if (offset.x < -60) nextReview();
                  if (offset.x > 60) prevReview();
                }
              }}
              className="cursor-grab active:cursor-grabbing select-none"
              data-cursor="drag"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-8" role="img" aria-label={`${current.rating || 5} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= (current.rating || 5)
                        ? "fill-primary text-primary"
                        : "fill-white/10 text-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-snug tracking-tight text-white mb-10">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full bg-[var(--color-surface-elevated)] ring-2 ring-[var(--color-primary)]/50 flex items-center justify-center text-[var(--color-primary-light)] font-bold text-sm shadow-lg shrink-0">
                  {initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase">
                    {current.name}
                  </h4>
                  {(current.role || current.company) && (
                    <p className="text-xs text-white/50 font-medium">
                      {current.role} {current.role && current.company ? "•" : ""}{" "}
                      <span className="text-white/80">{current.company}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          {reviews.length > 1 && (
            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5">
              {reviews.map((review, i) => (
                <button
                  key={review.id}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to review ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
