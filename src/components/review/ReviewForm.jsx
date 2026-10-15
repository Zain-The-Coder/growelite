"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Send,
  Loader2,
  AlertCircle,
  Building,
  User,
  Briefcase,
  CheckSquare,
  Square,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import StarRating from "./StarRating";
import SuccessScreen from "./SuccessScreen";

export default function ReviewForm({ token, initialLabel = "", initialCompany = "" }) {
  const shouldReduceMotion = useReducedMotion();

  // Form State
  const [name, setName] = useState(initialLabel || "");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState(initialCompany || "");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);

  // Hidden bot traps
  const [hpField, setHpField] = useState("");
  const [renderTime, setRenderTime] = useState(0);

  // Status State
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setRenderTime(Date.now());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Client-side quick checks
    const errors = {};
    if (!name.trim()) errors.name = "Your name is required.";
    if (rating < 1 || rating > 5) errors.rating = "Please select a rating.";
    if (!text.trim()) {
      errors.text = "Please enter your review.";
    } else if (text.trim().length < 20) {
      errors.text = "Review must be at least 20 characters.";
    } else if (text.trim().length > 1000) {
      errors.text = "Review cannot exceed 1,000 characters.";
    }
    if (!consent) {
      errors.consent = "Please check the consent box to proceed.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setGeneralError("");
    setFieldErrors({});

    try {
      const res = await fetch(`/api/review/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          company: company.trim(),
          rating,
          text: text.trim(),
          consent,
          hp_field: hpField,
          renderTime,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        } else {
          setGeneralError(
            data.error || "An error occurred while submitting. Please try again."
          );
        }
        setLoading(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setGeneralError("Network error. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return <SuccessScreen name={name} />;
  }

  const charCount = text.length;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative bg-[var(--color-background)]">
      {/* Background Soft Glow */}
      <div
        className="ambient-glow w-80 h-80 sm:w-[500px] sm:h-[500px] top-1/4 left-1/2 -translate-x-1/2 opacity-20"
        aria-hidden="true"
      />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl card p-6 sm:p-10 relative z-10 border border-[var(--color-border-secondary)] bg-[var(--color-surface)] shadow-2xl rounded-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Logo priority width={160} alt="GrowElite" className="w-[140px] sm:w-[160px] h-auto object-contain" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
            How was your experience with GrowElite?
          </h1>

          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-light max-w-md mx-auto">
            Your feedback helps other businesses decide. It only takes a minute.
          </p>
        </div>

        {/* Global Error Alert Banner */}
        {generalError && (
          <div
            className="flex items-start gap-2.5 p-4 mb-6 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{generalError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field (hidden from genuine users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website-url">Do not fill this</label>
            <input
              id="website-url"
              type="text"
              name="website-url"
              tabIndex={-1}
              autoComplete="off"
              value={hpField}
              onChange={(e) => setHpField(e.target.value)}
            />
          </div>

          {/* Interactive Star Rating */}
          <div className="p-4 rounded-xl bg-[var(--color-surface-elevated)]/50 border border-[var(--color-surface-border)]">
            <StarRating
              value={rating}
              onChange={(r) => {
                setRating(r);
                if (fieldErrors.rating) {
                  setFieldErrors((prev) => ({ ...prev, rating: "" }));
                }
              }}
              error={fieldErrors.rating}
            />
          </div>

          {/* Name & Role (Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reviewer-name"
                className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-1.5 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Your Name <strong className="text-[var(--color-primary)]">*</strong></span>
              </label>
              <input
                id="reviewer-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
                placeholder="e.g. Elena Rostova"
                className={`w-full bg-[var(--color-surface-elevated)] border text-white text-sm rounded-xl px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] placeholder:text-[var(--color-text-muted)] ${
                  fieldErrors.name
                    ? "border-red-500/50"
                    : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
                }`}
              />
              {fieldErrors.name && (
                <span className="text-xs text-red-400 mt-1 block">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="reviewer-role"
                className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-1.5 flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                <span>Your Role <span className="text-[var(--color-text-muted)] text-[10px]">(Optional)</span></span>
              </label>
              <input
                id="reviewer-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength={100}
                placeholder="e.g. Chief Product Officer"
                className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] focus:border-[var(--color-primary)] text-white text-sm rounded-xl px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] placeholder:text-[var(--color-text-muted)]"
              />
            </div>
          </div>

          {/* Company or Brand */}
          <div>
            <label
              htmlFor="reviewer-company"
              className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-1.5 flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              <span>Company or Brand <span className="text-[var(--color-text-muted)] text-[10px]">(Optional)</span></span>
            </label>
            <input
              id="reviewer-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              maxLength={100}
              placeholder="e.g. Neuracore Labs"
              className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] focus:border-[var(--color-primary)] text-white text-sm rounded-xl px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] placeholder:text-[var(--color-text-muted)]"
            />
          </div>

          {/* Review Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="reviewer-text"
                className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium"
              >
                Your Review <strong className="text-[var(--color-primary)]">*</strong>
              </label>
              <span
                className={`text-[11px] font-mono ${
                  charCount < 20 || charCount > 1000
                    ? "text-[var(--color-text-muted)]"
                    : "text-[var(--color-primary-light)]"
                }`}
              >
                {charCount} / 1000 (min 20)
              </span>
            </div>
            <textarea
              id="reviewer-text"
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1000}
              required
              placeholder="Tell us what you liked about working together, the communication, and the results achieved..."
              className={`w-full bg-[var(--color-surface-elevated)] border text-white text-sm rounded-xl p-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] placeholder:text-[var(--color-text-muted)] leading-relaxed resize-none ${
                fieldErrors.text
                  ? "border-red-500/50"
                  : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
              }`}
            />
            {fieldErrors.text && (
              <span className="text-xs text-red-400 mt-1 block">
                {fieldErrors.text}
              </span>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (fieldErrors.consent) {
                    setFieldErrors((prev) => ({ ...prev, consent: "" }));
                  }
                }}
                className="sr-only"
              />
              <div className="mt-0.5 shrink-0 text-[var(--color-primary)]">
                {consent ? (
                  <CheckSquare className="w-5 h-5 fill-[var(--color-primary)] text-[var(--color-background)]" />
                ) : (
                  <Square className="w-5 h-5 text-white/30" />
                )}
              </div>
              <span className="text-xs text-[var(--color-text-secondary)] leading-normal">
                I agree that my name, company, and review may be displayed publicly on the GrowElite website.
              </span>
            </label>
            {fieldErrors.consent && (
              <span className="text-xs text-red-400 mt-1 block ml-8">
                {fieldErrors.consent}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Your Feedback...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
