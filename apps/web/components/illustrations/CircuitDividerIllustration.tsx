"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface CircuitDividerIllustrationProps {
  className?: string;
}

/* ─── Node positions, percent along the trace ────────────────────────── */
const NODE_POSITIONS = [4, 22, 40, 58, 76, 94];

export default function CircuitDividerIllustration({
  className,
}: CircuitDividerIllustrationProps) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <div className={`relative ${className ?? ""}`} aria-hidden="true">
      {/* Connecting trace - a straight line is unaffected by non-uniform scaling */}
      <svg
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        fill="none"
      >
        <polyline
          points={NODE_POSITIONS.map((x) => `${x},0.5`).join(" ")}
          stroke="var(--color-primary)"
          strokeOpacity="0.3"
          strokeWidth="0.06"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Nodes as real circles (immune to the SVG's non-uniform stretch) */}
      {NODE_POSITIONS.map((x, i) => (
        <motion.span
          key={x}
          className="absolute top-1/2 rounded-full"
          style={{
            left: `${x}%`,
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            background: "var(--color-primary)",
            opacity: 0.5,
            border: "1px solid var(--color-accent)",
          }}
          {...(shouldAnimate
            ? {
                animate: { scale: [1, 1.3, 1] },
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut" as const,
                },
              }
            : {})}
        />
      ))}
    </div>
  );
}
