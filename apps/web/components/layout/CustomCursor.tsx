"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hovering = false;
    let clicking = false;
    let textMode = false;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function tick() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);

      const dotScale = clicking ? 0.7 : hovering ? 0 : 1;
      const ringScale = clicking ? 0.85 : 1;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%) scale(${dotScale})`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%) scale(${ringScale})`;

      rafId = requestAnimationFrame(tick);
    }

    function applyRingState() {
      if (textMode) {
        ring.style.width = "2px";
        ring.style.height = "24px";
        ring.style.borderRadius = "2px";
        ring.style.backgroundColor = "transparent";
        ring.style.borderWidth = "1.5px";
      } else if (hovering) {
        ring.style.width = "64px";
        ring.style.height = "64px";
        ring.style.borderRadius = "50%";
        ring.style.backgroundColor = "rgba(109,113,249,0.15)";
        ring.style.borderWidth = "2px";
      } else {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderRadius = "50%";
        ring.style.backgroundColor = "transparent";
        ring.style.borderWidth = "1.5px";
      }
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      hovering = !!el.closest("a, button, [role='button'], [data-cursor='hover']");
      textMode = !!el.closest("[data-cursor='text']");
      applyRingState();
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [reduced]);

  return (
    <>
      {/* Layer 1 — Dot: zero-delay direct tracking */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          backgroundColor: "#6D71F9",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      {/* Layer 2 — Ring: lerp lag + blend mode */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          border: "1.5px solid rgba(109,113,249,0.5)",
          borderRadius: "50%",
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition:
            "width 0.18s ease, height 0.18s ease, background-color 0.18s ease, border-radius 0.15s ease, border-width 0.15s ease",
        }}
      />
    </>
  );
}
