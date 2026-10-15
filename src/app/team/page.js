import TeamHero from "@/components/team/TeamHero";
import TeamGrid from "@/components/team/TeamGrid";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "Our Team | GrowElite — Leadership & Specialists",
  description:
    "Meet the visionary founders, advertising specialists, engineers, and creative directors driving category growth at GrowElite.",
  openGraph: {
    title: "Our Team | GrowElite",
    description:
      "The minds behind GrowElite. Meet our leadership and growth specialists.",
  },
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <TeamHero />
      <TeamGrid />
      <CTA />
    </main>
  );
}
