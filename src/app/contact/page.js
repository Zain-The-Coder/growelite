import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | GrowElite — Digital Marketing & Tech Agency",
  description:
    "Get in touch with GrowElite to initiate your next web engineering, mobile app, AI agent, or performance marketing campaign. Reach out directly or send us an inquiry.",
  openGraph: {
    title: "Contact | GrowElite — Digital Marketing & Tech Agency",
    description:
      "Start your project with GrowElite. Get in touch for custom digital marketing campaigns, full-stack web and mobile development, and growth architecture.",
  },
};

export default function ContactPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[var(--color-background)]">
      {/* 1. Hero Section */}
      <ContactHero />

      {/* 2. Main Two-Column Contact Section */}
      <section
        id="inquiry"
        className="section-dark border-b border-[var(--color-surface-border)] py-16 sm:py-24 px-5 sm:px-8 md:px-12 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Direct Info & Process Steps */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ContactInfo />
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      {/* NOTE: No bottom CTA section per specification — form is the CTA and page ends directly into Footer */}
    </main>
  );
}
