"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center bg-dark">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(109,113,249,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Branded header — logo + name, matches navbar left corner */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo/brandmark.svg"
            alt="Xpersive Labs mark"
            width={28}
            height={28}
            priority
            aria-hidden="true"
          />
          <span className="font-display text-xl font-bold text-gradient">
            Xpersive Labs
          </span>
        </Link>
      </div>

      <div className="relative z-10 max-w-lg">
        {/* Error numeral */}
        <p className="font-display text-[8rem] sm:text-[12rem] font-bold leading-none text-gradient select-none">
          500
        </p>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 -mt-4">
          Something Went Wrong
        </h1>

        <p className="text-subtle-gray text-base sm:text-lg leading-relaxed mb-10">
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
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-[1.5px] border-white/20 text-white font-semibold text-sm transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/4 hover:scale-[1.02]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
