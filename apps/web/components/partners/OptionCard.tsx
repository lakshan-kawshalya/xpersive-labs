import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PartnerOption } from "@/lib/partnerContent";

export default function OptionCard({ option }: { option: PartnerOption }) {
  return (
    <article className="flex flex-col rounded-3xl border border-border-subtle bg-bg-card p-7 shadow-sm sm:p-8">
      <h3 className="font-display text-2xl font-bold text-text-primary">{option.label}</h3>
      <p className="mt-3 text-base leading-relaxed text-text-secondary">{option.summary}</p>
      <p className="mt-5 rounded-2xl bg-primary/10 p-4 text-base font-semibold leading-relaxed text-dark">
        {option.highlight}
      </p>
      <Link
        href={option.href}
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-dark px-6 py-3 text-base font-semibold text-dark transition-colors duration-200 hover:bg-dark hover:text-white motion-reduce:transition-none sm:mt-auto"
      >
        How {option.label} works <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
