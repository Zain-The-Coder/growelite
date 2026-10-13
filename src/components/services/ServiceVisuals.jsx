"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Smartphone,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Play,
  Volume2,
  PhoneCall,
  Search,
  Award,
  Heart,
  MessageSquare,
  BarChart3,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

// 1. SOFTWARE DEVELOPMENT: IDE Code Editor Visual
export function CodeWindowVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-[var(--color-navy-darker)]/90 border border-white/10 p-5 shadow-2xl flex flex-col justify-between overflow-hidden group">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 font-mono text-[11px] text-white/40">
            cluster.service.ts
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary-light">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>TSC 0 ERRORS</span>
        </div>
      </div>

      {/* Code Area */}
      <div className="font-mono text-xs text-white/80 space-y-2 py-3 overflow-hidden leading-relaxed select-none">
        <div className="text-white/40">// 1. Initialize high-throughput worker pool</div>
        <div>
          <span className="text-primary-light font-bold">export async function</span>{" "}
          <span className="text-white">spawnCluster</span>() {"{"}
        </div>
        <div className="pl-4">
          <span className="text-primary">const</span> engine ={" "}
          <span className="text-primary-light">await</span> Microservice.
          <span className="text-white/90">scale</span>({"{"}
        </div>
        <div className="pl-8 text-white/60">
          concurrency: <span className="text-primary-light font-bold">128</span>,
        </div>
        <div className="pl-8 text-white/60">
          latencyTarget: <span className="text-primary-light">&quot;&lt;15ms&quot;</span>,
        </div>
        <div className="pl-4">{"});"}</div>
        <div className="pl-4">
          <span className="text-primary-light font-bold">return</span> engine.
          <span className="text-white">deploy</span>();
        </div>
        <div>{"}"}</div>
      </div>

      {/* Terminal Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-primary" />
          <span className="text-white/80">&gt; release:v4.2.0 deployed in 18ms</span>
          <span className="w-2 h-4 bg-primary animate-pulse" />
        </div>
        <span className="text-primary-light font-bold">100% HEALTH</span>
      </div>
    </div>
  );
}

// 2. APP DEVELOPMENT: Mobile Frame with Floating UI Cards
export function MobileAppVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex items-center justify-center">
      {/* Central Phone Mockup */}
      <div className="relative w-[220px] sm:w-[240px] h-[320px] rounded-[36px] bg-surface border-4 border-white/15 p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island Notch */}
        <div className="w-20 h-4 bg-black/60 rounded-full mx-auto mb-2 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary/60" />
        </div>

        {/* App Content Preview */}
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] font-mono text-primary uppercase">Portfolio Balance</div>
            <div className="text-lg font-display font-bold text-white">$48,290.45</div>
            <div className="text-[10px] text-green-400 font-mono">+18.4% this week</div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 p-2 rounded-xl bg-primary/20 border border-primary/30 text-center text-[10px] font-mono text-white font-bold">
              Send
            </div>
            <div className="flex-1 p-2 rounded-xl bg-white/10 text-center text-[10px] font-mono text-white/70">
              Receive
            </div>
          </div>
        </div>

        {/* Bottom Home Indicator */}
        <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2" />
      </div>

      {/* Floating Card 1: Push Notification */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 -left-2 sm:left-4 p-3 rounded-2xl bg-surface-elevated/95 border border-primary/40 shadow-xl backdrop-blur-md max-w-[190px]"
      >
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-mono uppercase text-white font-bold">New Milestone</span>
        </div>
        <p className="text-[11px] text-white/80 leading-tight">10,000 active app sessions in 24h</p>
      </motion.div>

      {/* Floating Card 2: 120 FPS Badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-4 -right-2 sm:right-4 p-3 rounded-2xl bg-surface-elevated/95 border border-white/10 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-white">120 FPS Native</span>
        </div>
        <span className="text-[10px] font-mono text-white/50">Fluid ProMotion Engine</span>
      </motion.div>
    </div>
  );
}

// 3. ECOMMERCE DEVELOPMENT: Luxury Checkout Card
export function EcommerceVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
            HEADLESS CHECKOUT FLOW
          </span>
          <h4 className="font-display text-base font-bold text-white">Aura Edition Flagship</h4>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-mono text-primary-light font-bold">
          VIP TIER
        </span>
      </div>

      {/* Middle: Product Capsule Preview */}
      <div className="flex items-center gap-4 py-4">
        <div className="w-16 h-16 rounded-2xl bg-navy-darker border border-primary/40 flex items-center justify-center shadow-lg relative group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-primary-light animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold text-white">Chronograph Chrono 01</span>
            <span className="text-sm font-mono font-bold text-primary-light">$450.00</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
            <span>Qty: 1</span>
            <span>•</span>
            <span className="text-green-400">In Stock (Dispatches in 2h)</span>
          </div>
        </div>
      </div>

      {/* Animated Action Pill */}
      <div className="space-y-3">
        <div className="flex justify-between text-xs font-mono text-white/70">
          <span>Subtotal + Free Global Courier</span>
          <span className="text-white font-bold">$450.00</span>
        </div>
        <div className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-xs uppercase tracking-widest text-center shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
          <span>Instant Apple Pay Checkout</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
        <div className="flex justify-center items-center gap-3 text-[10px] font-mono text-white/40">
          <span>🔒 256-Bit SSL Encrypted</span>
          <span>•</span>
          <span>Stripe Elements</span>
        </div>
      </div>
    </div>
  );
}

// 4. DASHBOARD DEVELOPMENT: Telemetry HUD Console
export function DashboardVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      {/* Dashboard Top Metrics */}
      <div className="grid grid-cols-2 gap-3 pb-4 border-b border-white/10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] font-mono uppercase text-white/50">ARR Growth Velocity</div>
          <div className="text-xl font-display font-black text-white">$1,482,900</div>
          <div className="text-[10px] font-mono text-green-400">+54.2% YoY</div>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-[10px] font-mono uppercase text-white/50">Global Uptime</div>
          <div className="text-xl font-display font-black text-primary-light">99.992%</div>
          <div className="text-[10px] font-mono text-white/60">12ms Median Latency</div>
        </div>
      </div>

      {/* SVG Sparkline & Bar Chart */}
      <div className="py-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mb-2">
          <span>Realtime Telemetry (30d)</span>
          <span className="text-primary-light">▲ Active Streams: 8,420</span>
        </div>
        <div className="relative h-24 w-full flex items-end gap-2 pt-4">
          {[40, 55, 45, 68, 60, 82, 75, 95, 88, 100].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div
                initial={{ height: "0%" }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                className={`w-full rounded-t-sm ${
                  i === 9
                    ? "bg-gradient-to-t from-primary to-primary-light shadow-[0_0_12px_var(--color-primary)]"
                    : "bg-white/20 hover:bg-white/40 transition-colors"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          WebSockets Connected
        </span>
        <span>ClickHouse Columnar Engine</span>
      </div>
    </div>
  );
}

// 5. FULL STACK DEVELOPMENT: Multi-Tier Architecture Visual
export function FullStackVisual() {
  const tiers = [
    { name: "Frontend Edge", tech: "Next.js 16 • Turbopack • Vercel CDN", status: "0ms Cold" },
    { name: "API & GraphQL Gateway", tech: "Node • TypeScript • OAuth2 Passkeys", status: "Sub-10ms" },
    { name: "Microservice Core", tech: "Docker • Golang • Event Bus", status: "Auto-Scale" },
    { name: "Persistent Store", tech: "PostgreSQL • Redis Cache • Prisma", status: "Synced" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          FULL-STACK ARCHITECTURE
        </span>
        <span className="text-[10px] font-mono text-white/50">END-TO-END TYPE SAFETY</span>
      </div>

      <div className="space-y-2.5 py-2">
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-primary/40 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-md bg-primary/20 border border-primary/40 text-[10px] font-mono font-bold text-primary-light flex items-center justify-center">
                0{i + 1}
              </span>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-primary-light transition-colors">
                  {tier.name}
                </div>
                <div className="text-[10px] font-mono text-white/40">{tier.tech}</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
              {tier.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <span className="text-primary-light">● CI/CD Automated Pipeline</span>
        <span>100/100 Lighthouse Performance</span>
      </div>
    </div>
  );
}

// 6. 3D WEBSITES: Isometric Rotating Wireframe Cube
export function ThreeDWebVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-6 shadow-2xl flex flex-col justify-between items-center overflow-hidden">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
        <span className="text-primary font-bold">WebGL 2.0 / SHADER ENGINE</span>
        <span className="text-green-400">● 60.0 FPS</span>
      </div>

      {/* Rotating 3D Geometric Cube Representation */}
      <div className="relative w-40 h-40 flex items-center justify-center my-auto">
        {/* Pulsing Concentric Golden Rings */}
        <div className="absolute inset-0 rounded-full border border-primary/25 animate-ping opacity-20" />
        <div className="absolute inset-4 rounded-full border border-dashed border-primary/40 animate-spin" style={{ animationDuration: "24s" }} />

        {/* Central Geometric Isometric Box */}
        <div className="relative w-24 h-24 transform rotate-45 border-2 border-primary bg-primary/10 shadow-[0_0_35px_var(--color-primary-glow)] flex items-center justify-center">
          <div className="w-12 h-12 border border-primary-light/60 bg-surface rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          </div>

          {/* Vertex Nodes */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-primary-light shadow-[0_0_8px_var(--color-primary)]" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary-light shadow-[0_0_8px_var(--color-primary)]" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-primary-light shadow-[0_0_8px_var(--color-primary)]" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary-light shadow-[0_0_8px_var(--color-primary)]" />
        </div>
      </div>

      {/* Footer HUD info */}
      <div className="w-full flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-white/50">
        <span>Draw Calls: 14</span>
        <span>GLSL Fragment Shaders</span>
        <span className="text-primary-light font-bold">Lenis Synced</span>
      </div>
    </div>
  );
}

// 7. AI VOICE AGENT: Pulsing Waveform + Live Transcript
export function VoiceAgentVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      {/* Live Call Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary relative">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">GrowElite Voice AI</div>
            <div className="text-[10px] font-mono text-white/50">Live Call • 00:42</div>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 font-mono text-[10px] font-bold">
          ACTIVE INBOUND
        </span>
      </div>

      {/* Animated Voice Waveform (24 bars) */}
      <div className="py-4 flex flex-col items-center">
        <div className="text-[11px] font-mono text-primary-light mb-2">
          Natural Vocal Cadence (Sub-500ms Latency)
        </div>
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-16 w-full max-w-xs">
          {[20, 45, 75, 30, 90, 60, 100, 40, 85, 95, 35, 70, 90, 45, 80, 100, 60, 30, 85, 50, 70, 40, 20].map(
            (h, i) => (
              <motion.span
                key={i}
                animate={{
                  height: [`${Math.max(15, h * 0.3)}%`, `${h}%`, `${Math.max(15, h * 0.4)}%`],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 6) * 0.15,
                }}
                className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-primary to-primary-light shadow-[0_0_8px_var(--color-primary-glow)]"
              />
            )
          )}
        </div>
      </div>

      {/* Live Transcript Speech Bubble */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-light text-white/90">
        <div className="flex items-center gap-2 mb-1 font-mono text-[10px] text-primary">
          <Volume2 className="w-3 h-3" />
          <span>Ava (AI Agent):</span>
        </div>
        <p className="italic">
          &quot;I&apos;ve qualified your requirements and booked the strategy call for tomorrow at 11:00 AM. Confirmation sent to your CRM ✓&quot;
        </p>
      </div>
    </div>
  );
}

// 8. ADVERTISING: High ROAS Growth Visual
export function AdvertisingVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-mono text-xs uppercase text-primary font-bold">
          PERFORMANCE AD ENGINE
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary-light text-[10px] font-mono font-bold">
          META + GOOGLE PMAX
        </span>
      </div>

      {/* ROAS Counters */}
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-[10px] font-mono text-white/50">Blended ROAS</div>
          <div className="text-lg font-display font-black text-primary-light">3.84x</div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-[10px] font-mono text-white/50">Target CPA</div>
          <div className="text-lg font-display font-black text-green-400">$16.20</div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
          <div className="text-[10px] font-mono text-white/50">Total Spend</div>
          <div className="text-lg font-display font-black text-white">$124.5k</div>
        </div>
      </div>

      {/* SVG Climbing Curve */}
      <div className="relative h-20 w-full overflow-hidden">
        <svg viewBox="0 0 300 80" className="w-full h-full preserve-3d">
          <defs>
            <linearGradient id="adGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 70 Q 75 60, 150 40 T 300 10 L 300 80 L 0 80 Z"
            fill="url(#adGlow)"
          />
          <path
            d="M0 70 Q 75 60, 150 40 T 300 10"
            fill="none"
            stroke="var(--color-primary-light)"
            strokeWidth="3"
          />
          <circle cx="300" cy="10" r="5" fill="#ffffff" filter="drop-shadow(0 0 6px var(--color-primary))" />
        </svg>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <span>Server-Side CAPI Configured</span>
        <span className="text-green-400 font-bold">+280% Net Lift</span>
      </div>
    </div>
  );
}

// 9. SEO: Search Ranking Ladder Visual
export function SeoVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      {/* Search Header */}
      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
        <Search className="w-4 h-4 text-primary" />
        <span className="text-xs font-mono text-white/80">
          google.com/search?q=best+enterprise+ai+voice+platform
        </span>
      </div>

      {/* SERP Result Card (#1) */}
      <div className="p-4 rounded-xl bg-white/5 border border-primary/40 shadow-lg relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-md bg-primary text-black font-mono text-[10px] font-black">
            #1 RANK
          </span>
          <span className="text-xs font-mono text-white/50">https://yourbrand.com</span>
        </div>
        <div className="text-sm font-display font-bold text-primary-light mb-1">
          Your Brand™ | Category-Leading AI Voice &amp; Enterprise Platforms
        </div>
        <p className="text-[11px] text-white/60 line-clamp-2">
          Scale conversions with autonomous AI voice agents, sub-500ms response telephony, and custom software systems.
        </p>
      </div>

      {/* SEO Metrics Row */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
        <div className="p-2 rounded-lg bg-white/5">
          <div className="text-white/40">Domain Rating</div>
          <div className="text-sm font-bold text-white">DR 78</div>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          <div className="text-white/40">Organic Traffic</div>
          <div className="text-sm font-bold text-green-400">+192% MoM</div>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          <div className="text-white/40">Core Web Vitals</div>
          <div className="text-sm font-bold text-primary-light">100 / 100</div>
        </div>
      </div>
    </div>
  );
}

// 10. SOCIAL MEDIA: High-Retention Engagement Card
export function SocialMediaVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-bold text-primary text-xs">
            GE
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              GrowElite Brand <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="text-[10px] font-mono text-white/40">@growelite • 2h ago</div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-green-400">Viral Traction</span>
      </div>

      <div className="p-3 rounded-xl bg-white/5 border border-white/10 my-2 text-xs text-white/80 leading-relaxed font-light">
        &quot;Most companies lose 40% of their ad spend because of slow load times and robotic copy. Here is the exact blueprint we used to scale revenue 3x in 90 days. 🧵👇&quot;
      </div>

      {/* Engagement Counter */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-4 text-white/70">
          <span className="flex items-center gap-1.5 text-primary-light">
            <Heart className="w-4 h-4 fill-primary/40 text-primary" /> 14.8k
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-white/50" /> 842
          </span>
        </div>
        <span className="text-[10px] text-primary font-bold">8.4% ENGAGEMENT RATE</span>
      </div>
    </div>
  );
}

// 11. BIZ DEV: Enterprise Outbound Funnel
export function BizDevVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-mono text-xs uppercase text-primary font-bold">
          B2B PIPELINE FUNNEL
        </span>
        <span className="text-[10px] font-mono text-white/50">ENTERPRISE OUTBOUND</span>
      </div>

      <div className="space-y-2 py-2">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex justify-between text-xs font-mono">
          <span className="text-white/60">1. Target ICP Verified Contacts</span>
          <span className="text-white font-bold">2,400 Accounts</span>
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex justify-between text-xs font-mono">
          <span className="text-white/60">2. Deliverability &amp; In-Box Placement</span>
          <span className="text-green-400 font-bold">99.4% Primary Inbox</span>
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex justify-between text-xs font-mono">
          <span className="text-white/60">3. Positive Reply Velocity</span>
          <span className="text-primary-light font-bold">14.2% Qualified Replies</span>
        </div>
        <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/40 flex justify-between text-xs font-mono">
          <span className="text-white font-bold">4. Booked Discovery Calls</span>
          <span className="text-primary-light font-black">32 Calls / Mo</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <span>Pipeline Generated:</span>
        <span className="text-primary-light font-bold">$1.85M Qualified Value</span>
      </div>
    </div>
  );
}

// 12. VIDEO EDITING: Multi-Track NLE Timeline Visual
export function VideoEditingVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white">REC 4K PRORES 422</span>
        </div>
        <span className="text-primary-light font-bold">00:02:14:18</span>
      </div>

      {/* Multi Track Timeline */}
      <div className="space-y-2 py-3 relative">
        {/* Animated Playhead line */}
        <motion.div
          animate={{ left: ["5%", "90%", "5%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-[2px] bg-primary-light z-20 shadow-[0_0_8px_var(--color-primary)]"
        />

        {/* Video Track 1 */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
          <span className="w-8">V1</span>
          <div className="flex-1 h-7 rounded-md bg-primary/30 border border-primary/40 flex items-center px-3 text-white text-[11px] font-semibold">
            Hero A-Roll Cut (60fps)
          </div>
        </div>

        {/* Video Track 2: VFX */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
          <span className="w-8">V2</span>
          <div className="w-3/5 h-7 rounded-md bg-white/10 border border-white/15 flex items-center px-3 text-white/80 text-[11px]">
            Kinetic Motion Graphic
          </div>
        </div>

        {/* Audio Track 1: Foley/Score */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
          <span className="w-8">A1</span>
          <div className="flex-1 h-6 rounded-md bg-green-500/20 border border-green-500/30 flex items-center px-3 text-green-300 text-[10px]">
            Dolby Atmos Sound Design &amp; EQ
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <span>Color Grade: Custom Film LUT</span>
        <span className="text-primary-light font-bold">High-Retention Pacing</span>
      </div>
    </div>
  );
}

// 13. CONTENT WRITING: Editorial Typography Manuscript
export function ContentWritingVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-mono text-xs uppercase text-primary font-bold">
          STRATEGIC COPYWRITING
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-mono">
          HIGH CONVERSION
        </span>
      </div>

      <div className="py-3 space-y-3 font-serif">
        <div className="font-display text-base font-bold text-white">
          &quot;In an era of generic templates, distinct storytelling is your highest-leverage moat.&quot;
        </div>
        <p className="text-xs text-white/70 leading-relaxed font-sans font-light">
          We deconstruct the deep psychological objections of your enterprise buyers and craft narratives that transform skepticism into irreversible conviction.
        </p>
      </div>

      <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
        <div className="p-2 rounded-lg bg-white/5">
          <div className="text-white/40">Readability</div>
          <div className="text-xs font-bold text-white">Grade 9 Clear</div>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          <div className="text-white/40">SEO Score</div>
          <div className="text-xs font-bold text-green-400">98 / 100</div>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          <div className="text-white/40">Engagement</div>
          <div className="text-xs font-bold text-primary-light">+45% Lift</div>
        </div>
      </div>
    </div>
  );
}

// 14. GRAPHIC DESIGNING: Design System Swatches & Tokens
export function GraphicDesignVisual() {
  const swatches = [
    { label: "Primary Gold", hex: "#B0772D", bg: "bg-[#b0772d]" },
    { label: "Background Navy", hex: "#192E41", bg: "bg-[#192e41]" },
    { label: "Gold Light", hex: "#C9A063", bg: "bg-[#c9a063]" },
    { label: "Darker Navy", hex: "#0B1626", bg: "bg-[#0b1626]" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl bg-surface/90 border border-white/10 p-5 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <span className="font-mono text-xs uppercase text-primary font-bold">
          DESIGN SYSTEM &amp; BRAND TOKENS
        </span>
        <span className="text-[10px] font-mono text-white/50">FIGMA COMPONENT LIB</span>
      </div>

      {/* Color Palette Tokens */}
      <div className="grid grid-cols-4 gap-2.5 py-3">
        {swatches.map((swatch) => (
          <div key={swatch.hex} className="space-y-1.5">
            <div
              className={`w-full h-16 rounded-xl ${swatch.bg} border border-white/20 shadow-md flex items-end p-1.5`}
            />
            <div className="text-[10px] font-mono text-white/80 font-bold">{swatch.hex}</div>
            <div className="text-[9px] font-mono text-white/40 truncate">{swatch.label}</div>
          </div>
        ))}
      </div>

      {/* Typography Specimen */}
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
        <div>
          <span className="font-display font-black text-white text-base">Aa Poppins Display</span>
          <div className="text-[10px] font-mono text-white/40">Black 900 • Bold 700 • Regular 400</div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-primary/20 text-primary-light font-mono text-[10px] font-bold">
          VECTOR SVG
        </div>
      </div>
    </div>
  );
}

// Master map linking service slugs to their bespoke visuals
export const serviceVisualComponents = {
  "software-development": CodeWindowVisual,
  "app-development": MobileAppVisual,
  "ecommerce-development": EcommerceVisual,
  "dashboard-development": DashboardVisual,
  "full-stack-development": FullStackVisual,
  "3d-website-development": ThreeDWebVisual,
  "ai-voice-agent": VoiceAgentVisual,
  "advertising": AdvertisingVisual,
  "seo": SeoVisual,
  "social-media-management": SocialMediaVisual,
  "business-development": BizDevVisual,
  "video-editing": VideoEditingVisual,
  "content-writing": ContentWritingVisual,
  "graphic-designing": GraphicDesignVisual,
};

export default function ServiceVisual({ slug }) {
  const Component = serviceVisualComponents[slug] || CodeWindowVisual;
  return <Component />;
}
