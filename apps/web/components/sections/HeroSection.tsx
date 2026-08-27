"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { LOTTIE_URLS } from "@/lib/animations-lottie";
import CodeEditorIllustration from "@/components/illustrations/CodeEditorIllustration";

/* ─── Word-by-word headline reveal ──────────────────────────────── */
const HEADLINE_LINE_1 = ["Your", "Business,"];
const HEADLINE_LINE_2 = ["Online.", "Done", "Right."];
const GRADIENT_WORDS = new Set(["Online.", "Done", "Right."]);

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  }),
};

const TRUST_SIGNALS = ["48h response", "30-day post-launch support", "AU/UK/US clients"];

/* ─── Component ──────────────────────────────────────────────────── */
export default function HeroSection() {
  const { shouldAnimate } = useMotionSafe();
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section className="relative min-h-screen grid place-items-center overflow-hidden">
      {/* ── Dot grid ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              className="hidden sm:block mb-8"
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
                  border: "1px solid rgba(109,113,249,0.2)",
                  color: "#6D71F9",
                }}
              >
                🇱🇰 Sri Lanka&apos;s Immersive Tech Studio
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: "var(--color-success)",
                    animation: "hero-badge-pulse 2s ease-in-out infinite",
                  }}
                />
              </span>
            </motion.div>

            {/* Headline - word-by-word reveal */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-7 text-text-primary"
              style={{ perspective: "800px" }}
            >
              <span className="block">
                {HEADLINE_LINE_1.map((word, i) => (
                  <motion.span
                    key={i}
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
              </span>
              <span className="block">
                {HEADLINE_LINE_2.map((word, i) => (
                  <motion.span
                    key={i + HEADLINE_LINE_1.length}
                    className={`inline-block mr-[0.25em] ${GRADIENT_WORDS.has(word) ? "text-gradient" : ""}`}
                    {...(shouldAnimate ? {
                      custom: i + HEADLINE_LINE_1.length,
                      variants: wordVariants,
                      initial: "hidden",
                      animate: "visible",
                    } : { initial: false })}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              className="max-w-[480px] mx-auto lg:mx-0 text-[18px] text-text-secondary leading-[1.7] mb-8"
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.8, ease: "easeOut" },
              } : { initial: false })}
            >
              We build websites, web apps, and automation tools for businesses in AU, UK, and US. Fast delivery. No agency overhead. One team from brief to launch.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 mb-9"
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.9, ease: "easeOut" },
              } : { initial: false })}
            >
              {TRUST_SIGNALS.map((signal) => (
                <span key={signal} className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
                  <span className="text-primary">✓</span>
                  {signal}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 1.0, ease: "easeOut" },
              } : { initial: false })}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(109,113,249,0.3)";
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
                className="inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full border-[1.5px] border-[rgba(26,26,46,0.2)] text-text-primary font-semibold text-base transition-all duration-300 hover:border-primary hover:text-primary hover:bg-primary/[0.04]"
              >
                See Our Work
              </Link>
            </motion.div>
          </div>

          {/* Right column — Lottie hero animation, falls back to the code-editor illustration */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            {...(shouldAnimate ? {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1.0] },
            } : { initial: false })}
          >
            <LottieAnimation
              src={LOTTIE_URLS.hero}
              style={{ width: "100%", maxWidth: 480, height: 400 }}
              fallback={<CodeEditorIllustration className="w-full" />}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Divider line ─────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(109,113,249,0.2), transparent)" }}
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
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(39,40,72,0.25)" strokeWidth="1.5" />
          <motion.rect
            x="10" y="7" width="2" height="6" rx="1" fill="rgba(39,40,72,0.5)"
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
