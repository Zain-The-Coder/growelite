import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import Stats from "@/components/home/Stats";
import ChatShowcase from "@/components/home/ChatShowcase";
import MeetFounder from "@/components/home/MeetFounder";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <AboutTeaser />
      <Stats />
      <ChatShowcase />
      <MeetFounder />
      <CTA />
    </div>
  );
}
