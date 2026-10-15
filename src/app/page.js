import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import Stats from "@/components/home/Stats";
import ChatShowcase from "@/components/home/ChatShowcase";
import MeetFounder from "@/components/home/MeetFounder";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import { reviews } from "@/data/reviews";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <AboutTeaser />
      <Stats />
      <ChatShowcase />
      <MeetFounder />
      <Testimonials reviews={reviews} />
      <CTA />
    </div>
  );
}
