"use client";

import { useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { AlertTriangle } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AdminClientView({
  isConfigured,
  missing = [],
  initialAuthenticated = false,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);

  if (!isConfigured) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[var(--color-background)] text-white">
        <div className="w-full max-w-md card p-8 bg-[var(--color-surface)] border border-amber-500/40 rounded-2xl shadow-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Logo priority width={150} alt="GrowElite" />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h1 className="font-display text-xl font-bold text-white mb-2">
            Server is not configured
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6">
            The private review &amp; admin system requires critical environment variables before it can operate safely.
          </p>

          <div className="bg-[var(--color-surface-elevated)] p-4 rounded-xl text-left border border-[var(--color-surface-border)] mb-6">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
              Missing Variable(s):
            </span>
            <ul className="space-y-1 text-xs font-mono text-white/80 list-disc list-inside">
              {missing.map((key) => (
                <li key={key} className="text-amber-200">
                  {key}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[11px] text-[var(--color-text-muted)]">
            Please define these variables in your deployment environment or <code className="bg-white/10 px-1 py-0.5 rounded text-white">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
