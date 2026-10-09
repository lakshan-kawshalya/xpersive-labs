"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({ children, className }: RevealProps) {
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
