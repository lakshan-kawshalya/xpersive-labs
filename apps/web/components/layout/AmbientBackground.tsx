"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface OrbConfig {
  size: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  color: string;
  blur: number;
  duration: number;
  parallax: number;
  float: { x: number[]; y: number[] };
}

const ORB_CONFIG: OrbConfig[] = [
  {
    size: 600, top: -200, left: -150,
    color: "rgba(109, 113, 249, 0.06)",
    blur: 80, duration: 32, parallax: 0.4,
    float: { x: [0, 60, -20, 40, 0], y: [0, -40, 30, 50, 0] },
  },
  {
    size: 500, top: "30%", right: -120,
    color: "rgba(84, 193, 251, 0.05)",
    blur: 80, duration: 36, parallax: 0.25,
    float: { x: [0, -50, 30, -20, 0], y: [0, 60, -20, 40, 0] },
  },
  {
    size: 400, bottom: -100, left: "25%",
    color: "rgba(109, 113, 249, 0.04)",
    blur: 80, duration: 40, parallax: -0.2,
    float: { x: [0, 40, -60, 20, 0], y: [0, -30, 50, -50, 0] },
  },
];

export default function AmbientBackground() {
  const { shouldAnimate } = useMotionSafe();
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onVisibility = () => setIsVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      wrapperRefs.current.forEach((el, i) => {
        if (!el) return;
        const factor = ORB_CONFIG[i]?.parallax ?? 0.3;
        el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {ORB_CONFIG.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { wrapperRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            transition: "transform 1.5s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <motion.div
            style={{
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: `blur(${orb.blur}px)`,
            }}
            {...(shouldAnimate && isVisible ? {
              animate: orb.float,
              transition: {
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            } : {})}
          />
        </div>
      ))}
    </div>
  );
}
