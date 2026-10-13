"use client";

import { motion } from "framer-motion";
import { serviceCategories } from "@/data/services";

export default function CategoryFilterBar({
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
}) {
  return (
    <div className="sticky top-[68px] sm:top-[76px] z-40 w-full py-3 sm:py-4 px-4 bg-[var(--color-background)]/85 backdrop-blur-xl border-y border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        {/* Horizontal scrollable container on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[var(--color-navy-dark)]/80 border border-white/10 shadow-lg shadow-black/20 overflow-x-auto no-scrollbar max-w-full">
          {serviceCategories.map((category) => {
            const isActive = activeCategory === category;
            const count = categoryCounts[category];

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`relative px-3.5 sm:px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-medium transition-colors select-none whitespace-nowrap cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {/* Active sliding gold indicator */}
                {isActive && (
                  <motion.div
                    layoutId="servicesCategorySlider"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-light shadow-[0_0_20px_var(--color-primary-glow)] -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{category}</span>
                  {count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full transition-colors ${
                        isActive
                          ? "bg-black/25 text-white/90"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
