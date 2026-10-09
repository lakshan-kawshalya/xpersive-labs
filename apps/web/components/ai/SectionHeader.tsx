import type { ReactNode } from "react";

export default function SectionHeader({
  label,
  heading,
  children,
  tone = "light",
}: {
  label?: string;
  heading: string;
  children?: ReactNode;
  tone?: "light" | "dark" | "onGradient";
}) {
  const labelColor = tone === "dark" ? "text-accent" : tone === "onGradient" ? "text-white/80" : "text-primary";
  const headingColor = tone === "light" ? "text-text-primary" : "text-white";
  const bodyColor = tone === "light" ? "text-text-secondary" : "text-white/75";

  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {label && (
        <span className={`mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] ${labelColor}`}>
          {label}
        </span>
      )}
      <h2 className={`font-display text-3xl font-bold sm:text-4xl lg:text-5xl ${headingColor}`}>{heading}</h2>
      {children && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${bodyColor}`}>{children}</p>}
    </div>
  );
}
