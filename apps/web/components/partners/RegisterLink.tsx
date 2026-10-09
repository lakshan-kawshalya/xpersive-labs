import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Tone = "onDark" | "onLight";

const TONE_CLASSES: Record<Tone, string> = {
  onDark: "bg-white text-dark hover:bg-subtle-gray",
  onLight: "bg-dark text-white hover:bg-dark-elevated",
};

export default function RegisterLink({ tone, className = "" }: { tone: Tone; className?: string }) {
  return (
    <Link
      href="/partners#register"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-colors duration-200 motion-reduce:transition-none ${TONE_CLASSES[tone]} ${className}`}
    >
      Register your interest <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
