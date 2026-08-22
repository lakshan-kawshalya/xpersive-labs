"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We talk through what you need, scope the project, and agree on deliverables before a single line of code is written.",
  },
  {
    num: "02",
    title: "Design & Architecture",
    desc: "We map the data model, component structure, and user flows. You approve the plan before we build.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We ship in stages. You see real progress weekly, not a demo at the finish line.",
  },
  {
    num: "04",
    title: "QA & Launch",
    desc: "Full QA pass, performance audit, and deployment. We stay on for 30 days post-launch to catch anything.",
  },
];

interface StepProps {
  step: (typeof steps)[number];
  isLast: boolean;
  shouldAnimate: boolean;
}

function TimelineStep({ step, isLast, shouldAnimate }: StepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="flex gap-6 sm:gap-8">
      {/* Left: number badge + connector line */}
      <div className="flex flex-col items-center shrink-0 w-10">
        <motion.div
          className="w-10 h-10 rounded-full border flex items-center justify-center font-mono text-[11px] font-bold shrink-0"
          style={
            !shouldAnimate
              ? {
                  borderColor: "rgba(109,113,249,0.45)",
                  backgroundColor: "rgba(109,113,249,0.1)",
                  color: "#ffffff",
                }
              : undefined
          }
          {...(shouldAnimate
            ? {
                initial: {
                  borderColor: "rgba(255,255,255,0.1)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.25)",
                  boxShadow: "none",
                },
                animate: inView
                  ? {
                      borderColor: "rgba(109,113,249,0.6)",
                      backgroundColor: "rgba(109,113,249,0.12)",
                      color: "#ffffff",
                      boxShadow: "0 0 20px rgba(109,113,249,0.22)",
                    }
                  : {},
                transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
              }
            : { initial: false })}
        >
          {step.num}
        </motion.div>

        {!isLast && (
          <div
            className="flex-1 mt-2 rounded-full overflow-hidden"
            style={{
              width: 1,
              background: !shouldAnimate
                ? "linear-gradient(180deg, #6D71F9, #54C1FB)"
                : "rgba(255,255,255,0.06)",
            }}
          >
            {shouldAnimate && (
              <motion.div
                className="w-full rounded-full"
                style={{
                  background: "linear-gradient(180deg, #6D71F9, #54C1FB)",
                  originY: 0,
                  height: "100%",
                }}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                  ease: [0.215, 0.61, 0.355, 1.0],
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Right: title + description */}
      <motion.div
        className="pb-10 flex-1 min-w-0"
        {...(shouldAnimate
          ? {
              initial: { opacity: 0, x: -10 },
              animate: inView ? { opacity: 1, x: 0 } : {},
              transition: {
                duration: 0.5,
                delay: 0.1,
                ease: [0.215, 0.61, 0.355, 1.0],
              },
            }
          : { initial: false })}
      >
        <h3
          className="font-display font-bold mb-2"
          style={{
            fontSize: "clamp(17px, 2vw, 21px)",
            color:
              !shouldAnimate || inView ? "#ffffff" : "rgba(255,255,255,0.4)",
            transition: "color 0.4s ease",
          }}
        >
          {step.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function BuildTimelineSection() {
  const { shouldAnimate } = useMotionSafe();

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Static top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          {...(shouldAnimate
            ? {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-80px" },
                transition: {
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1.0],
                },
              }
            : { initial: false })}
        >
          <span
            className="inline-block text-xs font-bold uppercase mb-4"
            style={{ color: "#6D71F9", letterSpacing: "0.2em" }}
          >
            How We Work
          </span>
          <h2
            className="font-display font-bold mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
          >
            From brief to shipped in weeks, not months.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            We don&apos;t do waterfall proposals and six-month timelines. Here&apos;s how a typical engagement runs.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-xl mx-auto">
          {steps.map((step, i) => (
            <TimelineStep
              key={step.num}
              step={step}
              isLast={i === steps.length - 1}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
