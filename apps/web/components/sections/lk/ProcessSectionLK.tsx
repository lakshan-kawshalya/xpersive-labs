"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const steps = [
  {
    num: "01",
    title: "You Tell Us",
    desc: "Message us on WhatsApp and tell us what you need. No forms, no jargon required.",
  },
  {
    num: "02",
    title: "We Plan It",
    desc: "We map out exactly what will be built and give you a clear price before starting.",
  },
  {
    num: "03",
    title: "We Build It",
    desc: "You get updates as we go. No surprises, no disappearing for weeks.",
  },
  {
    num: "04",
    title: "We Launch It",
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
      className="group relative rounded-2xl border border-border-subtle bg-bg-card p-8 flex flex-col justify-between transition-colors duration-300 hover:border-primary/30"
      style={{ boxShadow: "0 2px 12px rgba(109,113,249,0.06)" }}
      {...(shouldAnimate ? {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        whileHover: { y: -6, boxShadow: "0 20px 48px rgba(109,113,249,0.16)" },
        transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
      } : { initial: false })}
    >
      <div className="flex flex-col gap-4">
        <span className="font-display text-4xl font-bold leading-none text-primary/25 transition-colors duration-300 group-hover:text-primary/50">
          {step.num}
        </span>
        <h3 className="font-display text-lg font-bold text-text-primary">{step.title}</h3>
        <p className="text-text-secondary leading-relaxed">{step.desc}</p>
      </div>
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
