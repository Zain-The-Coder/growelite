import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About – AGENCYNAME",
  description: "Learn more about our philosophy, leadership, and digital craft.",
};

export default function AboutPage() {
  return (
    <main className="min-h-[80vh] bg-background flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff3366]">
          ORIGINS & LEADERSHIP
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          About &ndash; Coming Soon
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-light">
          We are preparing an in-depth retrospective on our studio history, engineering principles, and creative leadership.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
