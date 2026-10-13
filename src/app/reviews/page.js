import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Reviews – AGENCYNAME",
  description: "Read in-depth client testimonials and verification reports.",
};

export default function ReviewsPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
      <div className="max-w-xl mx-auto space-y-6">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff3366]">
          VERIFIED IMPACT
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Reviews &ndash; Coming Soon
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-light">
          We are curating a complete directory of client video case studies and verified growth metrics.
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
