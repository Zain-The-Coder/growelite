"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link as LinkIcon,
  Copy,
  Check,
  Send,
  Sparkles,
  AlertTriangle,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function TabGenerateLink({ onLinkCreated }) {
  const [label, setLabel] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, company }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Failed to generate link");
        setLoading(false);
        return;
      }

      setResult({
        link: data.link,
        expiresAt: data.expiresAt,
        clientName: label.trim(),
      });

      if (onLinkCreated) {
        onLinkCreated();
      }
    } catch {
      setError("An unexpected error occurred while generating the link.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.link) return;
    try {
      await navigator.clipboard.writeText(result.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = result.link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLabel("");
    setCompany("");
    setError("");
  };

  const recipientName = result?.clientName || "there";
  const whatsappMessage = encodeURIComponent(
    `Hi ${recipientName}, we'd love your feedback on working with GrowElite. It takes a minute: ${result?.link} (valid for 3 days, works once.)`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="generate-form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="card p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)]">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                  Generate Review Link
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Create a secure, one-time review URL for a client.
                </p>
              </div>
            </div>

            {error && (
              <div
                className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs"
                role="alert"
                aria-live="polite"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-1.5"
                  >
                    Client Name <span className="text-[var(--color-text-muted)] text-[10px]">(Optional)</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    maxLength={100}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] focus:border-[var(--color-primary)] text-white text-sm rounded-xl px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] placeholder:text-[var(--color-text-muted)]"
                  />
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Prefills the name field on their review form.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="client-company"
                    className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-1.5"
                  >
                    Company or Brand <span className="text-[var(--color-text-muted)] text-[10px]">(Optional)</span>
                  </label>
                  <input
                    id="client-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    maxLength={100}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] focus:border-[var(--color-primary)] text-white text-sm rounded-xl px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] placeholder:text-[var(--color-text-muted)]"
                  />
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Prefills company name on their review form.
                  </p>
                </div>
              </div>

              {/* Information Note */}
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] text-xs text-[var(--color-text-secondary)]">
                <Clock className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                <span>
                  Valid for <strong>3 days</strong>, one-time use. Opening the link does not consume it; submission does.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Secure Link...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Review Link</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="result-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="card p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border-primary)] rounded-2xl shadow-2xl relative overflow-hidden"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>Link Generated</span>
              </span>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[var(--color-text-secondary)] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Generate Another</span>
              </button>
            </div>

            {/* Warning Callout */}
            <div className="flex items-start gap-2.5 p-3.5 mb-5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-medium">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Warning:</strong> This link is shown only once. The raw token is not stored in the database. Copy it now.
              </span>
            </div>

            {/* URL Display Bar */}
            <div className="mb-5">
              <label className="block text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-1.5">
                Review URL
              </label>
              <div className="flex items-center gap-2 p-2 bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] rounded-xl">
                <input
                  type="text"
                  readOnly
                  value={result.link}
                  className="bg-transparent text-white text-xs sm:text-sm font-mono flex-1 px-2.5 py-1.5 outline-none select-all truncate"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
                  aria-label="Copy review link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Expiry Details */}
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-6">
              <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>
                Expires:{" "}
                <strong className="text-white">
                  {new Date(result.expiresAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </strong>
              </span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[var(--color-surface-border)]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md text-center"
              >
                <Send className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="py-3 px-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[var(--color-primary)]" />}
                <span>{copied ? "Link Copied" : "Copy Link"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
