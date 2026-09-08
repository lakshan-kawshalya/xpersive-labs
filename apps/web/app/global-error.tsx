"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f7f8ff] font-sans text-[#20213c] antialiased">
        <main className="fixed inset-0 z-60 flex min-h-screen flex-col overflow-hidden bg-[#f7f8ff] text-[#20213c]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 8% 18%, rgba(109,113,249,0.78), transparent 37%), radial-gradient(ellipse at 94% 66%, rgba(84,193,251,0.75), transparent 42%), radial-gradient(ellipse at 48% 100%, rgba(109,113,249,0.7), transparent 35%), #f7f8ff",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] bg-size-[28px_28px] opacity-25" />

      <header className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-[#d8dbed]/70 bg-white/55 px-6 backdrop-blur-xl sm:px-9">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Xpersive Labs home">
          <Image src="/logo/brandmark.svg" alt="" width={28} height={28} className="h-7 w-7" priority />
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">Xpersive Labs</span>
        </Link>
        <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-700 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Studio Delivery Lab
        </span>
        <nav className="hidden items-center gap-7 text-xs font-medium text-[#555775] md:flex" aria-label="Quick links">
          <Link href="/services" className="transition-colors hover:text-[#20213c]">Services</Link>
          <Link href="/portfolio" className="transition-colors hover:text-[#20213c]">Work</Link>
          <Link href="/about" className="transition-colors hover:text-[#20213c]">About</Link>
          <Link href="/contact" className="transition-colors hover:text-[#20213c]">Contact</Link>
        </nav>
        <Link href="/contact" className="hidden items-center gap-2 rounded-full border border-[#d6d8e5] bg-white/75 px-4 py-2 text-xs font-semibold shadow-sm transition hover:border-[#6d71f9] hover:text-[#6d71f9] sm:inline-flex">
          Get in Touch <ArrowRight size={13} />
        </Link>
      </header>

      <section className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-8 text-center [@media(max-height:600px)]:justify-start">
        <div className="relative mb-3 flex h-32 w-32 items-center justify-center rounded-[1.55rem] border-[9px] border-white/75 bg-white/75 shadow-[0_15px_30px_rgba(60,70,150,0.12)] backdrop-blur sm:h-34 sm:w-34">
          <div className="flex h-26 w-26 items-center justify-center rounded-2xl bg-[#20213c] shadow-inner sm:h-28 sm:w-28">
            <Image src="/logo/brandmark.svg" alt="Xpersive Labs" width={76} height={76} className="h-19 w-19" />
          </div>
          <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-[#f2a900]" aria-hidden="true" />
        </div>

        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#8d9de0]/35 bg-white/35 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[#5264bb] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6d71f9]" /> SOMETHING WENT WRONG
        </p>
        <h1 className="max-w-2xl font-display text-2xl font-bold tracking-tight text-[#17182f] sm:text-3xl">We hit an unexpected problem.</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#5b5d79] sm:text-base">This isn&apos;t your fault — something on our end broke. We&apos;ve been notified and are looking into it.</p>
        <p className="mt-3 text-[10px] italic text-[#8588aa]">If this keeps happening, drop us a message at <a href="mailto:hello@xpersivelabs.com" className="underline underline-offset-2 hover:text-[#6d71f9]">hello@xpersivelabs.com</a></p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#6d71f9] to-[#54c1fb] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-[#6d71f9]/25 transition hover:-translate-y-0.5 hover:shadow-xl">
            Try Again <RefreshCw size={13} />
          </button>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[#9095b7]/45 bg-white/15 px-6 py-3 text-xs font-medium text-[#30324f] transition hover:border-[#6d71f9] hover:bg-white/35">Go Back Home</Link>
        </div>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 text-[10px] text-[#6c7089] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>All systems operational</span>
          <span className="text-[#d2d3df]">|</span>
          <Link href="/" className="text-[#5264bb] hover:underline">Check System Status <ArrowRight size={11} className="ml-0.5 inline" /></Link>
        </div>
      </section>

      <footer className="relative z-10 flex shrink-0 items-center justify-between border-t border-white/40 bg-white/25 px-6 py-3 text-[9px] text-[#70738d] backdrop-blur-xl sm:px-24">
        <span>© {new Date().getFullYear()} Xpersive Labs. High-velocity software &amp; digital product studio.</span>
        <div className="hidden items-center gap-5 sm:flex"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
      </footer>
        </main>
      </body>
    </html>
  );
}
