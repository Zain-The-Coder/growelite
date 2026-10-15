"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

function ReviewCard({ review, isDuplicate = false }) {
  const initials = (review.name || "GE")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const roleAndCompany = [review.role, review.company].filter(Boolean).join(", ");

  return (
    <div
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? true : undefined}
      className="card relative w-[280px] sm:w-[360px] shrink-0 p-6 sm:p-7 flex flex-col justify-between select-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-border-primary)] hover:shadow-[0_0_35px_var(--color-primary-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] group cursor-grab active:cursor-grabbing snap-start bg-[var(--color-surface)]"
      data-cursor="drag"
    >
      {/* Large faint gold quote mark in top corner */}
      <Quote
        className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-primary)] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Stars */}
        <div
          className="flex items-center gap-1 mb-4"
          role="img"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {[...Array(review.rating || 5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]"
            />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-white/80 font-normal text-sm sm:text-base leading-relaxed line-clamp-6 mb-6">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Author info */}
      <div className="relative z-10 pt-4 border-t border-[var(--color-surface-border)] flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-elevated)] ring-2 ring-[var(--color-primary)]/50 flex items-center justify-center font-bold text-xs text-[var(--color-primary-light)] shrink-0 shadow-sm">
          {initials}
        </div>

        <div className="overflow-hidden">
          <h3 className="font-display font-semibold text-sm sm:text-base text-white tracking-tight truncate">
            {review.name}
          </h3>
          {roleAndCompany && (
            <p className="text-xs text-white/50 truncate">
              {roleAndCompany}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewSliders({ reviews = [] }) {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0.2);

  // Position offsets
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);
  const isDraggingRef = useRef(false);
  const dragRowRef = useRef(null);
  const lastXRef = useRef(0);

  const pauseTimerRef = useRef(null);

  const reviewCount = reviews.length;
  const isSingleRow = reviewCount >= 4 && reviewCount < 8;
  const isTwoRows = reviewCount >= 8;

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const pauseTemporarily = useCallback((ms = 3000) => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, ms);
  }, []);

  // Continuous animation loop using requestAnimationFrame (only if reviewCount >= 4)
  useEffect(() => {
    if (isReducedMotion || reviewCount < 4) return;

    let animId;
    const speed = 0.75;

    const loop = () => {
      if (!isPaused && !isDraggingRef.current) {
        pos1Ref.current -= speed;
        if (isTwoRows) {
          pos2Ref.current += speed;
        }

        const row1El = row1Ref.current;
        const row2El = row2Ref.current;

        if (row1El) {
          const halfWidth1 = row1El.scrollWidth / 2;
          if (halfWidth1 > 0) {
            if (pos1Ref.current <= -halfWidth1) {
              pos1Ref.current += halfWidth1;
            } else if (pos1Ref.current > 0) {
              pos1Ref.current -= halfWidth1;
            }
            row1El.style.transform = `translate3d(${pos1Ref.current}px, 0, 0)`;

            const normProgress = Math.abs(pos1Ref.current) / halfWidth1;
            setProgress(normProgress);
          }
        }

        if (row2El && isTwoRows) {
          const halfWidth2 = row2El.scrollWidth / 2;
          if (halfWidth2 > 0) {
            if (pos2Ref.current >= 0) {
              pos2Ref.current -= halfWidth2;
            } else if (pos2Ref.current < -halfWidth2) {
              pos2Ref.current += halfWidth2;
            }
            row2El.style.transform = `translate3d(${pos2Ref.current}px, 0, 0)`;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [isPaused, isReducedMotion, reviewCount, isTwoRows]);

  // Pointer Drag handling
  const handlePointerDown = (e, rowNum) => {
    if (isReducedMotion || reviewCount < 4) return;
    isDraggingRef.current = true;
    dragRowRef.current = rowNum;
    lastXRef.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || isReducedMotion || reviewCount < 4) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    if (dragRowRef.current === 1) {
      pos1Ref.current += deltaX;
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${pos1Ref.current}px, 0, 0)`;
      }
    } else if (dragRowRef.current === 2 && isTwoRows) {
      pos2Ref.current += deltaX;
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${pos2Ref.current}px, 0, 0)`;
      }
    }
  };

  const handlePointerUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pauseTemporarily(2000);
    }
  };

  const shiftRows = (direction) => {
    pauseTemporarily(4000);
    const step = 380;
    const delta = direction === "next" ? -step : step;

    pos1Ref.current += delta;
    if (isTwoRows) pos2Ref.current -= delta;

    if (row1Ref.current) {
      row1Ref.current.style.transition = "transform 0.4s ease-out";
      row1Ref.current.style.transform = `translate3d(${pos1Ref.current}px, 0, 0)`;
      setTimeout(() => {
        if (row1Ref.current) row1Ref.current.style.transition = "";
      }, 400);
    }

    if (row2Ref.current && isTwoRows) {
      row2Ref.current.style.transition = "transform 0.4s ease-out";
      row2Ref.current.style.transform = `translate3d(${pos2Ref.current}px, 0, 0)`;
      setTimeout(() => {
        if (row2Ref.current) row2Ref.current.style.transition = "";
      }, 400);
    }
  };

  // 0 Reviews State
  if (reviewCount === 0) {
    return (
      <section
        id="reviews"
        className="py-16 sm:py-20 section-surface border-b border-[var(--color-surface-border)] text-center"
      >
        <p className="text-white/50 text-sm font-light">
          Client reviews will appear here soon.
        </p>
      </section>
    );
  }

  // 1 to 3 Reviews: Static Centered Card Grid
  if (reviewCount >= 1 && reviewCount <= 3) {
    return (
      <section
        id="reviews"
        className="py-24 sm:py-32 section-surface border-b border-[var(--color-surface-border)]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>CLIENT FEEDBACK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            What our clients say.
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto">
            Direct quotes from founders, operators, and growth leads who trust our acquisition and engineering systems.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-wrap justify-center gap-6">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} isDuplicate={false} />
          ))}
        </div>
      </section>
    );
  }

  // 4 or more: Sliders
  const duplicatedRow1 = [...reviews, ...reviews];
  const duplicatedRow2 = isTwoRows
    ? [...reviews].reverse().concat([...reviews].reverse())
    : [];

  return (
    <section
      id="reviews"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative py-24 sm:py-32 section-surface border-b border-[var(--color-surface-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14 sm:mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.22em] text-[var(--color-primary)] font-semibold shadow-sm">
          <MessageSquareQuote className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>CLIENT FEEDBACK</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          What our clients say.
        </h2>

        <p className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto">
          Direct quotes from founders, operators, and growth leads who trust our acquisition and engineering systems.
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => !isDraggingRef.current && setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent z-20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent z-20 pointer-events-none"
          aria-hidden="true"
        />

        {isReducedMotion ? (
          <div className="space-y-6 px-6">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} isDuplicate={false} />
              ))}
            </div>
            {isTwoRows && (
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                {[...reviews].reverse().map((r) => (
                  <ReviewCard key={`rev-${r.id}`} review={r} isDuplicate={false} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {/* Row 1: Sliding Left */}
            <div
              className="flex gap-6 will-change-transform cursor-grab active:cursor-grabbing"
              ref={row1Ref}
              onPointerDown={(e) => handlePointerDown(e, 1)}
            >
              {duplicatedRow1.map((r, i) => (
                <ReviewCard
                  key={`r1-${r.id}-${i}`}
                  review={r}
                  isDuplicate={i >= reviews.length}
                />
              ))}
            </div>

            {/* Row 2 (if 8+ reviews): Sliding Right */}
            {isTwoRows && (
              <div
                className="flex gap-6 will-change-transform cursor-grab active:cursor-grabbing"
                ref={row2Ref}
                onPointerDown={(e) => handlePointerDown(e, 2)}
              >
                {duplicatedRow2.map((r, i) => (
                  <ReviewCard
                    key={`r2-${r.id}-${i}`}
                    review={r}
                    isDuplicate={i >= reviews.length}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Manual Controls & Progress Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-64 flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            AUTO
          </span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] transition-all duration-200"
              style={{ width: `${Math.max(10, Math.min(100, progress * 100))}%` }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            PAUSE ON HOVER
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => shiftRows("prev")}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] text-white flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Previous reviews"
            data-cursor="pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => shiftRows("next")}
            className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] text-white flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Next reviews"
            data-cursor="pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
