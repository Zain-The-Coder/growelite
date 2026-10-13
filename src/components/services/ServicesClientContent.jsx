"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ServicesHero from "@/components/services/ServicesHero";
import CategoryFilterBar from "@/components/services/CategoryFilterBar";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServiceDetailBlocks from "@/components/services/ServiceDetailBlocks";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import CTA from "@/components/home/CTA";
import { servicesData, serviceCategories } from "@/data/services";

export default function ServicesClientContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const isUserFilteringRef = useRef(false);
  const filterTimeoutRef = useRef(null);

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: servicesData.length };
    servicesData.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered list of services for the overview grid
  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return servicesData;
    return servicesData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Handle category tab click with smooth interaction
  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    isUserFilteringRef.current = true;

    // Reset user filtering lock after 1.5 seconds so scroll spy can resume
    if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    filterTimeoutRef.current = setTimeout(() => {
      isUserFilteringRef.current = false;
    }, 1500);

    // If a specific category is chosen, optionally scroll gently down to the overview grid or category anchor
    const gridEl = document.getElementById("services-grid");
    if (gridEl && window.scrollY < 300) {
      if (window.__lenis) {
        window.__lenis.scrollTo(gridEl, { offset: -90, duration: 1.0 });
      } else {
        gridEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Scroll Spy: Synchronize active category tab with the category currently in viewport
  useEffect(() => {
    const handleScroll = () => {
      if (isUserFilteringRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      const gridEl = document.getElementById("services-grid");

      // If user is at the top / overview grid, keep 'All'
      if (gridEl && window.scrollY < gridEl.offsetTop - 50) {
        // At hero
        return;
      }

      // Check detail block positions
      let currentCat = null;
      for (const service of servicesData) {
        const el = document.getElementById(service.slug);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPosition >= top && scrollPosition <= bottom) {
            currentCat = service.category;
            break;
          }
        }
      }

      if (currentCat && currentCat !== activeCategory) {
        setActiveCategory(currentCat);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    };
  }, [activeCategory]);

  // Handle URL hash navigation on mount (e.g., visiting /services#advertising from home page)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timer = setTimeout(() => {
      const targetId = hash.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -90, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }

        // Set matching category if it's a known service
        const matchingService = servicesData.find((s) => s.slug === targetId);
        if (matchingService) {
          setActiveCategory(matchingService.category);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--color-background)]">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* 2. Sticky Category Filter Bar */}
      <CategoryFilterBar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        categoryCounts={categoryCounts}
      />

      {/* 3a. Overview Grid (14 Service Cards) */}
      <ServicesGrid services={filteredServices} />

      {/* 3b. Detail Blocks (All 14 Full-Width alternating cards) */}
      <ServiceDetailBlocks services={servicesData} />

      {/* 4. Our 5-Step Process Timeline */}
      <ServicesProcess />

      {/* 5. FAQ Accordion */}
      <ServicesFAQ />

      {/* 7. Final CTA Section */}
      <CTA />
    </main>
  );
}
