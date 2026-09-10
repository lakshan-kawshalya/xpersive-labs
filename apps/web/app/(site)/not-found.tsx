import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Recent Work" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-24 text-center">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-110 h-110 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(84,193,251,0.2) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-110 h-110 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,113,249,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-xl flex flex-col items-center">
        {/* Ghosted 4 · logo · 4 */}
        <div className="relative flex items-center justify-center select-none mb-6">
          <span className="font-display font-extrabold text-text-primary/[0.08] text-[100px] sm:text-[140px] leading-[0.85] tracking-tighter -mr-2 sm:-mr-4">
            4
          </span>
          <div className="relative z-10 mx-1 sm:mx-2 -translate-y-3 animate-float-gentle">
            <div
              className="absolute inset-0 rounded-full blur-2xl scale-125 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.3), rgba(84,193,251,0.3))" }}
            />
            <div className="relative bg-white/70 p-3 sm:p-4 rounded-[28px] border border-white/80 shadow-2xl backdrop-blur-xl">
              <Image
                src="/logo/brandmark.svg"
                alt="Xpersive Labs"
                width={96}
                height={96}
                className="w-16 h-16 sm:w-24 sm:h-24"
              />
            </div>
          </div>
          <span className="font-display font-extrabold text-text-primary/[0.08] text-[100px] sm:text-[140px] leading-[0.85] tracking-tighter -ml-2 sm:-ml-4">
            4
          </span>
        </div>

        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="font-display font-bold text-xs text-primary uppercase tracking-[0.18em]">
            404 — Page Not Found
          </span>
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-[1.2] mb-4">
          Looks like this page took a wrong turn.
        </h1>

        <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md mb-9">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            Go Back Home
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-[1.5px] border-[rgba(26,26,46,0.2)] text-text-primary font-medium text-sm transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/4 hover:scale-[1.02]"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-text-muted">
          <span className="font-medium">Or quick jump to:</span>
          <div className="flex items-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/40 transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
