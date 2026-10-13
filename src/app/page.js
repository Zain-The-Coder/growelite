import Hero from "@/components/home/Hero";
import MarqueeSection from "@/components/home/MarqueeSection";
import AboutTeaser from "@/components/home/AboutTeaser";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import FeaturedWork from "@/components/home/FeaturedWork";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <MarqueeSection />
      <AboutTeaser />
      <Services />
      <Stats />
      <FeaturedWork />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
