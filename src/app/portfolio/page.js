import PortfolioHero from "@/components/portfolio/PortfolioHero";
import BudgetManagement from "@/components/portfolio/BudgetManagement";
import IndustryExperience from "@/components/portfolio/IndustryExperience";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata = {
  title: "Our Work | GrowElite — Digital Marketing & Tech Agency",
  description:
    "Explore our multi-channel marketing campaigns, budget management, and digital growth systems across diverse industries.",
  openGraph: {
    title: "Our Work | GrowElite — Digital Marketing & Tech Agency",
    description:
      "Real ad accounts, real budgets, real results. Explore our budget management and industry experience.",
    url: "https://growelite.digital/portfolio",
    siteName: "GrowElite",
    type: "website",
  },
};

export default function PortfolioPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[var(--color-background)]">
      {/* 1. Hero Section */}
      <PortfolioHero />

      {/* 2. Budget Management Section */}
      <BudgetManagement />

      {/* 3. Industry Experience Section */}
      <IndustryExperience />

      {/* 4. Final CTA */}
      <PortfolioCTA />
    </main>
  );
}
