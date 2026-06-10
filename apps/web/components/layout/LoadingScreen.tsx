"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const WORDMARK = "Xpersive Labs".split("");
const TAGLINE = "Innovation for a Better Tomorrow";

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.12,
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  }),
};

export default function LoadingScreen() {
  const [show, setShow] = useState(false);
  const { shouldAnimate } = useMotionSafe();

  useEffect(() => {
    if (sessionStorage.getItem("xp_loaded")) return;
    sessionStorage.setItem("xp_loaded", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), shouldAnimate ? 2100 : 400);
    return () => clearTimeout(t);
  }, [shouldAnimate]);

  const svgDefs = (
    <defs>
      <linearGradient id="ls-g1" x1="0" y1="74.3" x2="109.35" y2="74.3" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#6d71f9" />
        <stop offset="1" stopColor="#54c1fb" />
      </linearGradient>
      <linearGradient id="ls-g2" x1="93.1" y1="97.7" x2="163.24" y2="97.7" gradientUnits="userSpaceOnUse" gradientTransform="translate(-44.88 134.72) rotate(-45)">
        <stop offset="0" stopColor="#6d71f9" />
        <stop offset="1" stopColor="#54c1fb" />
      </linearGradient>
      <linearGradient id="ls-g3" x1="97.74" y1="55.28" x2="167.89" y2="55.28" gradientUnits="userSpaceOnUse" gradientTransform="translate(-18.17 89.99) rotate(-45)">
        <stop offset="0" stopColor="#6d71f9" />
        <stop offset="1" stopColor="#54c1fb" />
      </linearGradient>
      <linearGradient id="ls-g4" x1="0" y1="37.08" x2="47.97" y2="37.08" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#54c1fb" />
        <stop offset="1" stopColor="#6d71f9" />
      </linearGradient>
    </defs>
  );

  const shapeStyle = { transformBox: "fill-box" as const, transformOrigin: "50% 50%" };

  const innerContent = (
    <>
      <motion.div initial={shouldAnimate ? "hidden" : false} animate="visible">
        <svg
          width="64"
          height="63"
          viewBox="0 0 149.91 148.34"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {svgDefs}
          <motion.g custom={0} variants={shapeVariants} style={shapeStyle}>
            <path fill="url(#ls-g1)" d="M106.66,80.66l-26.06,26.04-38.93,38.93c-3.58,3.6-9.39,3.6-12.99,0L2.69,119.65c-3.58-3.58-3.58-9.41,0-12.99l19.57-19.57,12.81-12.79.11-.11-.02-.02C51.47,52.41,52.2,22.73,37.41.27c1.56.39,3.05,1.19,4.26,2.41l39,39,25.99,25.99c3.58,3.58,3.58,9.41,0,12.99Z" />
          </motion.g>
          <motion.g custom={1} variants={shapeVariants} style={shapeStyle}>
            <rect fill="url(#ls-g2)" x="88.57" y="86.9" width="52.53" height="52.53" rx="5" ry="5" transform="translate(276.05 111.99) rotate(135)" />
          </motion.g>
          <motion.g custom={2} variants={shapeVariants} style={shapeStyle}>
            <rect fill="url(#ls-g3)" x="88.57" y="8.9" width="52.53" height="52.53" rx="5" ry="5" transform="translate(8.77 91.5) rotate(-45)" />
          </motion.g>
          <motion.g custom={3} variants={shapeVariants} style={shapeStyle}>
            <path fill="url(#ls-g4)" d="M35.16,74.16L2.69,41.68c-3.58-3.6-3.58-9.41,0-13.01L28.68,2.68C31.05.33,34.37-.48,37.41.27c14.8,22.46,14.06,52.14-2.24,73.88Z" />
          </motion.g>
        </svg>
      </motion.div>

      <div
        aria-label="Xpersive Labs"
        style={{
          fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 24,
          color: "#ffffff",
          display: "flex",
          letterSpacing: "-0.01em",
        }}
      >
        {WORDMARK.map((char, i) => (
          <motion.span
            key={i}
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={shouldAnimate ? { delay: 0.7 + i * 0.04, duration: 0.1 } : undefined}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={shouldAnimate ? { delay: 1.1, duration: 0.4 } : undefined}
        style={{
          fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif",
          fontWeight: 400,
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.01em",
        }}
      >
        {TAGLINE}
      </motion.p>
    </>
  );

  const containerClass = "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5";
  const containerStyle = { background: "#272848" };

  if (!shouldAnimate) {
    return show ? (
      <div className={containerClass} style={containerStyle}>
        {innerContent}
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className={containerClass}
          style={containerStyle}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          {innerContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
