"use client";

import Marquee from "@/components/ui/Marquee";
import { siteConfig } from "@/data/site";

export default function MarqueeSection() {
  return (
    <section id="marquee-section" className="py-12 bg-navy-dark border-y border-white/10 overflow-hidden">
      <div className="flex flex-col gap-6">
        {/* Top Track: Keywords / Capabilities */}
        <Marquee
          items={siteConfig.marqueeItems}
          speed={32}
          direction="left"
          className="text-lg md:text-2xl font-display font-bold uppercase tracking-wider"
          itemClassName="text-white/80 hover:text-primary transition-colors py-1"
        />

        {/* Bottom Track: Client Tickers & Partners */}
        <div className="border-t border-white/5 pt-4">
          <Marquee
            speed={38}
            direction="right"
            className="text-xs md:text-sm font-mono uppercase tracking-[0.2em]"
            itemClassName="text-white/40 hover:text-white transition-colors"
          >
            {siteConfig.clients.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-4 px-8 py-2 text-white/50 hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-sm bg-primary/60" />
                <span className="font-semibold text-white/90">{client.name}</span>
                <span className="text-white/30 text-xs">[{client.ticker}]</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
