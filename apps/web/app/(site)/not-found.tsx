import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Xpersive Labs",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-dark flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(109,113,249,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-lg">
        {/* 404 numeral */}
        <p className="font-display text-[10rem] sm:text-[12rem] font-bold leading-none text-gradient select-none">
          404
        </p>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 -mt-4">
          Page Not Found
        </h1>

        <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-10">
          Looks like this page drifted into the void. Let&apos;s get you back to
          something real.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm transition-all duration-300 hover:border-primary/50 hover:bg-white/5 hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
