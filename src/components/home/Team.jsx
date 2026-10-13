"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Clock, Sparkles } from "lucide-react";
import { teamMembers } from "@/data/team";

function TeamMemberCard({ member, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[360px] sm:max-w-[380px]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="card relative h-[520px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/15 hover:border-primary/60 transition-all duration-500 group shadow-2xl flex flex-col justify-between p-5 sm:p-6"
        data-cursor="pointer"
      >
        {/* Full-Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            priority={index === 0}
          />

          {/* Top subtle vignette for badge readability */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Full-card depth gradient: keeps photo visible throughout while ensuring 100% text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-darker)] via-[var(--color-navy-darker)]/75 via-45% to-transparent pointer-events-none" />
        </div>

        {/* Interactive Cursor Spotlight Glow */}
        <div
          className="pointer-events-none absolute w-[280px] h-[280px] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)",
            transform: `translate(${mousePos.x - 140}px, ${mousePos.y - 140}px)`,
          }}
        />

        {/* Top Header Row over Image */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          {member.role ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-black/40 backdrop-blur-md border border-white/20">
              <Sparkles className="w-3 h-3" />
              <span>{member.role}</span>
            </span>
          ) : (
            <div />
          )}

          {member.experience && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b1626]/75 backdrop-blur-md border border-white/20 text-white/90 font-mono text-[11px] shadow-md">
              <Clock className="w-3 h-3 text-primary" />
              <span>Years Of Experience : {member.experience}</span>
            </span>
          )}
        </div>

        {/* Bottom Glass Content Card directly over the photo */}
        <div className="relative z-10 p-5 rounded-2xl bg-[#0b1626]/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 group-hover:border-primary/40 group-hover:bg-[#0b1626]/90">
          {/* Profession with glowing pulse dot */}
          <div className="font-mono text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] animate-pulse" />
            <span>{member.profession}</span>
          </div>

          {/* Name */}
          <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-primary-light transition-colors mb-2">
            {member.name}
          </h3>

          {/* Bio */}
          {member.bio && (
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-3 line-clamp-2">
              {member.bio}
            </p>
          )}

          {/* Skills Tags */}
          {member.skills && member.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/10">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-mono uppercase text-white/85"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team({ id = "team" }) {
  return (
    <section
      id={id}
      className="relative py-32 px-6 md:px-12 bg-boxes overflow-hidden border-t border-white/10"
    >
      {/* Background Ambient Glow */}
      <div className="ambient-glow -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface border border-white/10 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary shadow-sm">
            <Users className="w-3.5 h-3.5" />
            <span>OUR TEAM</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            The Minds Behind GrowElite.
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-light leading-relaxed">
            A battle-tested team of media architects, engineers, and creative strategists dedicated to turning attention into compounding brand equity.
          </p>
        </div>

        {/* Team Members Grid (Center-aligned, flexible for 1 or more members) */}
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
