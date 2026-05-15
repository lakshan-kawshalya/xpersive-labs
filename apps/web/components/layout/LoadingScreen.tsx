"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDMARK = "Xpersive Labs".split("");
const TAGLINE = "Innovation for a Better Tomorrow";

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.12,
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  }),
};

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("xp_loaded")) return;
    sessionStorage.setItem("xp_loaded", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5"
          style={{ background: "#272848" }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Phase 1 - Logo icon */}
          <motion.div
            initial="hidden"
            animate="visible"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="ls-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6D71F9" />
                  <stop offset="100%" stopColor="#54C1FB" />
                </linearGradient>
                <linearGradient id="ls-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#54C1FB" />
                  <stop offset="100%" stopColor="#6D71F9" />
                </linearGradient>
              </defs>

              {/* Shape 1 - top-left large diagonal */}
              <motion.g
                custom={0}
                variants={shapeVariants}
                style={{ transformOrigin: "35px 60px" }}
              >
                <rect
                  x="8" y="20" width="55" height="80" rx="14"
                  fill="url(#ls-grad1)"
                  transform="rotate(-45 35 60)"
                />
              </motion.g>

              {/* Shape 2 - top-right small diamond */}
              <motion.g
                custom={1}
                variants={shapeVariants}
                style={{ transformOrigin: "84px 34px" }}
              >
                <rect
                  x="65" y="15" width="38" height="38" rx="10"
                  fill="url(#ls-grad2)"
                  transform="rotate(-45 84 34)"
                />
              </motion.g>

              {/* Shape 3 - bottom-right small diamond */}
              <motion.g
                custom={2}
                variants={shapeVariants}
                style={{ transformOrigin: "84px 86px" }}
              >
                <rect
                  x="65" y="67" width="38" height="38" rx="10"
                  fill="url(#ls-grad1)"
                  transform="rotate(-45 84 86)"
                />
              </motion.g>
            </svg>
          </motion.div>

          {/* Phase 2 - Wordmark character reveal */}
          <div
            aria-label="Xpersive Labs"
            style={{
              fontFamily: "Syne, ui-sans-serif, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 24,
              color: "#ffffff",
              display: "flex",
              letterSpacing: "-0.01em",
            }}
          >
            {WORDMARK.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.04, duration: 0.1 }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </div>

          {/* Phase 3 - Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            style={{
              fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.01em",
            }}
          >
            {TAGLINE}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
