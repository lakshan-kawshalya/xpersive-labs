"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { LOTTIE_URLS } from "@/lib/animations-lottie";

export default function CTASection() {
  const { shouldAnimate } = useMotionSafe();
  const [copied, setCopied] = useState(false);

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  const ambientProps = shouldAnimate ? {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
  } : {};

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@xpersivelabs.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: "linear-gradient(135deg, #6D71F9 0%, #54C1FB 100%)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.06,
        }}
      />

      {/* Ambient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)" }}
        {...ambientProps}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <motion.div className="text-center lg:text-left" {...scrollProps}>
            {/* Eyebrow */}
            <motion.span
              {...childProps}
              className="inline-block text-xs font-bold uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.14em" }}
            >
              Let&apos;s Build Together
            </motion.span>

            {/* Headline */}
            <motion.h2
              {...childProps}
              className="font-display font-extrabold leading-[1.05] mb-6 text-white"
              style={{ fontSize: "clamp(40px, 6vw, 56px)" }}
            >
              Ready to Start?
            </motion.h2>

            {/* Subtext */}
            <motion.p
              {...childProps}
              className="text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Tell us what you&apos;re building. We&apos;ll scope it, plan it, and
              ship it - without the agency overhead.
            </motion.p>

            {/* CTA */}
            <motion.div {...childProps} className="flex flex-col items-center lg:items-start gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "#ffffff", color: "#6D71F9" }}
              >
                Start a Project
                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>
              <button
                onClick={copyEmail}
                className="text-sm hover:underline underline-offset-4 transition-opacity"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {copied ? "Copied!" : "Or email hello@xpersivelabs.com"}
              </button>
            </motion.div>
          </motion.div>

          {/* Lottie — desktop only */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            {...(shouldAnimate ? {
              initial: { opacity: 0, scale: 0.9 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
            } : { initial: false })}
          >
            <LottieAnimation
              src={LOTTIE_URLS.contact}
              style={{ width: 240, height: 240, opacity: 0.7 }}
              fallback={null}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
