import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegisterLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/partners#register"
      className={`group inline-flex items-center gap-3 rounded-full bg-gradient-brand px-10 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(109,113,249,0.3)] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:scale-100 ${className}`}
    >
      Register your interest
      <ArrowRight
        size={17}
        className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </Link>
  );
}
