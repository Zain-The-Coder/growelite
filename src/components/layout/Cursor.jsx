"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [cursorState, setCursorState] = useState({
    type: "default", // 'default' | 'pointer' | 'view' | 'hidden'
    text: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for follower ring
  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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
        target.closest('[role="button"]')
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

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central exact dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: isVisible && !isView ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer Follower Ring / Badge */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-[10px] font-bold tracking-widest text-white backdrop-blur-md"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isView ? 76 : isPointer ? 48 : 32,
          height: isView ? 76 : isPointer ? 48 : 32,
          backgroundColor: isView
            ? "rgba(176, 119, 45, 0.9)"
            : isPointer
            ? "rgba(176, 119, 45, 0.15)"
            : "rgba(255, 255, 255, 0.04)",
          borderColor: isView
            ? "rgba(255, 255, 255, 0.5)"
            : isPointer
            ? "rgba(176, 119, 45, 0.6)"
            : "rgba(255, 255, 255, 0.25)",
          borderWidth: isView ? "1px" : "1px",
          scale: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
        }}
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="tracking-widest uppercase font-mono text-[11px]"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
