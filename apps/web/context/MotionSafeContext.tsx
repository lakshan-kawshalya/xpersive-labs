"use client";

import { createContext, useState } from "react";

interface MotionSafeContextValue {
  shouldAnimate: boolean;
}

export const MotionSafeContext = createContext<MotionSafeContextValue>({
  shouldAnimate: true,
});

export function MotionSafeProvider({ children }: { children: React.ReactNode }) {
  const [shouldAnimate] = useState(() => {
    if (typeof window === "undefined") return false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const lowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
    return !prefersReducedMotion && !lowMemory && !lowCPU;
  });

  return (
    <MotionSafeContext.Provider value={{ shouldAnimate }}>
      {children}
    </MotionSafeContext.Provider>
  );
}
