import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface LegalHeroProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
}

export function LegalHero({ eyebrow, title, lastUpdated }: LegalHeroProps) {
  return (
    <section className="relative pt-40 pb-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-9"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <span
          className="inline-block text-primary text-xs font-bold uppercase mb-4"
          style={{ letterSpacing: "0.14em" }}
        >
          {eyebrow}
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6 text-text-primary">
          {title}
        </h1>

        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-primary">
          Last updated: {lastUpdated}
        </span>
      </div>
    </section>
  );
}
