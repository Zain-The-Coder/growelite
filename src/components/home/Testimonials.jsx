"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { reviewsData } from "@/data/reviews";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  const current = reviewsData[currentIndex];

  return (
    <section className="py-32 px-6 md:px-12 bg-background relative overflow-hidden border-t border-white/5">
      <div className="ambient-glow top-1/3 -right-40 w-[600px] h-[600px] bg-primary/10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <span className="w-8 h-[1px] bg-primary" />
              <span>ENDORSEMENTS & IMPACT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              WHAT FOUNDERS SAY.
            </h2>
          </div>

          {/* Navigation Arrow Buttons */}
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
        </div>

        {/* Testimonial Card with Slide Transition & Drag support */}
        <div className="relative rounded-3xl bg-surface/50 backdrop-blur-md border border-white/10 p-8 sm:p-14 overflow-hidden shadow-2xl">
          <Quote className="absolute right-8 top-8 w-20 h-20 text-white/[0.03] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -60) nextReview();
                if (offset.x > 60) prevReview();
              }}
              className="cursor-grab active:cursor-grabbing select-none"
              data-cursor="drag"
            >
              {/* Star Rating & Impact Pill */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-1.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-primary/10 border border-primary/30 text-primary-light">
                  {current.impact}
                </span>
              </div>

              {/* Quote Text */}
              <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-snug tracking-tight text-white mb-10">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${current.avatarColor} flex items-center justify-center text-white font-mono font-bold text-sm shadow-lg`}
                >
                  {current.initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase">
                    {current.author}
                  </h4>
                  <p className="font-mono text-xs text-white/50">
                    {current.role} • <span className="text-white/80">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5">
            {reviewsData.map((review, i) => (
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
        </div>
      </div>
    </section>
  );
}
