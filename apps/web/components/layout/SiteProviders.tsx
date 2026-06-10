"use client";

import { MotionConfig } from "framer-motion";
import { MotionSafeProvider } from "@/context/MotionSafeContext";

export default function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionSafeProvider>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </MotionSafeProvider>
  );
}
