"use client";

import { useContext } from "react";
import { MotionSafeContext } from "@/context/MotionSafeContext";

export function useMotionSafe() {
  return useContext(MotionSafeContext);
}
