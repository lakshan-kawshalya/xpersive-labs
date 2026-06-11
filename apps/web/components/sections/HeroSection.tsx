"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";

/* ─── Word-by-word headline reveal ──────────────────────────────── */
const HEADLINE_WORDS = ["Your", "Supplier", "Research,", "Running", "on", "Autopilot."];
const GRADIENT_WORDS = new Set(["Autopilot."]);

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  }),
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function HeroSection() {
  const { shouldAnimate } = useMotionSafe();
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section className="relative min-h-screen grid place-items-center overflow-hidden">
      {/* ── Noise texture overlay ─────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ opacity: 0.03 }}
      >
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* ── Dot grid ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          className="mb-8"
          {...(shouldAnimate ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.05 },
          } : { initial: false })}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium select-none"
            style={{
              background: "rgba(109,113,249,0.08)",
              border: "1px solid rgba(109,113,249,0.25)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "#10B981",
                animation: "hero-badge-pulse 2s ease-in-out infinite",
              }}
            />
            Built for FBA Sellers and Digital Agencies
          </span>
        </motion.div>

        {/* Headline - word-by-word reveal */}
        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-7"
          style={{ perspective: "800px" }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              className={`inline-block mr-[0.25em] ${GRADIENT_WORDS.has(word) ? "text-gradient" : ""}`}
              {...(shouldAnimate ? {
                custom: i,
                variants: wordVariants,
                initial: "hidden",
                animate: "visible",
              } : { initial: false })}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="max-w-[520px] mx-auto text-[18px] text-white/60 leading-[1.7] mb-11"
          {...(shouldAnimate ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.8, ease: "easeOut" },
          } : { initial: false })}
        >
          We build custom Python automation tools for Amazon FBA sellers and
          importers — so your supplier monitoring, product tracking, and market
          research runs daily without you lifting a finger.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          {...(shouldAnimate ? {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 1.0, ease: "easeOut" },
          } : { initial: false })}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(109,113,249,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Start a Project
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full border border-white/15 text-white font-semibold text-base transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:scale-[1.02]"
          >
            See Our Work
          </Link>
        </motion.div>
      </div>

      {/* ── Divider line ─────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(109,113,249,0.3), transparent)" }}
      />

      {/* ── Scroll indicator (SVG mouse icon) ────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={shouldAnimate ? { opacity: scrollIndicatorOpacity } : {}}
        aria-hidden="true"
        {...(shouldAnimate ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 1.8, duration: 0.6 },
        } : { initial: false })}
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <motion.rect
            x="10" y="7" width="2" height="6" rx="1" fill="rgba(255,255,255,0.5)"
            {...(shouldAnimate ? {
              animate: { y: [0, 10, 0], opacity: [1, 0, 1] },
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            } : {})}
          />
        </svg>
      </motion.div>
    </section>
  );
}
