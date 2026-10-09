import type { ReactNode } from "react";
import { EARLY_ACCESS_URL } from "@/lib/aiPlatform";

type Variant = "gradient" | "white" | "inline" | "inlineLight";

const VARIANT_CLASSES: Record<Variant, string> = {
  gradient:
    "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(109,113,249,0.35)] transition-transform duration-200 hover:-translate-y-0.5",
  white:
    "inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-lg transition-transform duration-200 hover:-translate-y-0.5",
  inline: "font-semibold text-primary underline underline-offset-4 hover:text-accent",
  inlineLight: "font-semibold text-white underline underline-offset-4 hover:text-white/80",
};

export default function EarlyAccessLink({
  variant,
  className = "",
  children,
}: {
  variant: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={EARLY_ACCESS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
