import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Preloader from "@/components/layout/Preloader";
import PageTransition from "@/components/layout/PageTransition";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "creative marketing agency",
    "technical agency",
    "webgl experiences",
    "next.js engineering",
    "gsap scrolltrigger",
    "brand identity",
    "growth marketing",
  ],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: [
      { url: "/logo-mark.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo-mark.png", type: "image/png" },
    ],
    shortcut: "/logo-mark.png",
  },
  openGraph: {
    title: `${siteConfig.name} — Creative Marketing & Tech Agency`,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} dark`}
      style={{
        "--font-display": "var(--font-syne), 'Syne', sans-serif",
        "--font-sans": "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif",
      }}
    >
      <body className="min-h-screen bg-background text-white antialiased selection:bg-primary selection:text-white flex flex-col justify-between overflow-x-hidden">
        {/* Film grain noise texture */}
        <div className="noise-overlay" />

        {/* Global Experiences */}
        <Preloader />
        <Cursor />

        {/* Smooth scroll container synchronized with GSAP ScrollTrigger */}
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
