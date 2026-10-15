"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import PageTransition from "@/components/layout/PageTransition";

function ChromeWrapper({ children }) {
  const pathname = usePathname();
  const isStandalone = pathname?.startsWith("/admin") || pathname?.startsWith("/review");

  if (isStandalone) {
    return (
      <main className="min-h-screen w-full flex flex-col justify-start">
        {children}
      </main>
    );
  }

  return (
    <>
      <Preloader />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}

export default function SiteChrome({ children }) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full flex flex-col justify-start">
          {children}
        </main>
      }
    >
      <ChromeWrapper>{children}</ChromeWrapper>
    </Suspense>
  );
}
