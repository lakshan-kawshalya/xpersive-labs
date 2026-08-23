"use client";

import { createContext, useEffect, useState } from "react";

interface MotionSafeContextValue {
  shouldAnimate: boolean;
}

export const MotionSafeContext = createContext<MotionSafeContextValue>({
  shouldAnimate: true,
});

export function MotionSafeProvider({ children }: { children: React.ReactNode }) {
  // Starts true to match the server-rendered output (the real device
  // capabilities can only be read client-side) — corrected right after
  // mount so SSR and the first client render stay in sync and hydrate
  // cleanly instead of mismatching.
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const lowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
    setShouldAnimate(!prefersReducedMotion && !lowMemory && !lowCPU);
  }, []);

  return (
    <MotionSafeContext.Provider value={{ shouldAnimate }}>
      {children}
    </MotionSafeContext.Provider>
  );
}
