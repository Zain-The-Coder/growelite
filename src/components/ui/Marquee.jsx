"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Marquee({
  children,
  items,
  speed = 28, // seconds per full loop
  direction = "left", // 'left' | 'right'
  pauseOnHover = true,
  className = "",
  itemClassName = "",
}) {
  const isLeft = direction === "left";

  const renderContent = () => {
    if (children) return children;
    if (items && Array.isArray(items)) {
      return items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-6 px-6 py-2 text-sm sm:text-base font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors select-none",
            itemClassName
          )}
        >
          <span>{typeof item === "string" ? item : item.name || item.label}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block" />
        </div>
      ));
    }
    return null;
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full flex select-none group",
        className
      )}
    >
      <motion.div
        className="flex shrink-0 min-w-full items-center justify-around group-hover:[animation-play-state:paused]"
        animate={{
          x: isLeft ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {renderContent()}
      </motion.div>

      <motion.div
        className="flex shrink-0 min-w-full items-center justify-around group-hover:[animation-play-state:paused]"
        aria-hidden="true"
        animate={{
          x: isLeft ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
