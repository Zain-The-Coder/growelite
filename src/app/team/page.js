import Team from "@/components/home/Team";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "Our Team | GrowElite - Leadership & Specialists",
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
    <main className="min-h-screen pt-24 bg-[var(--color-background)]">
      <Team id="our-team" />
      <CTA />
    </main>
  );
}
