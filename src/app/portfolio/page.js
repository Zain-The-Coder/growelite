import fs from "fs";
import path from "path";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import BudgetManagement from "@/components/portfolio/BudgetManagement";
import IndustryExperience from "@/components/portfolio/IndustryExperience";
import WorkingProofGallery from "@/components/portfolio/WorkingProofGallery";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import { proofs } from "@/data/proofs";

export const metadata = {
  title: "Our Work | GrowElite — Digital Marketing & Tech Agency",
  description:
    "Explore working proof from the ad accounts we run: real budgets, performance screenshots, and multi-channel marketing across diverse industries.",
  openGraph: {
    title: "Our Work | GrowElite — Digital Marketing & Tech Agency",
    description:
      "Proof, not promises. Real ad accounts, real budgets, real results. Explore our telemetry screenshots and industry experience.",
    url: "https://growelite.digital/portfolio",
    siteName: "GrowElite",
    type: "website",
  },
};

export default function PortfolioPage() {
  // Server-side check: Only render proofs whose image file exists in public/proofs or public/proof
  const publicDir = path.join(process.cwd(), "public");
  const availableProofs = proofs.filter((p) => {
    if (!p.image) return false;
    const relativePath = p.image.startsWith("/") ? p.image.slice(1) : p.image;
    const diskPath = path.join(publicDir, relativePath);
    const altDiskPath = path.join(
      publicDir,
      relativePath.replace(/^proofs\//, "proof/")
    );
    return fs.existsSync(diskPath) || fs.existsSync(altDiskPath);
  });

  return (
    <main className="relative w-full overflow-hidden bg-[var(--color-background)]">
      {/* 1. Hero Section */}
      <PortfolioHero />

      {/* 2. Budget Management Section */}
      <BudgetManagement />

      {/* 3. Industry Experience Section */}
      <IndustryExperience />

      {/* 4. Working Proof Gallery */}
      <WorkingProofGallery proofs={availableProofs} />

      {/* 5. Final CTA */}
      <PortfolioCTA />
    </main>
  );
}
