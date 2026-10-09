"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { fadeUp } from "@/lib/animations";

export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { shouldAnimate } = useMotionSafe();

  if (!shouldAnimate) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
