"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bolt, Lock } from "lucide-react";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";

/* ─── Word-by-word headline reveal ──────────────────────────────── */
const HEADLINE_LINE_1 = ["Built", "Here."];
const HEADLINE_LINE_2 = ["Built", "Right."];

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

const TRUST_SIGNALS = ["48h response", "30-day post-launch support", "AU/UK/US/EU clients"];

const METRICS = [
  { label: "Cluster Uptime", value: "99.98%" },
  { label: "Throughput", value: "1.28k req/s", accent: true },
  { label: "Latency TTFB", value: "24ms" },
];

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
                Colombo, Sri Lanka → Global Engineering · AU / UK / US / EU
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
                    className="inline-block mr-[0.25em]"
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
                    className="inline-block mr-[0.25em] text-gradient"
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
              Xpersive Labs is a Colombo-based software studio building websites, apps, and automation for businesses in Australia, the UK, the US, and Europe.
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

            {/* Sprint availability strip */}
            <motion.div
              className="hidden sm:inline-flex items-center gap-6 mt-8 px-6 py-3 rounded-xl bg-bg-card border border-border-subtle"
              style={{ boxShadow: "0 4px 24px -2px rgba(39,40,72,0.04)" }}
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 1.1, ease: "easeOut" },
              } : { initial: false })}
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-text-muted">Sprint Availability</span>
                <span className="font-display font-bold text-sm text-text-primary">Q2 Intake Open</span>
              </div>
              <div className="w-px h-8 bg-border-subtle" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-text-muted">Global Overlap</span>
                <span className="text-sm font-medium text-primary">AEST · BST · EDT · CET</span>
              </div>
            </motion.div>
          </div>

          {/* Right column — live production system mockup */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            {...(shouldAnimate ? {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1, y: [0, -10, 0] },
              transition: {
                opacity: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1.0] },
                scale: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1.0] },
                y: { duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" },
              },
            } : { initial: false })}
          >
            <div className="relative w-full max-w-[460px] mb-5 ml-5">
              {/* Card body — clipped to rounded corners for the window chrome */}
              <div
                className="rounded-2xl bg-bg-card border border-border-subtle overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(109,113,249,0.24)]"
                style={{ boxShadow: "0 16px 48px rgba(109,113,249,0.18)" }}
              >
                {/* Window chrome */}
                <div className="flex items-center justify-between px-4 py-3 bg-[rgba(109,113,249,0.05)] border-b border-border-subtle">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70 inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-card border border-border-subtle max-w-[230px] w-full justify-center shadow-sm">
                    <Lock size={12} className="text-primary" aria-hidden="true" />
                    <span className="font-mono text-[10px] text-text-primary font-bold tracking-tight truncate">
                      production.xpersivelabs.internal
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-card text-primary text-[10px] uppercase font-bold tracking-wider shadow-sm shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Metrics + telemetry */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-2">
                    {METRICS.map((metric) => (
                      <div key={metric.label} className="bg-[rgba(109,113,249,0.04)] p-3 rounded-lg">
                        <span className="text-[9px] uppercase tracking-wider text-text-muted block">{metric.label}</span>
                        <span className={`font-display text-sm font-bold mt-1 block ${metric.accent ? "text-primary" : "text-text-primary"}`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-[rgba(109,113,249,0.03)] p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-primary text-white text-[9px] font-bold uppercase">Prod-Env</span>
                        <span className="text-xs font-semibold text-text-primary">AuraOps Intelligent Mesh</span>
                      </div>
                      <span className="text-[11px] text-text-muted hidden sm:inline">Sydney &amp; London</span>
                    </div>
                    <div className="w-full h-24 bg-bg-card rounded-lg flex items-center justify-center relative overflow-hidden">
                      <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 460 110" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path className="opacity-30" d="M 40 55 C 100 55, 120 25, 180 25 S 240 85, 300 85 S 360 40, 420 55" stroke="currentColor" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="2.5" />
                        <path d="M 40 55 C 90 55, 140 85, 190 85 S 280 25, 330 25 S 380 55, 420 55" stroke="#54C1FB" strokeLinecap="round" strokeWidth="2.5" />
                        <circle cx="40" cy="55" fill="#6D71F9" r="7" />
                        <circle cx="180" cy="25" fill="#54C1FB" r="6" />
                        <circle cx="190" cy="85" fill="#6D71F9" r="5" />
                        <circle cx="300" cy="85" fill="#6D71F9" r="6" />
                        <circle cx="330" cy="25" fill="#54C1FB" r="5" />
                        <circle cx="420" cy="55" fill="#6D71F9" r="8" />
                        <motion.circle
                          cx="420" cy="55" r="14" stroke="#6D71F9" strokeWidth="1.5" fill="none"
                          {...(shouldAnimate ? {
                            animate: { scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] },
                            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          } : {})}
                        />
                      </svg>
                      <span className="absolute bottom-1.5 left-2 text-[9px] text-text-muted">Real-time node telemetry active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-text-secondary text-xs pt-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✓</span>
                      Zero legacy technical debt
                    </span>
                    <span className="font-mono text-[10px] text-primary tracking-wider hidden sm:inline">NEXT.JS · PY-FASTAPI</span>
                  </div>
                </div>
              </div>

              {/* Floating badge — deliberately overflows the card corner, so it must sit outside the clipped card body above */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-bg-card border border-border-subtle px-4 py-2.5 rounded-xl shadow-[0_12px_40px_-4px_rgba(39,40,72,0.14)] items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[rgba(109,113,249,0.1)] flex items-center justify-center text-primary">
                  <Bolt size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-text-primary leading-tight">Sub-second</p>
                  <p className="text-[11px] text-text-muted">Edge response guarantee</p>
                </div>
              </div>
            </div>
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
