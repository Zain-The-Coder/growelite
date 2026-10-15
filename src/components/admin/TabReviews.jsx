"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Star,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Loader2,
  AlertCircle,
  MessageSquare,
  Building,
  User,
  CheckCircle2,
} from "lucide-react";

export default function TabReviews({ activeLinksCount = 0 }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to load reviews");
      } else {
        setReviews(data.reviews || []);
      }
    } catch {
      setError("Network error fetching reviews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleTogglePublish = async (id, currentPublished) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentPublished }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, published: data.published } : r))
        );
      } else {
        alert(data.error || "Failed to update review status");
      }
    } catch {
      alert("Error updating review");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete review");
      }
    } catch {
      alert("Error deleting review");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  // Compute metrics
  const totalReviews = reviews.length;
  const publishedReviews = reviews.filter((r) => r.published);
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <div className="w-full">
      {/* Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="card p-4 sm:p-5 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
              Total Reviews
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {totalReviews}
            </div>
            <span className="text-[11px] text-[var(--color-primary-light)]">
              {publishedReviews.length} published on site
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)]">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="card p-4 sm:p-5 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
              Average Rating
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5 flex items-center gap-1.5">
              <span>{averageRating}</span>
              <Star className="w-5 h-5 fill-[var(--color-primary)] text-[var(--color-primary)] inline" />
            </div>
            <span className="text-[11px] text-[var(--color-text-muted)]">
              Across all submitted feedback
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)]">
            <Star className="w-5 h-5 fill-[var(--color-primary)]" />
          </div>
        </div>

        <div className="card p-4 sm:p-5 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-secondary)] font-medium">
              Active Links
            </span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
              {activeLinksCount}
            </div>
            <span className="text-[11px] text-emerald-400">
              Ready for client submission
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Header and Refresh */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-white">
            Client Reviews
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Manage visibility on the public website or permanently remove entries.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchReviews}
          disabled={loading}
          className="p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)] text-white text-xs flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
          title="Refresh reviews"
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

      {loading && reviews.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-[var(--color-text-secondary)]">
          <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
          <span className="text-xs uppercase tracking-wider">Loading Reviews...</span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="card p-12 text-center bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)] mx-auto mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-display font-semibold text-white text-sm sm:text-base">
            No Reviews Submitted Yet
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto mt-1">
            When clients complete their feedback via a review link, their ratings will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className={`card p-5 sm:p-6 bg-[var(--color-surface)] border rounded-2xl transition-all ${
                rev.published
                  ? "border-[var(--color-surface-border)] hover:border-[var(--color-border-primary)]"
                  : "border-white/5 opacity-70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-surface-border)]">
                {/* Author Info & Stars */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex items-center gap-0.5" aria-label={`${rev.rating} stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-white font-mono">
                      {rev.rating}/5
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <h3 className="font-display font-bold text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      <span>{rev.name}</span>
                    </h3>
                    {(rev.role || rev.company) && (
                      <span className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
                        •
                        {rev.role && <span>{rev.role}</span>}
                        {rev.role && rev.company && <span>at</span>}
                        {rev.company && (
                          <span className="text-white font-medium flex items-center gap-1">
                            <Building className="w-3 h-3 text-[var(--color-primary)]" />
                            {rev.company}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Publish/Hide Button */}
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(rev.id, rev.published)}
                    disabled={updatingId === rev.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      rev.published
                        ? "bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 text-[var(--color-primary-light)] hover:bg-[var(--color-primary)]/25"
                        : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {updatingId === rev.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : rev.published ? (
                      <Eye className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                    <span>{rev.published ? "Published" : "Hidden"}</span>
                  </button>

                  {/* Delete Button */}
                  {confirmDeleteId === rev.id ? (
                    <div className="inline-flex items-center gap-1.5 bg-red-950/50 p-1 rounded-xl border border-red-500/30">
                      <button
                        type="button"
                        onClick={() => handleDelete(rev.id)}
                        disabled={deletingId === rev.id}
                        className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-xs cursor-pointer"
                      >
                        {deletingId === rev.id ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(rev.id)}
                      className="p-2 rounded-xl border border-red-500/20 bg-red-950/20 hover:bg-red-950/50 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div className="pt-3.5">
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="mt-3 text-[11px] font-mono text-[var(--color-text-muted)]">
                  Submitted {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
