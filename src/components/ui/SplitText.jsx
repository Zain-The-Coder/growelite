"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SplitText({
  children,
  className = "",
  type = "words", // 'words' | 'chars'
  delay = 0,
  stagger = 0.035,
  duration = 0.7,
  once = true,
  as: Component = "span",
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once, margin: "-10% 0px" });

  if (typeof children !== "string") {
    return <Component className={className}>{children}</Component>;
  }

  const text = children;

  if (type === "chars") {
    const chars = text.split("");
    return (
      <Component ref={containerRef} className={cn("inline-block", className)} aria-label={text}>
        {chars.map((char, index) => (
          <span key={index} className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0, rotateZ: 4 }}
              animate={
                isInView
                  ? { y: "0%", opacity: 1, rotateZ: 0 }
                  : { y: "110%", opacity: 0, rotateZ: 4 }
              }
              transition={{
                duration,
                delay: delay + index * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // Split by words
  const words = text.split(" ");

  return (
    <Component ref={containerRef} className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0, rotateX: 20 }}
            animate={
              isInView
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "115%", opacity: 0, rotateX: 20 }
            }
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
