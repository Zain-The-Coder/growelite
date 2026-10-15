"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { teamMembers } from "@/data/team";
import Logo from "@/components/ui/Logo";

function TeamMemberCard({ member, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

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
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[360px] sm:max-w-[380px]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="card relative h-[520px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/15 hover:border-primary/60 transition-all duration-500 group shadow-2xl flex flex-col justify-between p-5 sm:p-6"
        data-cursor="pointer"
      >
        {/* Full-Bleed Background Image */}
        <div className="absolute inset-0 z-0 bg-surface">
          {!imageError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              priority={index < 2}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-surface">
              <Logo markOnly width={60} height={60} className="w-14 h-14 mb-4 opacity-30" />
            </div>
          )}

          {/* Top subtle vignette for badge readability */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none" />

          {/* Full-card depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-darker via-navy-darker/75 via-45% to-transparent pointer-events-none" />
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-light text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-black/40 backdrop-blur-md border border-white/20">
              <Sparkles className="w-3 h-3" />
              <span>{member.role}</span>
            </span>
          ) : (
            <div />
          )}

          {member.experience && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b1626]/80 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-medium shadow-md">
              <Clock className="w-3 h-3 text-primary" />
              <span>Exp: {member.experience}</span>
            </span>
          )}
        </div>

        {/* Bottom Glass Content Card */}
        <div className="relative z-10 p-5 rounded-2xl bg-[#0b1626]/80 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 group-hover:border-primary/40 group-hover:bg-[#0b1626]/90">
          {/* Profession with glowing pulse dot */}
          <div className="text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-1.5 mb-1.5">
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
                  className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[10px] font-medium uppercase text-white/85"
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

export default function TeamGrid() {
  return (
    <section
      id="team-grid"
      className="relative py-28 px-5 sm:px-8 md:px-12 bg-boxes overflow-hidden border-t border-white/10"
    >
      <div className="ambient-glow -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
