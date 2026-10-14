"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  magneticStrength = 0.35,
  textStrength = 0.15,
  cursorType = "pointer",
  variant = "default", // default, primary, outline, glow
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse), (hover: none)").matches) {
      return;
    }
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * magneticStrength,
      y: middleY * magneticStrength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full font-medium transition-colors select-none group overflow-hidden box-border";

  const variantStyles = {
    default:
      "bg-surface hover:bg-surface-elevated text-white border border-white/15 hover:border-primary/40 px-6 py-3.5 backdrop-blur-md transition-all duration-200",
    primary:
      "bg-primary hover:bg-primary-light text-white font-semibold px-7 py-3.5 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] border border-primary-light/40 transition-all duration-300",
    outline:
      "border border-white/20 hover:border-primary text-white/90 hover:text-primary-light px-6 py-3.5 backdrop-blur-sm transition-all duration-200",
    glow:
      "bg-primary hover:bg-primary-light text-white font-semibold px-8 py-4 shadow-[0_0_30px_var(--color-primary-glow)] hover:shadow-[0_0_40px_var(--color-primary)] transition-all duration-300",
    nav:
      "text-sm tracking-wide text-white/70 hover:text-white px-4 py-2 hover:bg-white/10 hover:text-primary-light transition-all duration-200",
  };

  const isFullWidth = className.includes("w-full");

  const buttonContent = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.15 }}
      data-cursor={cursorType}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <motion.span
        animate={{ x: position.x * textStrength, y: position.y * textStrength }}
        transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.15 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-2 pointer-events-none text-center max-w-full"
      >
        {children}
      </motion.span>
      {/* Subtle hover flare */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "inline-flex justify-center",
          isFullWidth ? "w-full max-w-[360px]" : "inline-block"
        )}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex justify-center bg-transparent p-0 border-0",
        isFullWidth ? "w-full max-w-[360px]" : "inline-block"
      )}
    >
      {buttonContent}
    </button>
  );
}
