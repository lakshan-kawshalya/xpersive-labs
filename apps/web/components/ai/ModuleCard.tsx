import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import EarlyAccessLink from "./EarlyAccessLink";
import IconBox from "./IconBox";
import { CARD_CLASSES } from "./InfoCard";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  body: string;
  features: string[];
  bestFor: string;
}

export default function ModuleCard({ icon, title, subtitle, body, features, bestFor }: ModuleCardProps) {
  return (
    <article className={`flex flex-col ${CARD_CLASSES}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <IconBox icon={icon} />
        <span className="rounded-full bg-[rgba(84,193,251,0.14)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          Early Access
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold text-text-primary">{title}</h3>
      <p className="mt-1 text-sm font-semibold text-primary">{subtitle}</p>
      <p className="mt-4 leading-relaxed text-text-secondary">{body}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-6 flex-1 text-xs leading-relaxed text-text-muted">{bestFor}</p>
      <EarlyAccessLink variant="gradient" className="mt-6 self-start">
        Join Early Access
        <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </EarlyAccessLink>
    </article>
  );
}
