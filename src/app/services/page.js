import ServicesClientContent from "@/components/services/ServicesClientContent";

export const metadata = {
  title: "Our Services | GrowElite - Digital Engineering, AI & Creative Agency",
  description:
    "Explore GrowElite's 14 specialized digital capabilities spanning custom software engineering, mobile apps, WebGL, AI voice agents, performance advertising, and commercial creative.",
  openGraph: {
    title: "Our Services | GrowElite",
    description:
      "Everything your brand needs to grow. One team. Custom software, AI voice agents, WebGL, and high-ROAS marketing.",
  },
};

export default function ServicesPage() {
  return <ServicesClientContent />;
}
