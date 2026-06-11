"use client";

import { motion } from "framer-motion";

interface Props {
  inView: boolean;
  shouldAnimate: boolean;
}

export function SectionRevealOverlays({ inView, shouldAnimate }: Props) {
  if (!shouldAnimate) return null;

  return (
    <>
      {/* 1px scan line — sweeps full-width on section entry */}
      <div
        className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, #6D71F9 30%, #54C1FB 70%, transparent)",
          }}
          initial={{ x: "-100%" }}
          animate={inView ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
        />
      </div>

      {/* Glow pulse — blooms then fades after scan */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(109,113,249,0.14) 0%, transparent 70%)",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, times: [0, 0.25, 1], ease: "easeOut" }}
      />
    </>
  );
}
