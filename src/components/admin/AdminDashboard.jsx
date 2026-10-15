"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Link as LinkIcon,
  List,
  MessageSquareQuote,
  LogOut,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import TabGenerateLink from "./TabGenerateLink";
import TabLinks from "./TabLinks";
import TabReviews from "./TabReviews";

const TABS = [
  { id: "generate", label: "Generate link", icon: LinkIcon },
  { id: "links", label: "Links", icon: List },
  { id: "reviews", label: "Reviews", icon: MessageSquareQuote },
];

export default function AdminDashboard({ onLogout }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("generate");
  const [loggingOut, setLoggingOut] = useState(false);
  const [linksCount, setLinksCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch active links count to display in summary bar
  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/tokens");
        if (res.ok) {
          const data = await res.json();
          const activeCount = (data.tokens || []).filter(
            (t) => t.status === "active"
          ).length;
          setLinksCount(activeCount);
        }
      } catch {
        // Ignore background stat load error
      }
    }
    loadStats();
  }, [refreshTrigger]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      if (onLogout) {
        onLogout();
      } else {
        router.refresh();
      }
    } catch {
      router.refresh();
    }
  };

  const handleLinkCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-background)] text-white relative flex flex-col justify-start">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-surface-border)] bg-[var(--color-surface)]/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo
            priority
            width={130}
            alt="GrowElite"
            className="w-[110px] sm:w-[130px] h-auto object-contain"
          />
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--color-primary-light)] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Admin Control Panel</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[var(--color-surface-border)] hover:border-red-500/40 bg-[var(--color-surface-elevated)] hover:bg-red-950/20 text-xs text-[var(--color-text-secondary)] hover:text-red-300 font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400"
          title="Sign out of admin"
        >
          {loggingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5" />
          )}
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex-1 flex flex-col">
        {/* Navigation Tabs with Sliding Gold Indicator */}
        <div className="flex justify-center sm:justify-start mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] relative shadow-inner">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer select-none ${
                    isActive
                      ? "text-white"
                      : "text-[var(--color-text-secondary)] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="admin-active-tab-indicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 bg-[var(--color-primary)] rounded-xl -z-10 shadow-md shadow-[var(--color-primary-glow)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 w-full">
          {activeTab === "generate" && (
            <TabGenerateLink onLinkCreated={handleLinkCreated} />
          )}
          {activeTab === "links" && (
            <TabLinks refreshTrigger={refreshTrigger} />
          )}
          {activeTab === "reviews" && (
            <TabReviews activeLinksCount={linksCount} />
          )}
        </div>
      </main>
    </div>
  );
}