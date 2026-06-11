import { useRef } from "react";
import { useInView } from "framer-motion";

export function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return { ref, inView };
}
