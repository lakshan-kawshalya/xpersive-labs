"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { LOTTIE_URLS } from "@/lib/animations-lottie";

const steps = [
  {
    num: "01",
    title: "You Tell Us",
    lottie: LOTTIE_URLS.processBrief,
    desc: "Message us on WhatsApp and tell us what you need. No forms, no jargon required.",
  },
  {
    num: "02",
    title: "We Plan It",
    lottie: LOTTIE_URLS.processDesign,
    desc: "We map out exactly what will be built and give you a clear price before starting.",
  },
  {
    num: "03",
    title: "We Build It",
    lottie: LOTTIE_URLS.processBuild,
    desc: "You get updates as we go. No surprises, no disappearing for weeks.",
  },
  {
    num: "04",
    title: "We Launch It",
    lottie: LOTTIE_URLS.processLaunch,
    desc: "We set everything up, test it thoroughly, and stay available after launch.",
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

export default function ProcessSectionLK() {
  const { shouldAnimate } = useMotionSafe();

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col gap-4 mb-16"
          {...(shouldAnimate
            ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-80px" },
                transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
              }
            : { initial: false })}
        >
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">How We Work</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text-primary">
            From brief to launch, no confusion.
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
            You don&apos;t need to know anything technical. Here&apos;s exactly how a project runs.
          </p>
        </motion.div>

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
