"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMotionSafe } from "@/hooks/useMotionSafe";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { shouldAnimate } = useMotionSafe();

  if (!shouldAnimate) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <AnimatePresence mode="sync">
      <motion.main
        key={pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
