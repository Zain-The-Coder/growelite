"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Phone, PhoneCall, Mic, RotateCcw, Volume2, Sparkles, CheckCheck } from "lucide-react";
import { chatDemoData } from "@/data/chatDemo";

export default function ChatShowcase() {
  const containerRef = useRef(null);
  const chatScrollRef = useRef(null);

  // State management
  const [currentStep, setCurrentStep] = useState(0); // 0 to 10
  const [isTyping, setIsTyping] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to pause/play when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll chat container to bottom when new message arrives
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [currentStep, isTyping, isCallActive]);

  // Main orchestration loop
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId;

    const runSequence = () => {
      // Step 0: Initial wait before first human message
      if (currentStep === 0) {
        timeoutId = setTimeout(() => {
          setCurrentStep(1);
        }, 800);
      }
      // Step 1: Human sends msg 1 -> AI typing
      else if (currentStep === 1) {
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            setCurrentStep(2);
          }, 1400);
        }, 1000);
      }
      // Step 2: AI sent msg 2 -> Human sends msg 3
      else if (currentStep === 2) {
        timeoutId = setTimeout(() => {
          setCurrentStep(3);
        }, 1600);
      }
      // Step 3: Human sent msg 3 -> AI typing -> Voice msg 4
      else if (currentStep === 3) {
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            setCurrentStep(4);
            // Play voice waveform for ~4 seconds
            setIsVoicePlaying(true);
            setTimeout(() => {
              setIsVoicePlaying(false);
            }, 4200);
          }, 1500);
        }, 1000);
      }
      // Step 4: Voice msg completed -> Human sends msg 5
      else if (currentStep === 4) {
        // Wait for voice audio animation (4.2s) + small pause
        timeoutId = setTimeout(() => {
          setCurrentStep(5);
        }, 5200);
      }
      // Step 5: Human sent msg 5 -> AI typing -> msg 6
      else if (currentStep === 5) {
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            setCurrentStep(6);
          }, 1400);
        }, 1000);
      }
      // Step 6: AI sent msg 6 -> Human sends msg 7
      else if (currentStep === 6) {
        timeoutId = setTimeout(() => {
          setCurrentStep(7);
        }, 1600);
      }
      // Step 7: Human sent msg 7 -> AI typing -> msg 8 ("Want a live demo call?")
      else if (currentStep === 7) {
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            setCurrentStep(8);
          }, 1400);
        }, 1000);
      }
      // Step 8: AI sent msg 8 -> Trigger "Incoming Call Mode Overlay" for ~3 seconds!
      else if (currentStep === 8) {
        timeoutId = setTimeout(() => {
          setIsCallActive(true);
          setCallTimer(1);

          const callInterval = setInterval(() => {
            setCallTimer((prev) => prev + 1);
          }, 1000);

          setTimeout(() => {
            clearInterval(callInterval);
            setIsCallActive(false);
            // After call ends, user says "Yes!" (Step 9)
            setCurrentStep(9);
          }, 3400);
        }, 1800);
      }
      // Step 9: User said "Yes!" -> AI typing -> Final booking confirmation (Step 10)
      else if (currentStep === 9) {
        timeoutId = setTimeout(() => {
          setIsTyping(true);
          timeoutId = setTimeout(() => {
            setIsTyping(false);
            setCurrentStep(10);
          }, 1300);
        }, 900);
      }
      // Step 10: Complete! Hold for 6 seconds, then reset loop
      else if (currentStep === 10) {
        timeoutId = setTimeout(() => {
          resetDemo();
        }, 6500);
      }
    };

    runSequence();

    return () => clearTimeout(timeoutId);
  }, [currentStep, isVisible]);

  // Restart handler
  const resetDemo = () => {
    setCurrentStep(0);
    setIsTyping(false);
    setIsVoicePlaying(false);
    setIsCallActive(false);
  };

  // Fixed pre-calculated random heights for 30 waveform bars (between 20% and 100%)
  const voiceWaveBars = [
    25, 45, 75, 90, 60, 40, 70, 95, 80, 50, 35, 65, 90, 100, 75, 45, 60, 85, 95,
    70, 40, 55, 80, 90, 65, 40, 60, 80, 50, 30,
  ];

  // 24 bars for the Call Overlay waveform
  const callWaveBars = [
    30, 50, 80, 100, 65, 45, 75, 95, 85, 55, 40, 70, 95, 100, 70, 50, 75, 90,
    60, 45, 65, 85, 50, 30,
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 md:px-12 bg-boxes overflow-hidden border-t border-white/5"
    >
      {/* Ambient background glows */}
      <div className="ambient-glow top-1/3 -left-48 w-[550px] h-[550px] bg-primary/10" />
      <div className="ambient-glow bottom-1/4 -right-48 w-[500px] h-[500px] bg-primary-light/10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4">
          {/* Top Label Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-primary/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary-light font-semibold">
              {chatDemoData.label}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08]">
            {chatDemoData.heading}
          </h2>

          {/* Muted Subline */}
          <p className="text-sm sm:text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            {chatDemoData.mutedLine}
          </p>

          {/* Channel Badge */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white/70">
              <Sparkles className="w-3 h-3 text-primary" />
              {chatDemoData.channelsBadge}
            </span>
          </div>
        </div>

        {/* Chat Window Container with Floating Side Chips */}
        <div className="relative max-w-2xl mx-auto">
          {/* Floating Side Chips (Hidden on small screens, shown on desktop) */}
          <div className="hidden lg:flex flex-col gap-4 absolute -left-52 top-16 z-20 pointer-events-none">
            <div className="px-4 py-2.5 rounded-2xl bg-surface/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-white/80 animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span>Answers calls 24/7</span>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 absolute -right-56 top-24 z-20 pointer-events-none">
            <div
              className="px-4 py-2.5 rounded-2xl bg-surface/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-white/80 animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              <span>Books appointments automatically</span>
            </div>
            <div
              className="px-4 py-2.5 rounded-2xl bg-surface/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-white/80 animate-float self-end"
              style={{ animationDelay: "2.4s" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary-light shadow-[0_0_8px_var(--color-primary-light)]" />
              <span>Syncs with your CRM</span>
            </div>
          </div>

          {/* Main Chat Showcase Window */}
          <div className="relative rounded-3xl bg-surface/60 border border-white/15 backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
            {/* Window Header */}
            <div className="px-4 sm:px-6 py-4 bg-navy-darker/80 border-b border-white/10 flex items-center justify-between z-20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {/* Agent Avatar */}
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-elevated border border-primary/40 flex items-center justify-center shadow-inner">
                  <Image
                    src={chatDemoData.header.avatar}
                    alt={chatDemoData.header.name}
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                  {/* Glowing live status dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                    {chatDemoData.header.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-400/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{chatDemoData.header.status}</span>
                    <span className="text-white/40">• Instant Voice & Text</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Sound indicator & Manual Replay */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetDemo}
                  title="Replay conversation"
                  aria-label="Replay conversation"
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-primary/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
                  data-cursor="pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Conversation Messages Container */}
            <div
              ref={chatScrollRef}
              className="relative p-4 sm:p-6 h-[440px] sm:h-[480px] overflow-y-auto space-y-4 scroll-smooth"
              tabIndex={0}
              aria-live="polite"
              aria-label="Simulated Voice Agent Chat"
            >
              {chatDemoData.messages.map((msg) => {
                if (msg.id > currentStep) return null;
                const isAI = msg.role === "ai";
                const isVoice = msg.type === "voice";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                      isAI ? "items-start" : "items-end"
                    }`}
                  >
                    {/* Role Tag */}
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 px-1">
                      {isAI ? "Ava • AI Agent" : "You"}
                    </span>

                    {/* Standard Text Message Bubble */}
                    {!isVoice ? (
                      <div
                        className={`max-w-[88%] sm:max-w-[78%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md break-words ${
                          isAI
                            ? "bg-white/[0.07] border border-white/10 text-white rounded-tl-sm"
                            : "bg-primary/25 border border-primary/40 text-white font-medium rounded-tr-sm shadow-primary/10"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ) : (
                      /* Special AI Voice Message Bubble (Message 4) */
                      <div className="max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-tl-sm bg-[var(--color-navy-darker)]/90 border border-primary/40 p-4 shadow-xl shadow-primary/15 space-y-3">
                        {/* Audio Player Row */}
                        <div className="flex items-center gap-3">
                          {/* Play / Waveform Trigger Button */}
                          <button
                            type="button"
                            onClick={() => setIsVoicePlaying(!isVoicePlaying)}
                            className="w-9 h-9 rounded-full bg-primary hover:bg-primary-light text-navy-dark flex items-center justify-center transition-all shadow-[0_0_12px_var(--color-primary-glow)] cursor-pointer flex-shrink-0"
                            aria-label={isVoicePlaying ? "Pause voice message" : "Play voice message"}
                            data-cursor="pointer"
                          >
                            {isVoicePlaying ? (
                              <Pause className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            )}
                          </button>

                          {/* 30-Bar Animated Gold Audio Waveform */}
                          <div className="flex-1 flex items-center gap-[2px] sm:gap-[3px] h-8 px-1">
                            {voiceWaveBars.map((heightPct, idx) => (
                              <span
                                key={idx}
                                className={`flex-1 rounded-full transition-all duration-150 ${
                                  isVoicePlaying && !isReducedMotion
                                    ? "bg-gradient-to-t from-primary to-primary-light animate-waveform"
                                    : "bg-primary/50"
                                }`}
                                style={{
                                  height: `${heightPct}%`,
                                  animationDelay: `${(idx * 0.04) % 0.8}s`,
                                }}
                              />
                            ))}
                          </div>

                          {/* Duration Tag */}
                          <span className="text-[11px] font-mono text-primary-light tracking-wider flex-shrink-0">
                            {msg.duration}
                          </span>
                        </div>

                        {/* Live Caption Line */}
                        <div className="pt-2 border-t border-white/10 flex items-start gap-2">
                          <Mic className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs sm:text-sm text-white/90 italic leading-snug break-words">
                            &ldquo;{msg.text}&rdquo;
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* AI Typing Indicator: 3 vertical waveform bars */}
              {isTyping && (
                <div className="flex flex-col items-start animate-in fade-in">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 px-1">
                    Ava is speaking...
                  </span>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.06] border border-white/10 flex items-center gap-1.5 h-10">
                    <span className="w-1 bg-primary rounded-full animate-waveBar1 h-4" />
                    <span className="w-1 bg-primary-light rounded-full animate-waveBar2 h-6" />
                    <span className="w-1 bg-primary rounded-full animate-waveBar3 h-3" />
                  </div>
                </div>
              )}
            </div>

            {/* CALL MODE MOMENT OVERLAY (Between message 8 and 9) */}
            {isCallActive && (
              <div className="absolute inset-0 z-30 bg-navy-darker/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
                {/* Top Call Status */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>VOICE CALL CONNECTED</span>
                </div>

                {/* Central Avatar with Breathing Gold Rings */}
                <div className="flex flex-col items-center my-auto">
                  <div className="relative flex items-center justify-center">
                    {/* Outer Breathing Gold Ring */}
                    <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-primary/40 animate-ping opacity-30" />
                    <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-primary-light/50 animate-pulse" />

                    {/* Avatar Circle */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface border-2 border-primary flex items-center justify-center shadow-[0_0_25px_var(--color-primary-glow)]">
                      <Image
                        src={chatDemoData.callOverlay.avatar}
                        alt="Ava Voice AI"
                        width={38}
                        height={38}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h4 className="mt-4 text-base sm:text-lg font-bold text-white tracking-wide">
                    {chatDemoData.callOverlay.name}
                  </h4>
                  <span className="text-xs font-mono text-primary-light mt-0.5">
                    00:0{callTimer}
                  </span>

                  {/* Large 24-Bar Live Audio Waveform */}
                  <div className="flex items-center gap-1 sm:gap-1.5 h-10 w-48 sm:w-64 my-4">
                    {callWaveBars.map((height, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-full bg-gradient-to-t from-primary to-primary-light ${
                          !isReducedMotion ? "animate-waveform" : ""
                        }`}
                        style={{
                          height: `${height}%`,
                          animationDelay: `${(i * 0.05) % 0.7}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Live Spoken Transcription Box */}
                  <div className="max-w-md px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs sm:text-sm text-white/90 italic text-center">
                    &ldquo;{chatDemoData.callOverlay.caption}&rdquo;
                  </div>
                </div>

                {/* Bottom Call Controls (Visual indicator) */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-500/90 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                    <Phone className="w-5 h-5 rotate-[135deg]" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Bar: Input field simulation */}
            <div className="p-3 sm:p-4 bg-navy-darker/60 border-t border-white/10 flex items-center gap-3 z-10 backdrop-blur-md">
              <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/40 flex items-center justify-between">
                <span>Talk or type to Ava...</span>
                <Mic className="w-4 h-4 text-primary" />
              </div>
              <button
                type="button"
                onClick={resetDemo}
                className="px-3.5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-navy-darker font-semibold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                data-cursor="pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS Keyframes for Waveform Animations */}
      <style jsx>{`
        @keyframes waveform {
          0% {
            height: 20%;
          }
          100% {
            height: 100%;
          }
        }
        .animate-waveform {
          animation: waveform 0.6s ease-in-out infinite alternate;
        }

        @keyframes waveBar1 {
          0%,
          100% {
            height: 6px;
          }
          50% {
            height: 18px;
          }
        }
        @keyframes waveBar2 {
          0%,
          100% {
            height: 18px;
          }
          50% {
            height: 8px;
          }
        }
        @keyframes waveBar3 {
          0%,
          100% {
            height: 8px;
          }
          50% {
            height: 20px;
          }
        }
        .animate-waveBar1 {
          animation: waveBar1 0.7s ease-in-out infinite;
        }
        .animate-waveBar2 {
          animation: waveBar2 0.7s ease-in-out infinite 0.15s;
        }
        .animate-waveBar3 {
          animation: waveBar3 0.7s ease-in-out infinite 0.3s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
