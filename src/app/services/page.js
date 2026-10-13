import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Services – AGENCYNAME",
  description: "Explore our comprehensive capabilities across design, WebGL, and engineering.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00f0ff]">
          CAPABILITIES ARCHIVE
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Services &ndash; Coming Soon
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-light">
          Our detailed service scopes, delivery timelines, and technology benchmarks will be unveiled here shortly.
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
