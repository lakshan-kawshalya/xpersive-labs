"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(109,113,249,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-lg">
        <p className="font-display text-[10rem] sm:text-[12rem] font-bold leading-none text-gradient select-none">
          500
        </p>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-4 -mt-4">
          Something Went Wrong
        </h1>

        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10">
          An unexpected error occurred. You can try again or head back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-[1.5px] border-[rgba(26,26,46,0.2)] text-text-primary font-semibold text-sm transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/[0.04] hover:scale-[1.02]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
