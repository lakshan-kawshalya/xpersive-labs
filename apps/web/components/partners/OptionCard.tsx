import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/partners/Reveal";
import type { PartnerOption } from "@/lib/partnerContent";

export default function OptionCard({ option }: { option: PartnerOption }) {
  const Icon = option.icon;

  return (
    <Reveal className="h-full">
      <article
        className="group flex h-full flex-col rounded-3xl border border-primary/10 p-8 transition-colors duration-300 hover:border-primary/30 sm:p-10"
        style={{ background: "var(--surface-card)", boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
      >
        <div
          className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-primary/30"
          style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))" }}
        >
          <Icon size={24} className="text-primary" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-bold text-text-primary">{option.label}</h3>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">{option.summary}</p>
        <p className="mt-6 rounded-2xl bg-[rgba(109,113,249,0.06)] p-4 text-sm font-semibold leading-relaxed text-text-primary">
          {option.highlight}
        </p>
        <Link
          href={option.href}
          className="group/link mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          How {option.label} works
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover/link:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </Link>
      </article>
    </Reveal>
  );
}
