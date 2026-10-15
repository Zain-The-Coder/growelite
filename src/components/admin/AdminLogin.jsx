"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AdminLogin({ onLoginSuccess }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Incorrect password");
        setLoading(false);
        return;
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative select-none">
      {/* Background Soft Glow */}
      <div
        className="ambient-glow w-72 h-72 sm:w-96 sm:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md card p-6 sm:p-10 relative z-10 border border-[var(--color-border-secondary)] bg-[var(--color-surface)] shadow-2xl rounded-2xl"
      >
        {/* Logo & Heading */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <Logo
              priority
              width={160}
              alt="GrowElite"
              className="w-[140px] sm:w-[160px] h-auto object-contain"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] text-[11px] uppercase tracking-widest text-[var(--color-primary-light)] font-semibold mb-2">
            <Lock className="w-3 h-3 text-[var(--color-primary)]" />
            <span>Private Console</span>
          </span>
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
            Admin Authentication
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Enter your administrative credentials to continue
          </p>
        </div>

        {/* Inline Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 p-3.5 mb-6 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs uppercase tracking-wider text-[var(--color-text-secondary)] font-medium mb-2"
            >
              Master Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoFocus
                className="w-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] focus:border-[var(--color-primary)] text-white text-sm rounded-xl px-4 py-3.5 pr-11 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] transition-all placeholder:text-[var(--color-text-muted)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors focus-visible:outline-none cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3.5 px-5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
