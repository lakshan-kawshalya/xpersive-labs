"use client";

import { fadeUp } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

interface SpotlightCardProps {
  icon: React.ElementType;
  title: string;
  body: string;
  href?: string;
  accentColor?: string;
  numberWatermark?: string | number;
  showUnderlineBar?: boolean;
  iconSize?: "md" | "sm";
  interactive?: boolean;
  variants?: Variants;
  /** "light" (default) renders a white card with dark text, for use on the
   *  light page background. "dark" renders the original translucent-white-
   *  on-navy treatment, for sections that intentionally stay dark (e.g. WhyUs). */
  theme?: "light" | "dark";
}

function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
}

export default function SpotlightCard({
  icon: Icon,
  title,
  body,
  href,
  accentColor = "#6D71F9",
  numberWatermark,
  showUnderlineBar = false,
  iconSize = "md",
  interactive = true,
  variants = fadeUp,
  theme = "light",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });
  const [hovered, setHovered] = useState(false);
  const { shouldAnimate } = useMotionSafe();
  const rgb = hexToRgbTriplet(accentColor);

  const animProps = shouldAnimate
    ? interactive
      ? {
          variants,
          whileHover: { y: -8, boxShadow: `0 20px 60px rgba(${rgb},0.15)` },
          transition: { type: "spring" as const, stiffness: 200, damping: 22 },
          onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
            const r = cardRef.current?.getBoundingClientRect();
            if (r) setSpot({ x: e.clientX - r.left, y: e.clientY - r.top, on: true });
          },
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => {
            setSpot((s) => ({ ...s, on: false }));
            setHovered(false);
          },
        }
      : {
          variants,
          onMouseEnter: () => setHovered(true),
          onMouseLeave: () => setHovered(false),
        }
    : { initial: false };

  const iconBoxSizeClass = iconSize === "sm" ? "w-10 h-10 mb-6" : "w-12 h-12 mb-7";
  const iconBoxRadius = iconSize === "sm" ? 12 : 14;
  const iconPx = iconSize === "sm" ? 20 : 24;
  const isDark = theme === "dark";

  return (
    <motion.div
      ref={cardRef}
      {...animProps}
      className={`group relative flex flex-col rounded-3xl border overflow-hidden transition-colors duration-350 ${
        isDark
          ? "border-white/8 hover:border-white/15"
          : "border-border-subtle hover:border-primary/30"
      }`}
      style={{
        padding: 32,
        background: isDark ? "rgba(255,255,255,0.04)" : "var(--surface-card)",
        boxShadow: isDark ? "none" : "0 2px 12px rgba(109,113,249,0.06)",
      }}
    >
      {/* Hover background tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: isDark ? "rgba(255,255,255,0.03)" : `rgba(${rgb},0.04)` }}
      />

      {/* Spotlight radial */}
      {shouldAnimate && interactive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: spot.on ? 1 : 0,
            transition: "opacity 0.2s ease",
            background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(${rgb},0.08) 0%, transparent 60%)`,
          }}
        />
      )}

      {numberWatermark !== undefined && (
        <span
          className="absolute top-4 right-5 font-display font-extrabold select-none pointer-events-none leading-none"
          style={{ fontSize: 80, color: `rgba(${rgb},0.06)` }}
        >
          {numberWatermark}
        </span>
      )}

      {/* Icon container */}
      <div
        className={`relative inline-flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-[5deg] ${iconBoxSizeClass}`}
        style={{
          borderRadius: iconBoxRadius,
          background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))",
          border: `1px solid rgba(${rgb},0.3)`,
        }}
      >
        <Icon size={iconPx} className="text-primary" />
      </div>

      <h3 className={`relative font-display text-xl font-bold mb-3 ${isDark ? "text-white" : "text-text-primary"}`}>{title}</h3>
      <p className={`relative text-sm leading-relaxed flex-1 ${isDark ? "text-white/55" : "text-text-secondary"} ${href ? "mb-5" : ""}`}>
        {body}
      </p>

      {/* Learn More - visible on hover */}
      {href && (
        <Link
          href={href}
          className="relative inline-flex items-center gap-1.5 text-sm font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ color: accentColor }}
        >
          Learn More
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      )}

      {showUnderlineBar && (
        <div className="relative mt-6 h-px" style={{ background: "var(--border-subtle)" }}>
          <div
            className="absolute inset-y-0 left-0 h-full"
            style={{
              width: hovered ? "100%" : "0%",
              background: `linear-gradient(90deg, ${accentColor}, transparent)`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
