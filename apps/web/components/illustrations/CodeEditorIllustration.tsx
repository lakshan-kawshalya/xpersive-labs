"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface CodeEditorIllustrationProps {
  className?: string;
}

const CHIP_SIZE = 42;
const CHIP_SCALE = CHIP_SIZE / 28;
const CARD_WIDTH = 190;
const CARD_HEIGHT = 120;

/* ─── Web Apps glyph: a tiny nested browser window ───────────────────── */
function WebGlyph() {
  return (
    <g>
      <rect x="6" y="7" width="16" height="12" rx="2" stroke="var(--color-primary)" strokeOpacity="0.7" strokeWidth="1.3" />
      <line x1="6" y1="10.5" x2="22" y2="10.5" stroke="var(--color-primary)" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="9" cy="8.75" r="0.9" fill="var(--color-primary)" fillOpacity="0.6" />
    </g>
  );
}

/* ─── Ecommerce glyph: a small price tag ─────────────────────────────── */
function EcommerceGlyph() {
  return (
    <g transform="rotate(45 14 14)">
      <rect x="9" y="9" width="10" height="10" rx="1.5" stroke="var(--color-accent)" strokeOpacity="0.7" strokeWidth="1.3" />
      <circle cx="11.5" cy="11.5" r="1" fill="var(--color-accent)" fillOpacity="0.7" />
    </g>
  );
}

/* ─── Automation glyph: a mini 3-node circuit trace ──────────────────── */
function AutomationGlyph() {
  return (
    <g>
      <line x1="7" y1="14" x2="21" y2="14" stroke="var(--color-primary)" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="7" cy="14" r="1.6" fill="var(--color-primary)" fillOpacity="0.5" />
      <circle cx="14" cy="14" r="1.6" fill="var(--color-primary)" fillOpacity="0.7" />
      <circle cx="21" cy="14" r="1.6" fill="var(--color-primary)" fillOpacity="0.5" />
    </g>
  );
}

/* ─── AI glyph: a 4-point sparkle ─────────────────────────────────────── */
function AiGlyph() {
  return (
    <path
      d="M14 5 Q16 12 23 14 Q16 16 14 23 Q12 16 5 14 Q12 12 14 5Z"
      fill="var(--color-accent)"
      fillOpacity="0.5"
    />
  );
}

const TILES = [
  { x: 19, y: 64, label: "Web Apps", Glyph: WebGlyph },
  { x: 229, y: 64, label: "Ecommerce", Glyph: EcommerceGlyph },
  { x: 19, y: 204, label: "Automation", Glyph: AutomationGlyph },
  { x: 229, y: 204, label: "AI Workflows", Glyph: AiGlyph },
];

export default function CodeEditorIllustration({
  className,
}: CodeEditorIllustrationProps) {
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      {...(shouldAnimate
        ? {
            animate: { y: [0, -8, 0] },
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          }
        : {})}
    >
      <svg
        viewBox="0 0 440 344"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Window frame */}
        <rect
          x="1"
          y="1"
          width="438"
          height="342"
          rx="16"
          fill="var(--color-primary)"
          fillOpacity="0.04"
          stroke="var(--color-primary)"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />

        {/* Title bar divider */}
        <line
          x1="0"
          y1="44"
          x2="440"
          y2="44"
          stroke="var(--color-primary)"
          strokeOpacity="0.15"
          strokeWidth="1"
        />

        {/* Chrome dots */}
        <circle cx="24" cy="22" r="5" fill="var(--color-accent)" fillOpacity="0.3" />
        <circle cx="44" cy="22" r="5" fill="var(--color-accent)" fillOpacity="0.5" />
        <circle cx="64" cy="22" r="5" fill="var(--color-accent)" fillOpacity="0.8" />

        {/* File tab */}
        <rect
          x="94"
          y="14"
          width="64"
          height="16"
          rx="4"
          fill="var(--color-primary)"
          fillOpacity="0.12"
        />

        {/* Blinking "live" cursor beside the tab */}
        <motion.rect
          x="168"
          y="16"
          width="2"
          height="12"
          rx="1"
          fill="var(--color-accent)"
          {...(shouldAnimate
            ? {
                animate: { opacity: [1, 1, 0, 0, 1] },
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  times: [0, 0.45, 0.5, 0.95, 1],
                  ease: "linear" as const,
                },
              }
            : { opacity: 1 })}
        />

        {/* Service cards — one per service, big and distinct, tightly grouped */}
        {TILES.map(({ x, y, label, Glyph }) => {
          const chipX = x + (CARD_WIDTH - CHIP_SIZE) / 2;
          const chipY = y + 18;
          return (
            <g key={label}>
              <rect
                x={x}
                y={y}
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                rx="14"
                fill="var(--color-primary)"
                fillOpacity="0.05"
                stroke="var(--color-primary)"
                strokeOpacity="0.18"
                strokeWidth="1.25"
              />
              <g transform={`translate(${chipX}, ${chipY}) scale(${CHIP_SCALE})`}>
                <Glyph />
              </g>
              <text
                x={x + CARD_WIDTH / 2}
                y={chipY + CHIP_SIZE + 26}
                textAnchor="middle"
                fontSize="15"
                fontFamily="var(--font-jetbrains-mono), monospace"
                fill="var(--color-primary)"
                fillOpacity="0.65"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}
