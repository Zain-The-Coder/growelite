"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import { servicesFaqs } from "@/data/faqs";

export default function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-28 px-6 md:px-12 relative z-10 bg-boxes border-t border-[var(--color-surface-border)]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-[var(--color-surface-border)] mb-4 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CLARITY &amp; TRANSPARENCY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light">
            Everything you need to know about our capabilities, delivery protocols, and partnership models.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {servicesFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? "bg-surface-elevated/90 border-primary shadow-lg shadow-primary/10"
                    : "bg-surface/70 border-[var(--color-surface-border)] hover:border-white/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  data-cursor="pointer"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-black border-primary rotate-45"
                        : "bg-white/5 border-[var(--color-surface-border)] text-white/60"
                    }`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm font-light leading-relaxed text-white/70 border-t border-[var(--color-surface-border)] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
