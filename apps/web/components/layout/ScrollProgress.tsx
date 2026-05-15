"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[2px] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #6D71F9, #54C1FB)",
        zIndex: 9999,
        transition: "none",
      }}
    />
  );
}
