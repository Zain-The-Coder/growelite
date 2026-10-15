import Hero from "@/components/home/Hero";
import AboutTeaser from "@/components/home/AboutTeaser";
import Stats from "@/components/home/Stats";
import ChatShowcase from "@/components/home/ChatShowcase";
import MeetFounder from "@/components/home/MeetFounder";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import { getReviews } from "@/lib/getReviews";

export default async function Home() {
  const { reviews } = await getReviews({ limit: 12 });

  return (
    <div className="relative w-full overflow-hidden">
      <Hero />
      <AboutTeaser />
      <Stats />
      <ChatShowcase />
      <MeetFounder />
      {reviews && reviews.length > 0 && <Testimonials reviews={reviews} />}
      <CTA />
    </div>
  );
}
