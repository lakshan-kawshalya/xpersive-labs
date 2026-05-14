"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("xl-loader-seen")) return;
    sessionStorage.setItem("xl-loader-seen", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#272848" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span
            className="font-display font-extrabold text-gradient select-none"
            style={{ fontSize: "clamp(64px, 12vw, 112px)" }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1.0] as const }}
          >
            XL
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
