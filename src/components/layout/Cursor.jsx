"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [cursorState, setCursorState] = useState({
    type: "default", // 'default' | 'pointer' | 'view' | 'hidden'
    text: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates (direct 1:1 cursor tracking with zero trailing lag)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;

      // Text inputs, textareas, selects, or editable fields:
      // Hide custom dot so the system text selection / I-beam cursor is 100% unobstructed
      if (
        target.closest(
          'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]'
        )
      ) {
        setCursorState({ type: "hidden", text: "" });
        return;
      }

      const customCursorEl = target.closest("[data-cursor]");
      if (customCursorEl) {
        const cursorAttr = customCursorEl.getAttribute("data-cursor");
        if (cursorAttr === "view") {
          setCursorState({ type: "view", text: "VIEW" });
          return;
        }
        if (cursorAttr === "pointer") {
          setCursorState({ type: "pointer", text: "" });
          return;
        }
        if (cursorAttr === "drag") {
          setCursorState({ type: "view", text: "DRAG" });
          return;
        }
      }

      // Default checks for standard clickable elements
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest('input[type="submit"]') ||
        target.closest('input[type="button"]') ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer")
      ) {
        setCursorState({ type: "pointer", text: "" });
      } else {
        setCursorState({ type: "default", text: "" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  const isView = cursorState.type === "view";
  const isPointer = cursorState.type === "pointer";
  const isHidden = cursorState.type === "hidden";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Small gold dot cursor with direct 1:1 mouse tracking and hover scaling */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center select-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isView ? 68 : isPointer ? 22 : 8,
          height: isView ? 68 : isPointer ? 22 : 8,
          backgroundColor: isView
            ? "color-mix(in srgb, var(--color-primary) 95%, transparent)"
            : isPointer
            ? "var(--color-primary-muted)"
            : "var(--color-primary)",
          borderColor: isView
            ? "rgba(255, 255, 255, 0.6)"
            : isPointer
            ? "var(--color-border-primary)"
            : "transparent",
          borderWidth: isView ? "1px" : isPointer ? "1.5px" : "0px",
          opacity: isVisible && !isHidden ? 1 : 0,
          scale: isVisible && !isHidden ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 30,
          mass: 0.2,
        }}
      >
        {isView && cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="tracking-widest uppercase font-mono text-[10px] font-bold text-white text-center leading-none"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
