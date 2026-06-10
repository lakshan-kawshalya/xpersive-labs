"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMotionSafe } from "@/hooks/useMotionSafe";

export default function CTASection() {
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  const ambientProps = shouldAnimate ? {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  } : {};

  return (
    <section className="relative overflow-hidden py-30">
      {/* Animated gradient border - top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #6D71F9, #54C1FB, transparent)",
          backgroundSize: "200% 100%",
          animation: "gradient-slide 3s linear infinite",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,113,249,1) 1px, transparent 1px), linear-gradient(to right, rgba(109,113,249,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.04,
        }}
      />

      {/* Ambient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,113,249,0.18) 0%, transparent 70%)" }}
        {...ambientProps}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div {...scrollProps}>
          {/* Eyebrow */}
          <motion.span
            {...childProps}
            className="inline-block text-xs font-bold uppercase mb-6"
            style={{ color: "#6D71F9", letterSpacing: "0.14em" }}
          >
            Let&apos;s build together
          </motion.span>

          {/* Headline */}
          <motion.h2
            {...childProps}
            className="font-display font-extrabold leading-[1.05] mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 64px)" }}
          >
            Ready to Automate Your Research?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            {...childProps}
            className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Tell us what you&apos;re building. We&apos;ll scope it, plan it, and
            deliver a production-ready tool.
          </motion.p>

          {/* CTAs */}
          <motion.div {...childProps} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
              style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
            >
              Start a Project
              <ArrowRight
                size={17}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>

            <a
              href="mailto:hello@xpersivelabs.com"
              className="text-sm transition-colors duration-200 hover:underline underline-offset-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Or email us directly: hello@xpersivelabs.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
