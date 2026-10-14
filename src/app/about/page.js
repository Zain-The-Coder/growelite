import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import ValuesGrid from "@/components/about/ValuesGrid";
import MeetCEO from "@/components/about/MeetCEO";
import ServicesStrip from "@/components/about/ServicesStrip";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About | GrowElite — Digital Marketing & Tech Agency",
  description:
    "Learn about GrowElite's origins, leadership under CEO Abdul Basit, and our mission to engineer digital growth systems that increase revenue in 3 to 4 months.",
  openGraph: {
    title: "About GrowElite — Digital Marketing & Tech Agency",
    description:
      "A digital marketing and tech agency built by a team that learned growth from the inside. Meet our CEO Abdul Basit and explore our journey.",
    url: "https://growelite.digital/about",
    siteName: "GrowElite",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[var(--color-background)]">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Our Story Section */}
      <OurStory />

      {/* 3. Journey Timeline Section */}
      <JourneyTimeline />

      {/* 4. What Drives Us (Values) Section */}
      <ValuesGrid />

      {/* 5. Meet Our CEO Section */}
      <MeetCEO />

      {/* 6. Services Strip Section */}
      <ServicesStrip />

      {/* 7. Final CTA Section */}
      <AboutCTA />
    </main>
  );
}
