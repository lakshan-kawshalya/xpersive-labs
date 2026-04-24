"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true (SSR-safe)
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { damping: 25, stiffness: 400 });
  const y = useSpring(rawY, { damping: 25, stiffness: 400 });

  // Detect touch device on mount only (avoid SSR mismatch)
  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      setIsHovering(
        !!target.closest(
          "a, button, [role='button'], input, textarea, select, label"
        )
      );
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isTouchDevice, prefersReduced, rawX, rawY, isVisible]);

  // Don't render on touch devices or when reduced motion is requested
  if (isTouchDevice || prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y }}
      aria-hidden="true"
    >
      <motion.div
        className="rounded-full bg-primary"
        animate={{
          width: isHovering ? 44 : 16,
          height: isHovering ? 44 : 16,
          x: isHovering ? -22 : -8,
          y: isHovering ? -22 : -8,
          opacity: isVisible ? 0.85 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          boxShadow:
            "0 0 20px rgba(109, 113, 249, 0.7), 0 0 50px rgba(109, 113, 249, 0.3)",
        }}
      />
    </motion.div>
  );
}
