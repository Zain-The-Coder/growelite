import ReviewsHero from "@/components/reviews/ReviewsHero";
import ReviewSliders from "@/components/reviews/ReviewSliders";
import OurClients from "@/components/reviews/OurClients";
import ReviewsCTA from "@/components/reviews/ReviewsCTA";
import { getReviews } from "@/lib/getReviews";



export const metadata = {
  title: "Reviews & Clients | GrowElite — Digital Marketing & Tech Agency",
  description:
    "Explore real client reviews, verified performance results, and the growing roster of global brands scaled by GrowElite.",
  openGraph: {
    title: "Reviews & Clients | GrowElite — Digital Marketing & Tech Agency",
    description:
      "Real campaigns, real budgets, real results. Read testimonials from founders and explore the brands that grew with GrowElite.",
    url: "https://growelite.digital/reviews",
    siteName: "GrowElite",
    type: "website",
  },
};

export default async function ReviewsPage() {
  const { reviews, count, average } = await getReviews();

  return (
    <main className="relative w-full overflow-hidden bg-[var(--color-background)]">
      {/* 1. Hero Section */}
      <ReviewsHero average={average} count={count} />

      {/* 2. Client Reviews (Horizontal Sliders or Empty State) */}
      <ReviewSliders reviews={reviews} />

      {/* 3. Our Clients (Marquee & Responsive Grid) */}
      <OurClients />

      {/* 4. Final CTA */}
      <ReviewsCTA />
    </main>
  );
}
