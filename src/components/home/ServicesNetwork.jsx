"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { servicesNetwork } from "@/data/servicesNetwork";

export default function ServicesNetwork() {
  const containerRef = useRef(null);
  const hubRef = useRef(null);
  const svgRef = useRef(null);
  const pulseTweensRef = useRef([]);
  const floatTweensRef = useRef([]);
  const pathElementsRef = useRef([]);
  const pulseElementsRef = useRef([]);
  const pillsRef = useRef([]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // SVG Coordinate space: 600x600 with center at (300, 300)
  const CX = 300;
  const CY = 300;
  const totalNodes = servicesNetwork.length;

  // Calculate organic balanced node positions around the hub
  const nodePositions = useMemo(() => {
    return servicesNetwork.map((service, index) => {
      // Angular distribution starting near top with slight organic offset
      const baseAngle = (index / totalNodes) * 2 * Math.PI - Math.PI / 2;
      const angleJitter = Math.cos(index * 2.1) * 0.08;
      const angle = baseAngle + angleJitter;

      // Varied radius for organic non-circular rhythm (between 165px and 225px)
      const radiusVariations = [-18, 24, -12, 18, -22, 20, -15, 22, -10];
      const rOffset = radiusVariations[index % radiusVariations.length];
      const radius = 195 + rOffset;

      const x = CX + radius * Math.cos(angle);
      const y = CY + radius * Math.sin(angle);

      // Curved bezier control point calculation
      const dx = x - CX;
      const dy = y - CY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mx = (CX + x) / 2;
      const my = (CY + y) / 2;
      const curvature = (index % 2 === 0 ? 1 : -1) * 26;
      const cpx = mx + (-dy / dist) * curvature;
      const cpy = my + (dx / dist) * curvature;

      const pathData = `M ${CX} ${CY} Q ${cpx} ${cpy} ${x} ${y}`;

      return {
        ...service,
        index,
        x,
        y,
        leftPct: (x / 600) * 100,
        topPct: (y / 600) * 100,
        pathData,
      };
    });
  }, [totalNodes]);

  // Handle touch device detection & reduced motion preference
  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(reducedMotionQuery.matches);

    const handleReducedMotionChange = (e) => setIsReducedMotion(e.matches);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    return () => reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
  }, []);

  // Pause animations when hero is off-screen using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Control playback based on visibility
  useEffect(() => {
    if (isReducedMotion) return;

    if (!isVisible) {
      pulseTweensRef.current.forEach((t) => t && t.pause());
      floatTweensRef.current.forEach((t) => t && t.pause());
    } else {
      pulseTweensRef.current.forEach((t) => t && t.resume());
      floatTweensRef.current.forEach((t) => t && t.resume());
    }
  }, [isVisible, isReducedMotion]);

  // Entrance & Continuous Animations
  useEffect(() => {
    if (isReducedMotion) {
      // In reduced motion, ensure elements are immediately visible
      if (hubRef.current) gsap.set(hubRef.current, { scale: 1, opacity: 1 });
      pillsRef.current.forEach((p) => p && gsap.set(p, { scale: 1, opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance animation sequence
      const entranceTl = gsap.timeline({ delay: 0.2 });

      // Hub scales in first
      if (hubRef.current) {
        entranceTl.fromTo(
          hubRef.current,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.85, ease: "back.out(1.7)" }
        );
      }

      // Connecting lines draw outward
      const basePaths = pathElementsRef.current.filter(Boolean);
      basePaths.forEach((path) => {
        const len = path.getTotalLength() || 250;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      if (basePaths.length > 0) {
        entranceTl.to(
          basePaths,
          {
            strokeDashoffset: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Pills pop in with stagger
      const pillNodes = pillsRef.current.filter(Boolean);
      if (pillNodes.length > 0) {
        entranceTl.fromTo(
          pillNodes,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.05,
            ease: "back.out(1.5)",
          },
          "-=0.5"
        );
      }

      // 2. Data pulses travelling along lines
      pulseElementsRef.current.forEach((pulseEl, idx) => {
        if (!pulseEl) return;
        const basePath = pathElementsRef.current[idx];
        const pathLen = basePath ? basePath.getTotalLength() : 250;

        // Pulse segment length 28px followed by gap
        gsap.set(pulseEl, {
          strokeDasharray: `28 ${pathLen + 40}`,
          strokeDashoffset: pathLen + 30,
        });

        // Alternating directions: some from hub to pill, some back
        const reverse = idx % 4 === 0;
        const fromOffset = reverse ? -30 : pathLen + 30;
        const toOffset = reverse ? pathLen + 30 : -30;

        const pulseTween = gsap.fromTo(
          pulseEl,
          { strokeDashoffset: fromOffset },
          {
            strokeDashoffset: toOffset,
            duration: 2.2 + (idx % 3) * 0.5,
            repeat: -1,
            ease: "power1.inOut",
            delay: 0.6 + (idx * 0.35) % 2.4,
          }
        );

        pulseTweensRef.current[idx] = pulseTween;
      });

      // 3. Gentle floating drift for each pill
      pillNodes.forEach((pillEl, idx) => {
        const yDrift = 6 + (idx % 3) * 2;
        const xDrift = (idx % 2 === 0 ? 1 : -1) * (4 + (idx % 2) * 2);

        const floatTween = gsap.to(pillEl, {
          y: `+=${yDrift}`,
          x: `+=${xDrift}`,
          duration: 3.2 + (idx % 4) * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: (idx * 0.3) % 2,
        });

        floatTweensRef.current[idx] = floatTween;
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // Adjust pulse speed on hover
  useEffect(() => {
    if (isReducedMotion) return;

    pulseTweensRef.current.forEach((tween, idx) => {
      if (!tween) return;
      if (hoveredIndex === idx) {
        tween.timeScale(2.4);
      } else {
        tween.timeScale(1);
      }
    });
  }, [hoveredIndex, isReducedMotion]);

  // Mouse parallax
  const handleMouseMove = (e) => {
    if (isTouchDevice || isReducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredIndex(null);
  };

  // Smooth scroll handler for pill click
  const handlePillClick = (e, href) => {
    if (href && href.startsWith("/")) {
      // Allow Next.js navigation to /services#slug
      return;
    }
    e.preventDefault();
    const target = document.querySelector(href) || document.getElementById("services");
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Fallback: smooth scroll to next section
      const nextSection =
        document.getElementById("marquee-section") ||
        document.querySelector("section:nth-of-type(2)");
      if (nextSection && window.__lenis) {
        window.__lenis.scrollTo(nextSection, { offset: -60, duration: 1.2 });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] sm:max-w-[620px] aspect-square mx-auto select-none"
      aria-label="Services Network Diagram"
    >
      {/* Background blueprint grid lines with radial fade mask */}
      <div
        className="absolute inset-4 rounded-full pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-surface-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-surface-border) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 72%)",
        }}
      />

      {/* Atmospheric depth blobs */}
      <div
        className="absolute w-44 h-44 rounded-full pointer-events-none blur-3xl opacity-20 -z-0 transition-transform duration-700 ease-out"
        style={{
          backgroundColor: "var(--color-primary-glow)",
          left: "22%",
          top: "24%",
          transform: `translate(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px)`,
        }}
      />
      <div
        className="absolute w-52 h-52 rounded-full pointer-events-none blur-3xl opacity-15 -z-0 transition-transform duration-700 ease-out"
        style={{
          backgroundColor: "var(--color-primary)",
          right: "20%",
          bottom: "22%",
          transform: `translate(${mouseOffset.x * 14}px, ${mouseOffset.y * 14}px)`,
        }}
      />

      {/* SVG Connecting Lines & Traveling Pulses */}
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 6}px, ${mouseOffset.y * 6}px)`,
        }}
      >
        <defs>
          {/* Pulse glow filter */}
          <filter id="pulseGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Central hub breathing glow gradient */}
          <radialGradient id="hubBreathingGlow">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer breathing ring around hub */}
        <circle
          cx={CX}
          cy={CY}
          r="66"
          fill="url(#hubBreathingGlow)"
          stroke="var(--color-primary)"
          strokeOpacity="0.18"
          strokeWidth="1"
          className="animate-pulse"
        />

        {/* Rotating dashed gold ring around hub */}
        <circle
          cx={CX}
          cy={CY}
          r="52"
          fill="none"
          stroke="var(--color-primary)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: isReducedMotion ? "none" : "spin 60s linear infinite",
          }}
        />

        {/* Base connection lines & traveling pulses */}
        <g id="network-lines">
          {nodePositions.map((node) => {
            const isHovered = hoveredIndex === node.index;
            return (
              <g key={node.id}>
                {/* Base curved line */}
                <path
                  ref={(el) => (pathElementsRef.current[node.index] = el)}
                  d={node.pathData}
                  fill="none"
                  stroke={isHovered ? "var(--color-primary)" : "var(--color-secondary)"}
                  strokeWidth={isHovered ? 2 : 1.15}
                  strokeOpacity={isHovered ? 0.95 : 0.38}
                  className="base-path transition-all duration-300"
                />

                {/* Data pulse travelling along line */}
                <path
                  ref={(el) => (pulseElementsRef.current[node.index] = el)}
                  d={node.pathData}
                  fill="none"
                  stroke="var(--color-primary-light)"
                  strokeWidth={isHovered ? 2.8 : 2}
                  strokeLinecap="round"
                  filter="url(#pulseGlow)"
                  opacity={isHovered ? 1 : 0.8}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Center Hub Component */}
      <div
        ref={hubRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 5}px), calc(-50% + ${mouseOffset.y * 5}px))`,
        }}
      >
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative p-3 border border-[var(--color-primary)]/40 shadow-2xl transition-all duration-300 group"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, var(--color-surface) 0%, var(--color-navy-darker) 100%)",
            boxShadow:
              "0 0 35px var(--color-primary-glow), inset 0 0 15px rgba(0,0,0,0.4)",
          }}
        >
          {/* Inner subtle rim */}
          <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />

          {/* Logo Mark with soft breathing scale */}
          <div
            className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
            style={{
              animation: isReducedMotion ? "none" : "floatPulse 4s ease-in-out infinite",
              filter: "drop-shadow(0 0 10px var(--color-primary-glow))",
            }}
          >
            <Image
              src="/logo-mark.png"
              alt="GrowElite Logo Mark"
              width={48}
              height={48}
              priority
              className="object-contain select-none"
            />
          </div>
        </div>
      </div>

      {/* Service Nodes (Pills) Overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px)`,
        }}
      >
        {nodePositions.map((node) => {
          const isHovered = hoveredIndex === node.index;
          return (
            <div
              key={node.id}
              ref={(el) => (pillsRef.current[node.index] = el)}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                left: `${node.leftPct}%`,
                top: `${node.topPct}%`,
              }}
              onMouseEnter={() => setHoveredIndex(node.index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={node.href}
                onClick={(e) => handlePillClick(e, node.href)}
                className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isHovered
                    ? "border-[var(--color-primary)] bg-[var(--color-surface-elevated)]/90 scale-105 shadow-lg shadow-primary/25"
                    : "border-white/10 hover:border-white/20 bg-[var(--color-surface)]/75 hover:bg-[var(--color-surface)]/90 shadow-md shadow-black/25"
                }`}
                data-cursor="pointer"
                aria-label={`Explore service: ${node.label}`}
              >
                {/* Glowing status dot */}
                <span
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    isHovered
                      ? "bg-primary-light shadow-[0_0_10px_var(--color-primary)] scale-110"
                      : "bg-primary shadow-[0_0_6px_var(--color-primary-glow)]"
                  }`}
                />

                {/* Label in uppercase letter-spaced font */}
                <span
                  className={`font-mono text-[9px] sm:text-[11px] uppercase tracking-wider font-medium transition-colors ${
                    isHovered ? "text-white" : "text-white/85 group-hover:text-white"
                  }`}
                >
                  {node.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes floatPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
      `}</style>
    </div>
  );
}
