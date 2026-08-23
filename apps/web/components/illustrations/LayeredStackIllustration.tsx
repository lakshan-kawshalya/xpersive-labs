"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface LayeredStackIllustrationProps {
  className?: string;
}

/* ─── Layers, top to bottom ───────────────────────────────────────────── */
const LAYERS = [
  { y: 8, label: "Frontend" },
  { y: 48, label: "Backend" },
  { y: 88, label: "Database" },
];

const LAYER_WIDTH = 140;
const LAYER_HEIGHT = 32;

export default function LayeredStackIllustration({
  className,
}: LayeredStackIllustrationProps) {
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate
    ? {
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-40px" },
      }
    : { initial: false as const };

  const layerProps = shouldAnimate ? { variants: fadeUp } : { initial: false as const };

  return (
    <motion.div className={className} aria-hidden="true" {...scrollProps}>
      <svg
        viewBox="0 0 220 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {LAYERS.map((layer) => (
          <motion.g key={layer.label} {...layerProps}>
            <rect
              x="0"
              y={layer.y}
              width={LAYER_WIDTH}
              height={LAYER_HEIGHT}
              rx="8"
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
            <text
              x={LAYER_WIDTH + 14}
              y={layer.y + LAYER_HEIGHT / 2 + 4}
              fontSize="11"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fill="var(--color-primary)"
              fillOpacity="0.55"
            >
              {layer.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
