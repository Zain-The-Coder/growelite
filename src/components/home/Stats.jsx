"use client";

import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import { statsData } from "@/data/stats";

export default function Stats() {
  return (
    <section className="py-28 px-6 md:px-12 bg-background border-y border-white/5 relative overflow-hidden">
      <div className="ambient-glow -top-32 right-1/4 w-[500px] h-[500px] bg-primary/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 rounded-2xl bg-surface/40 border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group backdrop-blur-sm"
            >
              <div className="mb-6">
                <span className="font-display text-5xl sm:text-6xl font-black text-white group-hover:text-primary transition-colors duration-300 tracking-tight block">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={2.4}
                  />
                </span>
                <span className="h-1 w-12 bg-gradient-to-r from-primary to-primary-light block mt-4 group-hover:w-20 transition-all duration-300" />
              </div>

              <div>
                <h4 className="font-display text-lg font-bold uppercase text-white/90 mb-2">
                  {stat.label}
                </h4>
                <p className="text-xs font-mono text-white/50 leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
