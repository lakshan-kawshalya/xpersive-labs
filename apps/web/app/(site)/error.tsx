"use client";

import Image from "next/image";
import Link from "next/link";
import { RotateCw } from "lucide-react";
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
        {/* Floating logo with alert dot */}
        <div className="relative mb-8 animate-float-gentle">
          <div
            className="absolute inset-0 rounded-full blur-2xl scale-125 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.3), rgba(84,193,251,0.3))" }}
          />
          <div className="relative bg-white/70 p-4 sm:p-5 rounded-4xl border border-white/80 shadow-2xl backdrop-blur-xl">
            <Image
              src="/logo/brandmark.svg"
              alt="Xpersive Labs"
              width={112}
              height={112}
              className="w-20 h-20 sm:w-28 sm:h-28"
            />
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
              <span className="absolute w-4 h-4 rounded-full bg-amber-400/50 animate-ping" />
              <span className="relative w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="font-display font-bold text-xs text-primary uppercase tracking-[0.18em]">
            Something Went Wrong
          </span>
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-[1.2] mb-4">
          We hit an unexpected problem.
        </h1>

        <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-md mb-2">
          This isn&apos;t your fault — something on our end broke. We&apos;ve been notified and are looking into it.
        </p>
        <p className="text-text-muted text-sm italic mb-9">
          If this keeps happening, drop us a message at{" "}
          <a
            href="mailto:hello@xpersivelabs.com"
            className="not-italic font-medium underline hover:text-primary transition-colors"
          >
            hello@xpersivelabs.com
          </a>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            Try Again
            <RotateCw size={15} />
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-[1.5px] border-[rgba(26,26,46,0.2)] text-text-primary font-medium text-sm transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/4 hover:scale-[1.02]"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
