import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import EarlyAccessLink from "./EarlyAccessLink";

export default function ModuleCard({
  icon: Icon,
  title,
  subtitle,
  body,
  features,
  bestFor,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  body: string;
  features: string[];
  bestFor: string;
}) {
  return (
    <article className="flex flex-col rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Icon size={24} aria-hidden="true" />
        </span>
        <span className="rounded-full border border-accent px-3 py-1 text-xs font-semibold text-accent">
          Early Access
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm font-medium text-accent">{subtitle}</p>
      <p className="mt-4 leading-relaxed text-white/75">{body}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-white/85">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs leading-relaxed text-white/55">{bestFor}</p>
      <EarlyAccessLink variant="gradient" className="mt-6 self-start">
        Join Early Access <ArrowRight size={16} aria-hidden="true" />
      </EarlyAccessLink>
    </article>
  );
}
