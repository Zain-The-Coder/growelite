"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Check,
  AlertCircle,
  Loader2,
  Send,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { servicesData } from "@/data/services";
import { budgetOptions, contactFormContent } from "@/data/contactForm";
import { contact } from "@/data/site";
import { validateContactForm } from "@/lib/contactValidation";
import { submitContact } from "@/lib/submitContact";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const formRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budget: "",
    message: "",
    website_hp: "", // Honeypot
  });

  const [renderTimestamp, setRenderTimestamp] = useState(0);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  // Record render timestamp for bot timing detection
  useEffect(() => {
    setRenderTimestamp(Date.now());
  }, []);

  // Pre-select service or package from URL query parameter (?service=<slug> or ?package=<slug>) and smooth scroll
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const packageParam = searchParams.get("package");

    if (serviceParam) {
      const match = servicesData.find((s) => s.slug === serviceParam);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          services: prev.services.includes(match.slug)
            ? prev.services
            : [...prev.services, match.slug],
        }));

        const timer = setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
        return () => clearTimeout(timer);
      }
    } else if (packageParam) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message || `Inquiry regarding the ${packageParam.replace(/-/g, " ")} package.`,
      }));
      const timer = setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance if valid
    if (touched[name]) {
      const partialVal = validateContactForm({
        ...formData,
        [name]: value,
      });
      setErrors((prev) => ({
        ...prev,
        [name]: partialVal.errors[name] || undefined,
      }));
    }
  };

  // Handle Blur for Inline Validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validation = validateContactForm(formData);
    if (validation.errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validation.errors[name] }));
    }
  };

  // Handle Multi-Select Services Chips
  const toggleService = (slug) => {
    setFormData((prev) => {
      const exists = prev.services.includes(slug);
      const nextServices = exists
        ? prev.services.filter((s) => s !== slug)
        : [...prev.services, slug];
      return { ...prev, services: nextServices };
    });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Full validation
    const validation = validateContactForm(formData);
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      services: true,
      budget: true,
      message: true,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);

      // Focus first invalid element
      const firstErrorField = Object.keys(validation.errors)[0];
      if (firstErrorField) {
        const el = formRef.current?.querySelector(`[name="${firstErrorField}"]`);
        if (el) {
          el.focus();
        }
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setServerErrorMessage("");

    const payload = {
      ...formData,
      renderTimestamp,
      sourceUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    const res = await submitContact(payload);
    setIsSubmitting(false);

    if (res.ok) {
      setSubmitStatus("success");
    } else {
      setSubmitStatus("error");
      if (res.errors) {
        setErrors(res.errors);
      }
      setServerErrorMessage(
        res.message ||
          `Something went wrong. Please try again or email us directly at ${contact.email}.`
      );
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      services: [],
      budget: "",
      message: "",
      website_hp: "",
    });
    setErrors({});
    setTouched({});
    setSubmitStatus("idle");
    setServerErrorMessage("");
    setRenderTimestamp(Date.now());
  };

  const firstName = formData.name.trim().split(" ")[0] || "there";

  return (
    <div
      ref={formRef}
      className="card relative p-7 sm:p-10 md:p-12 bg-[var(--color-surface)]/90 backdrop-blur-xl border border-[var(--color-surface-border)] rounded-2xl shadow-2xl transition-all duration-300 hover:border-[var(--color-border-primary)]"
    >
      {/* Success State */}
      <AnimatePresence mode="wait">
        {submitStatus === "success" ? (
          <motion.div
            key="success-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="py-12 sm:py-16 text-center space-y-6"
            role="status"
            aria-live="polite"
          >
            {/* Animated Gold Checkmark */}
            <motion.div
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-black shadow-xl shadow-primary/25"
            >
              <Check className="w-10 h-10 stroke-[3]" />
            </motion.div>

            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Thank you, {firstName}.
              </h3>
              <p className="text-white/80 text-base sm:text-lg font-normal">
                {contactFormContent.success.title}
              </p>
            </div>

            <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
              {contactFormContent.success.confirmationNote} We will review your project details and reach out with next steps.
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                data-cursor="pointer"
              >
                <RotateCcw className="w-4 h-4 text-[var(--color-primary)]" />
                <span>{contactFormContent.success.buttonReset}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Form */
          <form
            key="contact-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 sm:space-y-8"
          >
            {/* Form Top Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-surface-border)]">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary-light)] font-bold">
                PROJECT INQUIRY
              </span>
              <span className="text-[11px] font-mono text-white/40">
                * REQUIRED FIELDS
              </span>
            </div>

            {/* Error Banner if Server Failed */}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-primary)]/50 text-white/90 text-sm flex items-start gap-3"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-5 h-5 text-[var(--color-primary-light)] shrink-0 mt-0.5" />
                <div className="space-y-2 flex-1">
                  <p>{serverErrorMessage}</p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-primary-light)] hover:underline cursor-pointer"
                  >
                    <span>{contactFormContent.error.retryButton}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Hidden Honeypot Field */}
            <div
              className="absolute opacity-0 -z-50 pointer-events-none h-0 w-0 overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website_hp">Leave this empty</label>
              <input
                id="website_hp"
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium"
                >
                  Full Name <span className="text-[var(--color-primary)]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[var(--color-background)] border ${
                    errors.name
                      ? "border-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-light)]"
                      : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
                  } text-white placeholder:text-white/30 text-base sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-xs text-[var(--color-primary-light)] flex items-center gap-1 pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium"
                >
                  Email Address <span className="text-[var(--color-primary)]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[var(--color-background)] border ${
                    errors.email
                      ? "border-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-light)]"
                      : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
                  } text-white placeholder:text-white/30 text-base sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs text-[var(--color-primary-light)] flex items-center gap-1 pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Company Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium"
                >
                  Phone / WhatsApp <span className="text-white/40 text-[10px]">(Optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[var(--color-background)] border ${
                    errors.phone
                      ? "border-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-light)]"
                      : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
                  } text-white placeholder:text-white/30 text-base sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-xs text-[var(--color-primary-light)] flex items-center gap-1 pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Company / Brand */}
              <div className="space-y-1.5">
                <label
                  htmlFor="company"
                  className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium"
                >
                  Company / Brand <span className="text-white/40 text-[10px]">(Optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="e.g. Apex Dynamics"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  className={`w-full px-4 py-3.5 rounded-xl bg-[var(--color-background)] border ${
                    errors.company
                      ? "border-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-light)]"
                      : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
                  } text-white placeholder:text-white/30 text-base sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]`}
                />
                {errors.company && (
                  <p
                    id="company-error"
                    className="text-xs text-[var(--color-primary-light)] flex items-center gap-1 pt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.company}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Services Multi-Select Chips (All 14 Services) */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium">
                Services You Are Interested In <span className="text-white/40 text-[10px]">(Select all that apply)</span>
              </label>

              <div className="flex flex-wrap gap-2 pt-1">
                {servicesData.map((s) => {
                  const isSelected = formData.services.includes(s.slug);
                  return (
                    <label
                      key={s.slug}
                      className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium cursor-pointer select-none transition-all duration-200 border ${
                        isSelected
                          ? "bg-[var(--color-primary)] text-black border-[var(--color-primary)] font-semibold shadow-md shadow-primary/20 scale-[1.03]"
                          : "bg-[var(--color-background)] text-white/80 border-[var(--color-surface-border)] hover:border-[var(--color-primary)]/50 hover:text-white"
                      }`}
                      data-cursor="pointer"
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={s.slug}
                        checked={isSelected}
                        onChange={() => toggleService(s.slug)}
                        className="sr-only"
                      />
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      <span>{s.title}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Budget Tier Select */}
            <div className="space-y-1.5">
              <label
                htmlFor="budget"
                className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium"
              >
                Project Budget <span className="text-white/40 text-[10px]">(Optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] focus:border-[var(--color-primary)] text-white text-base sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              >
                <option value="" className="bg-[var(--color-navy-darker)] text-white/50">
                  Select an estimated budget range...
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[var(--color-navy-darker)] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Textarea with Live Character Counter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="block text-xs font-mono uppercase tracking-wider text-white/80 font-medium"
                >
                  Project Details <span className="text-[var(--color-primary)]">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    formData.message.length > 2000
                      ? "text-rose-400 font-bold"
                      : "text-white/40"
                  }`}
                >
                  {formData.message.length} / 2000
                </span>
              </div>

              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Tell us about your brand targets, current bottlenecks, and timeline expectations..."
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full px-4 py-3.5 rounded-xl bg-[var(--color-background)] border ${
                  errors.message
                    ? "border-[var(--color-primary-light)] ring-1 ring-[var(--color-primary-light)]"
                    : "border-[var(--color-surface-border)] focus:border-[var(--color-primary)]"
                } text-white placeholder:text-white/30 text-base sm:text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] resize-y`}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="text-xs text-[var(--color-primary-light)] flex items-center gap-1 pt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Consent Line */}
            <p className="text-xs text-white/50 leading-relaxed">
              {contactFormContent.consent}
            </p>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-black font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm transition-all shadow-xl hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                data-cursor="pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="card p-12 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}
