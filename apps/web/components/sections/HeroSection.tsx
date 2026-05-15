"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Word-by-word headline reveal ──────────────────────────────── */
const HEADLINE_WORDS = ["We", "Build", "Immersive", "Digital", "Experiences"];
const GRADIENT_WORDS = new Set(["Immersive", "Digital", "Experiences"]);

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

/* ─── Orb config ─────────────────────────────────────────────────── */
const orbs = [
  {
    style: { top: "-10%", left: "-10%", width: 560, height: 560, background: "radial-gradient(circle, rgba(109,113,249,0.15) 0%, transparent 70%)" },
    animate: { x: [0, 40, 0], y: [0, 30, 0] },
    duration: 8,
    parallax: { x: 0.02, y: 0.015 },
  },
  {
    style: { top: "-5%", right: "-8%", width: 480, height: 480, background: "radial-gradient(circle, rgba(84,193,251,0.15) 0%, transparent 70%)" },
    animate: { x: [0, -30, 0], y: [0, 50, 0] },
    duration: 10,
    parallax: { x: -0.02, y: 0.02 },
  },
  {
    style: { bottom: "-5%", left: "30%", width: 520, height: 520, background: "radial-gradient(circle, rgba(109,113,249,0.13) 0%, transparent 70%)" },
    animate: { x: [0, 50, 0], y: [0, -20, 0] },
    duration: 12,
    parallax: { x: 0.015, y: -0.01 },
  },
  {
    style: { top: "30%", left: "35%", width: 460, height: 460, background: "radial-gradient(circle, rgba(84,193,251,0.08) 0%, transparent 70%)" },
    animate: { scale: [0.8, 1.2, 0.8] },
    duration: 6,
    parallax: { x: 0.01, y: 0.01 },
  },
];

/* ─── Component ──────────────────────────────────────────────────── */
export default function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  /* Mouse parallax for orbs */
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen grid place-items-center overflow-hidden bg-dark"
    >
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

      {/* ── Mesh gradient orbs ───────────────────────────────── */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px] pointer-events-none"
          style={{
            ...orb.style,
            x: mouseParallax.x * (orb.parallax.x * 200),
            y: mouseParallax.y * (orb.parallax.y * 200),
          }}
          animate={reduced ? {} : orb.animate}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Sri Lanka&apos;s Immersive Tech Studio
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
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block mr-[0.25em] ${
                GRADIENT_WORDS.has(word) ? "text-gradient" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="max-w-[520px] mx-auto text-[18px] text-white/60 leading-[1.7] mb-11"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          From Colombo to global clients - we design and build web experiences,
          interfaces, and automation tools that feel premium and perform at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #6D71F9, #54C1FB)",
            }}
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
        style={{ opacity: scrollIndicatorOpacity }}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <motion.rect
            x="10" y="7" width="2" height="6" rx="1" fill="rgba(255,255,255,0.5)"
            animate={reduced ? {} : { y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
