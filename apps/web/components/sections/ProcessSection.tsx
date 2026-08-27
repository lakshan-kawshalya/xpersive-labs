"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { LOTTIE_URLS } from "@/lib/animations-lottie";

const steps = [
  {
    num: "01",
    title: "You Brief Us",
    lottie: LOTTIE_URLS.processBrief,
    desc: "Tell us what you're building — what problem it solves, who it's for, and your rough timeline.",
  },
  {
    num: "02",
    title: "We Plan It",
    lottie: LOTTIE_URLS.processDesign,
    desc: "We map the architecture, user flows, and component structure. You approve the plan before we write a single line of code.",
  },
  {
    num: "03",
    title: "We Build It",
    lottie: LOTTIE_URLS.processBuild,
    desc: "We ship in stages with weekly check-ins. You see real progress throughout - not a surprise at the finish line.",
  },
  {
    num: "04",
    title: "We Launch It",
    lottie: LOTTIE_URLS.processLaunch,
    desc: "We handle deployment, run a full QA pass, and stay available for 30 days post-launch.",
  },
];

interface StepCardProps {
  step: (typeof steps)[number];
  shouldAnimate: boolean;
}

function StepCard({ step, shouldAnimate }: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-[20px] border border-border-subtle bg-bg-card p-7 overflow-hidden"
      style={{ boxShadow: "0 1px 8px rgba(109,113,249,0.04)" }}
      {...(shouldAnimate ? {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
      } : { initial: false })}
    >
      <span
        className="absolute top-2 right-4 font-display font-extrabold leading-none select-none pointer-events-none"
        style={{ fontSize: 72, color: "rgba(109,113,249,0.06)" }}
      >
        {step.num}
      </span>

      <div className="relative w-15 h-15 mb-4">
        <LottieAnimation
          src={step.lottie}
          style={{ width: 60, height: 60 }}
          fallback={
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-[11px] font-bold text-primary"
              style={{ background: "rgba(109,113,249,0.1)", border: "1px solid rgba(109,113,249,0.3)" }}
            >
              {step.num}
            </div>
          }
        />
      </div>

      <h3 className="relative font-display font-bold text-lg text-text-primary mb-2">{step.title}</h3>
      <p className="relative text-sm leading-relaxed text-text-secondary">{step.desc}</p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const { shouldAnimate } = useMotionSafe();

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          {...(shouldAnimate
            ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-80px" },
                transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
              }
            : { initial: false })}
        >
          <span className="inline-block text-xs font-bold uppercase mb-4" style={{ color: "#6D71F9", letterSpacing: "0.2em" }}>
            How We Work
          </span>
          <h2 className="font-display font-bold mb-5 text-text-primary" style={{ fontSize: "clamp(36px, 5vw, 48px)" }}>
            Live in weeks. Not months.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            No waterfall proposals. No six-month timelines. Here&apos;s how a typical engagement runs.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ borderTop: "1px dashed rgba(109,113,249,0.2)" }}
          />
          {steps.map((step) => (
            <StepCard key={step.num} step={step} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    </section>
  );
}
