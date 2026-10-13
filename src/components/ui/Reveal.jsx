"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  curtain = false,
  curtainColor = "bg-primary",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>

      {curtain && (
        <motion.div
          className={cn("absolute inset-0 z-20 pointer-events-none", curtainColor)}
          initial={{ scaleY: 1, originY: 0 }}
          animate={isInView ? { scaleY: 0, originY: 1 } : { scaleY: 1, originY: 0 }}
          transition={{
            duration: duration * 1.1,
            delay,
            ease: [0.87, 0, 0.13, 1],
          }}
        />
      )}
    </div>
  );
}
