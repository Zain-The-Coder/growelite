import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Contact – AGENCYNAME",
  description: "Initiate a project inquiry or schedule a private consultation.",
};

export default function ContactPage() {
  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
      <div className="max-w-xl mx-auto space-y-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#ff3366]">
          INITIATE ENGAGEMENT
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
          Contact &ndash; Coming Soon
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-light">
          Our interactive inquiry portal and scheduling matrix are coming online soon. In the meantime, connect with us directly:
        </p>

        {/* Direct Contact Cards */}
        <div className="flex flex-col gap-3 font-mono text-xs text-white/80 text-left bg-white/[0.03] p-6 rounded-2xl border border-white/10">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#ff3366]" />
            <span>{siteConfig.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#00f0ff]" />
            <span>{siteConfig.phone}</span>
          </a>
          <div className="flex items-center gap-3 p-2 text-white/50">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{siteConfig.address}</span>
          </div>
        </div>

        <div className="pt-2">
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
