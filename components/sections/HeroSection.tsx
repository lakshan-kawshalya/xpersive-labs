"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Floating gradient orbs — static when reduced motion requested */}
      <motion.div
        className="absolute -top-20 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(109,113,249,0.4) 0%, transparent 70%)" }}
        animate={reduced ? {} : { y: [0, -50, 0], x: [0, 30, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(84,193,251,0.35) 0%, transparent 70%)" }}
        animate={reduced ? {} : { y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10"
        style={{ background: "conic-gradient(from 0deg, #6D71F9, #54C1FB, #6D71F9)" }}
        animate={reduced ? {} : { rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Hero content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Sri Lanka&apos;s Immersive Tech Studio
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-7"
        >
          We Build{" "}
          <span className="text-gradient">Immersive</span>
          <br className="hidden sm:block" />
          {" "}Digital Experiences
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-white/55 leading-relaxed mb-11"
        >
          Innovation for a Better Tomorrow — we develop cutting-edge technologies
          that drive progress and enhance human experience across diverse industries.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            View Our Work
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base transition-all duration-300 hover:border-primary/50 hover:bg-white/5 hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        aria-hidden="true"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={reduced ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  );
}
