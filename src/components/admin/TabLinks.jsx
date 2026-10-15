"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Link as LinkIcon,
  Clock,
  Ban,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Building,
  User,
} from "lucide-react";

function formatCountdown(expiresAt) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${remainingHours}h left`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }
  return `${minutes}m left`;
}

export default function TabLinks({ refreshTrigger }) {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revokingId, setRevokingId] = useState(null);
  const [confirmRevokeId, setConfirmRevokeId] = useState(null);
  const [, setTick] = useState(0);

  // Update countdown every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/tokens");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to load review links");
      } else {
        setTokens(data.tokens || []);
      }
    } catch {
      setError("Network error fetching tokens.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens, refreshTrigger]);

  const handleRevoke = async (id) => {
    setRevokingId(id);
    try {
      const res = await fetch(`/api/admin/tokens/${id}/revoke`, {
        method: "POST",
      });
      if (res.ok) {
        setTokens((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: "revoked" } : t))
        );
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to revoke link");
      }
    } catch {
      alert("Error revoking link");
    } finally {
      setRevokingId(null);
      setConfirmRevokeId(null);
    }
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Generated Review Links</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] text-[var(--color-primary-light)] font-mono">
              {tokens.length}
            </span>
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Audit link status, live expiry countdowns, and revoke active links.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchTokens}
          disabled={loading}
          className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)] text-white text-xs flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
          title="Refresh links"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[var(--color-primary)]" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && tokens.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-[var(--color-text-secondary)]">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
          <span className="text-xs uppercase tracking-wider">Loading Links...</span>
        </div>
      ) : tokens.length === 0 ? (
        <div className="card p-12 text-center bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)] mx-auto mb-3">
            <LinkIcon className="w-6 h-6" />
          </div>
          <h3 className="font-display font-semibold text-white text-sm sm:text-base">
            No Review Links Generated Yet
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto mt-1">
            Head to the &ldquo;Generate Link&rdquo; tab to issue your first one-time review URL for a client.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View (>= 768px) */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface)] shadow-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-surface-border)] bg-[var(--color-surface-elevated)]/60 text-[var(--color-text-secondary)] uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4">Client / Brand</th>
                  <th className="py-3.5 px-4">Created</th>
                  <th className="py-3.5 px-4">Expires</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-surface-border)]">
                {tokens.map((token) => (
                  <tr key={token.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">
                        {token.label || <span className="text-[var(--color-text-muted)] italic font-normal">Untitled link</span>}
                      </div>
                      {token.company && (
                        <div className="text-[11px] text-[var(--color-text-secondary)] flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-[var(--color-primary)]" />
                          <span>{token.company}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[var(--color-text-secondary)] font-mono">
                      {token.createdAt ? new Date(token.createdAt).toLocaleDateString() : "—"}
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-white">
                        {token.expiresAt ? new Date(token.expiresAt).toLocaleDateString() : "—"}
                      </div>
                      {token.status === "active" && (
                        <div className="text-[11px] text-[var(--color-primary-light)] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{formatCountdown(token.expiresAt)}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusChip status={token.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {token.status === "active" && (
                        confirmRevokeId === token.id ? (
                          <div className="inline-flex items-center gap-2">
                            <span className="text-[11px] text-amber-300">Revoke?</span>
                            <button
                              type="button"
                              onClick={() => handleRevoke(token.id)}
                              disabled={revokingId === token.id}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-[11px] cursor-pointer"
                            >
                              {revokingId === token.id ? "Revoking..." : "Yes"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmRevokeId(null)}
                              className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] cursor-pointer"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmRevokeId(token.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 hover:bg-red-900/40 text-red-300 text-[11px] font-medium transition-all cursor-pointer"
                          >
                            <Ban className="w-3 h-3 text-red-400" />
                            <span>Revoke</span>
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (< 768px) */}
          <div className="md:hidden space-y-3.5">
            {tokens.map((token) => (
              <div
                key={token.id}
                className="card p-4 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>{token.label || "Untitled link"}</span>
                    </h4>
                    {token.company && (
                      <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-[var(--color-primary)]" />
                        <span>{token.company}</span>
                      </p>
                    )}
                  </div>
                  <StatusChip status={token.status} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[var(--color-surface-border)]">
                  <div>
                    <span className="text-[10px] uppercase text-[var(--color-text-muted)] block">Created</span>
                    <span className="font-mono text-white text-xs">
                      {token.createdAt ? new Date(token.createdAt).toLocaleDateString() : "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[var(--color-text-muted)] block">Expires</span>
                    <span className="font-mono text-white text-xs">
                      {token.expiresAt ? new Date(token.expiresAt).toLocaleDateString() : "—"}
                    </span>
                    {token.status === "active" && (
                      <span className="text-[11px] text-[var(--color-primary-light)] block">
                        {formatCountdown(token.expiresAt)}
                      </span>
                    )}
                  </div>
                </div>

                {token.status === "active" && (
                  <div className="pt-2 border-t border-[var(--color-surface-border)] flex justify-end">
                    {confirmRevokeId === token.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-amber-300">Revoke this link?</span>
                        <button
                          type="button"
                          onClick={() => handleRevoke(token.id)}
                          disabled={revokingId === token.id}
                          className="px-3 py-1 rounded-lg bg-red-600 text-white font-medium text-xs cursor-pointer"
                        >
                          {revokingId === token.id ? "Revoking..." : "Confirm"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmRevokeId(null)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 text-white text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmRevokeId(token.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 text-xs font-medium cursor-pointer"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Revoke Link</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatusChip({ status }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 text-[var(--color-primary-light)] text-[11px] font-semibold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
        <span>Active</span>
      </span>
    );
  }
  if (status === "used") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-950/40 border border-sky-500/30 text-sky-300 text-[11px] font-semibold uppercase tracking-wider">
        <CheckCircle2 className="w-3 h-3 text-sky-400" />
        <span>Used</span>
      </span>
    );
  }
  if (status === "revoked") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 text-[11px] font-semibold uppercase tracking-wider">
        <XCircle className="w-3 h-3 text-rose-400" />
        <span>Revoked</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[11px] font-semibold uppercase tracking-wider">
      <Clock className="w-3 h-3" />
      <span>Expired</span>
    </span>
  );
}
