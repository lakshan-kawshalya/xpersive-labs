import type { ReactNode } from "react";

interface SectionHeaderProps {
  label?: string;
  heading: string;
  children?: ReactNode;
}

export default function SectionHeader({ label, heading, children }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-14">
      {label && (
        <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">{label}</span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary">{heading}</h2>
      {children && <p className="mt-5 text-lg leading-relaxed text-text-secondary">{children}</p>}
    </div>
  );
}
