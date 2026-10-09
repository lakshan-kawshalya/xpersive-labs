import type { ReactNode } from "react";
import { EARLY_ACCESS_URL } from "@/lib/aiPlatform";

type Variant = "gradient" | "inline";

interface EarlyAccessLinkProps {
  variant: Variant;
  className?: string;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  gradient:
    "group inline-flex items-center justify-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white bg-gradient-brand shadow-[0_8px_24px_rgba(109,113,249,0.3)] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]",
  inline: "font-semibold text-primary underline underline-offset-4 hover:text-accent transition-colors",
};

export default function EarlyAccessLink({ variant, className = "", children }: EarlyAccessLinkProps) {
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
