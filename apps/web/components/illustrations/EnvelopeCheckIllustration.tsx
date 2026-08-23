"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface EnvelopeCheckIllustrationProps {
  className?: string;
}

export default function EnvelopeCheckIllustration({
  className,
}: EnvelopeCheckIllustrationProps) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...(shouldAnimate
        ? {
            animate: { x: [0, 4, 0] },
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          }
        : {})}
    >
      {/* Envelope body */}
      <rect
        x="2"
        y="8"
        width="28"
        height="20"
        rx="3"
        stroke="var(--color-primary)"
        strokeWidth="1.75"
      />
      {/* Envelope flap */}
      <path
        d="M3 9.5L16 19L29 9.5"
        stroke="var(--color-primary)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Checkmark badge */}
      <circle
        cx="30"
        cy="28"
        r="9"
        fill="var(--color-accent)"
        fillOpacity="0.15"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      />
      <path
        d="M26 28l2.8 2.8L34.5 25"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
