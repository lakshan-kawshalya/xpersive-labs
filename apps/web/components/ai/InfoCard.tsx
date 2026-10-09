import type { LucideIcon } from "lucide-react";
import IconBox from "./IconBox";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const CARD_CLASSES =
  "rounded-3xl border border-border-subtle bg-bg-card p-8 shadow-[0_2px_12px_rgba(109,113,249,0.06)] transition-colors duration-300 hover:border-primary/30";

export default function InfoCard({ icon, title, body }: InfoCardProps) {
  return (
    <div className={CARD_CLASSES}>
      <div className="mb-6">
        <IconBox icon={icon} />
      </div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
    </div>
  );
}
