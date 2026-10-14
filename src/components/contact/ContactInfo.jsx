"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Compass,
} from "lucide-react";
import { contact } from "@/data/site";

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const [mousePos1, setMousePos1] = useState({ x: 0, y: 0 });
  const [mousePos2, setMousePos2] = useState({ x: 0, y: 0 });
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleMouseMove1 = (e) => {
    if (shouldReduceMotion || !card1Ref.current) return;
    const rect = card1Ref.current.getBoundingClientRect();
    setMousePos1({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove2 = (e) => {
    if (shouldReduceMotion || !card2Ref.current) return;
    const rect = card2Ref.current.getBoundingClientRect();
    setMousePos2({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="space-y-8">
      {/* 1. Contact Details Card */}
      <div
        ref={card1Ref}
        onMouseMove={handleMouseMove1}
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
        className="card relative p-7 sm:p-9 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[var(--color-border-primary)]"
      >
        {/* Cursor Glow */}
        {!shouldReduceMotion && isHovered1 && (
          <div
            className="pointer-events-none absolute w-60 h-60 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl transition-opacity duration-300"
            style={{
              left: mousePos1.x,
              top: mousePos1.y,
              background:
                "radial-gradient(circle, rgba(176, 119, 45, 0.25) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-primary-light)] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT CHANNELS</span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
            Reach Out Directly
          </h3>

          <div className="space-y-4 pt-2">
            {/* Email with Copy Button */}
            {contact.email && (
              <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] flex items-center justify-between gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-white/90 hover:text-[var(--color-primary-light)] transition-colors truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
                  data-cursor="pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-surface)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base font-medium truncate">
                    {contact.email}
                  </span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono transition-all border border-white/10 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label="Copy email address"
                  data-cursor="pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Phone */}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] flex items-center gap-3 text-white/90 hover:text-[var(--color-primary-light)] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                data-cursor="pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--color-surface)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)] shrink-0 group-hover:border-[var(--color-primary)]/50 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <span className="block text-[10px] font-mono uppercase text-white/40">
                    Direct Phone Line
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {contact.phone}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
              </a>
            )}

            {/* WhatsApp */}
            {contact.whatsappUrl && (
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] flex items-center gap-3 text-white/90 hover:text-emerald-400 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                data-cursor="pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-[var(--color-surface)] border border-[var(--color-surface-border)] flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-400/50 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <span className="block text-[10px] font-mono uppercase text-white/40">
                    WhatsApp Chat
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {contact.whatsapp || "Chat on WhatsApp"}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </a>
            )}

            {/* Address */}
            {contact.address && (
              <div className="p-4 rounded-xl bg-[var(--color-background)] border border-[var(--color-surface-border)] flex items-start gap-3 text-white/70">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-surface)] border border-[var(--color-surface-border)] flex items-center justify-center text-[var(--color-primary)] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-white/40">
                    Studio Location
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">
                    {contact.address}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Social Links */}
          {contact.socials && contact.socials.length > 0 && (
            <div className="pt-4 border-t border-[var(--color-surface-border)]">
              <span className="block text-[11px] font-mono uppercase text-white/40 mb-3">
                Social Networks
              </span>
              <div className="flex flex-wrap gap-2">
                {contact.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-background)] border border-[var(--color-surface-border)] hover:border-[var(--color-primary)] text-xs text-white/70 hover:text-white transition-colors"
                  >
                    <span>{soc.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[var(--color-primary)]" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. "What Happens Next" Card with 3 Steps & Drawing Connector */}
      <div
        ref={card2Ref}
        onMouseMove={handleMouseMove2}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
        className="card relative p-7 sm:p-9 bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[var(--color-border-primary)]"
      >
        {!shouldReduceMotion && isHovered2 && (
          <div
            className="pointer-events-none absolute w-60 h-60 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl transition-opacity duration-300"
            style={{
              left: mousePos2.x,
              top: mousePos2.y,
              background:
                "radial-gradient(circle, rgba(176, 119, 45, 0.25) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-primary-light)] font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>PROCESS PREVIEW</span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
            What Happens Next
          </h3>

          {/* 3 Steps with Connector Line */}
          <div className="relative space-y-8 pl-4 pt-2">
            {/* Vertical Connector Line */}
            <div
              className="absolute left-[1.65rem] top-3 bottom-6 w-[2px] bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary-light)] to-transparent"
              aria-hidden="true"
            />

            {contact.steps?.map((step) => (
              <div key={step.number} className="relative flex items-start gap-4">
                {/* Step Circle */}
                <div className="w-7 h-7 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)] text-[var(--color-primary-light)] flex items-center justify-center font-mono text-xs font-bold shrink-0 z-10 shadow-sm">
                  {step.number}
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-semibold text-sm sm:text-base text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
