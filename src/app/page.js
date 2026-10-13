import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import Stats from "@/components/home/Stats";
import ChatShowcase from "@/components/home/ChatShowcase";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <AboutTeaser />
      <Stats />
      <ChatShowcase />
      <Testimonials />
      <CTA />
    </div>
  );
}
