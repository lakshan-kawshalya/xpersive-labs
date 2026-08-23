"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface DraftingIllustrationProps {
  className?: string;
}

export default function DraftingIllustration({
  className,
}: DraftingIllustrationProps) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Wireframe rectangle */}
      <rect
        x="6"
        y="16"
        width="56"
        height="40"
        rx="6"
        stroke="var(--color-primary)"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />
      <line
        x1="14"
        y1="28"
        x2="42"
        y2="28"
        stroke="var(--color-primary)"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <line
        x1="14"
        y1="38"
        x2="34"
        y2="38"
        stroke="var(--color-primary)"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      {/* Pencil, tilted 45deg with a gentle rocking oscillation around its tip */}
      <g transform="rotate(45 60 62)">
        <motion.g
          style={{ transformOrigin: "60px 62px" }}
          {...(shouldAnimate
            ? {
                animate: { rotate: [-5, 5, -5] },
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                },
              }
            : {})}
        >
          <rect
            x="56"
            y="26"
            width="8"
            height="36"
            rx="2"
            fill="var(--color-accent)"
            fillOpacity="0.18"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />
          <path
            d="M56 26L60 18L64 26Z"
            fill="var(--color-accent)"
            fillOpacity="0.4"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.g>
      </g>
    </svg>
  );
}
