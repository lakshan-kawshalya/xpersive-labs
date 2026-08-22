"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const NAV_LINK_WIDTHS = [34, 42, 30];
const CARD_COUNT = 3;

export default function HeroWebPreview() {
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.div
      className="hidden lg:block w-full"
      aria-hidden="true"
      {...(shouldAnimate
        ? {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.6, ease: [0.215, 0.61, 0.355, 1.0] as const },
          }
        : { initial: false })}
    >
      <motion.div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(109,113,249,0.18)",
          background: "rgba(15,15,30,0.6)",
          backdropFilter: "blur(12px)",
          overflow: "hidden",
        }}
        {...(shouldAnimate
          ? {
              animate: { y: [0, -6, 0] },
              transition: { duration: 5, delay: 1.4, repeat: Infinity, ease: "easeInOut" as const },
            }
          : {})}
      >
        {/* Browser chrome header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            borderBottom: "1px solid rgba(109,113,249,0.12)",
            background: "rgba(109,113,249,0.06)",
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
          <div
            className="ml-3 flex-1 flex items-center gap-1.5 px-3 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.25)" }} />
            <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
              yourproject.com
            </span>
          </div>
        </div>

        {/* Mock site content */}
        <div className="p-5">
          {/* Mini nav */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
              />
              <span className="w-10 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
            </div>
            <div className="flex items-center gap-3">
              {NAV_LINK_WIDTHS.map((w, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{ width: w, background: "rgba(255,255,255,0.12)" }}
                />
              ))}
              <span
                className="h-4 rounded-full"
                style={{ width: 30, background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
              />
            </div>
          </div>

          {/* Mini hero */}
          <div className="mb-8">
            <span
              className="inline-block h-1.5 w-16 rounded-full mb-3"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <div className="space-y-2 mb-3">
              <span
                className="block h-3 rounded-full"
                style={{ width: "80%", background: "linear-gradient(90deg, #6D71F9, #54C1FB)" }}
              />
              <span
                className="block h-3 rounded-full"
                style={{ width: "55%", background: "linear-gradient(90deg, #6D71F9, #54C1FB)" }}
              />
            </div>
            <span
              className="block h-1.5 rounded-full mb-4"
              style={{ width: "65%", background: "rgba(255,255,255,0.08)" }}
            />
            <motion.span
              className="inline-block h-6 rounded-full"
              style={{ width: 88, background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
              {...(shouldAnimate
                ? {
                    animate: { scale: [1, 1.05, 1] },
                    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
                  }
                : {})}
            />
          </div>

          {/* Content blocks */}
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: CARD_COUNT }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="block w-5 h-5 rounded-full mb-2.5"
                  style={{ background: "rgba(109,113,249,0.18)", border: "1px solid rgba(109,113,249,0.3)" }}
                />
                <span
                  className="block h-1.5 rounded-full mb-1.5"
                  style={{ width: "70%", background: "rgba(255,255,255,0.14)" }}
                />
                <span
                  className="block h-1.5 rounded-full"
                  style={{ width: "90%", background: "rgba(255,255,255,0.06)" }}
                />
                <span
                  className="block h-1.5 rounded-full mt-1.5"
                  style={{ width: "60%", background: "rgba(255,255,255,0.06)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
