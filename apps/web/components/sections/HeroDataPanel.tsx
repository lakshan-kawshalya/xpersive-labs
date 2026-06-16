"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const SUPPLIERS = [
  { name: "Yiwu Global Textile Co.", price: "$2.40", status: "ACTIVE" },
  { name: "Ningbo Precision Parts Ltd.", price: "$14.80", status: "NEW" },
  { name: "Guangzhou Beauty Wholesale", price: "$1.15", status: "ACTIVE" },
  { name: "Shenzhen ElecParts Factory", price: "$8.60", status: "UPDATE" },
  { name: "Hangzhou Fabric & Textiles", price: "$3.25", status: "ACTIVE" },
  { name: "Dongguan Plastics Hub", price: "$0.85", status: "NEW" },
  { name: "Foshan Metal Works Ltd.", price: "$22.50", status: "ACTIVE" },
  { name: "Qingdao Marine Exports", price: "$6.80", status: "UPDATE" },
];

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "#10B981",
  NEW: "#54C1FB",
  UPDATE: "#6D71F9",
};

const ROW_H = 38;
const VISIBLE_H = Math.round(ROW_H * 3.5); // ~133px — shows 3.5 rows
const BATCH_H = SUPPLIERS.length * ROW_H;   // 304px — one full pass
const LOOP_ROWS = [...SUPPLIERS, ...SUPPLIERS]; // doubled for seamless loop

export default function HeroDataPanel() {
  const { shouldAnimate } = useMotionSafe();
  const [tick, setTick] = useState<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) return;
    const id = setInterval(() => {
      setTick(Math.floor(Math.random() * SUPPLIERS.length));
      setTimeout(() => setTick(null), 500);
    }, 3600);
    return () => clearInterval(id);
  }, [shouldAnimate]);

  return (
    <div
      className="hidden lg:block w-full font-mono"
      style={{
        borderRadius: 16,
        border: "1px solid rgba(109,113,249,0.18)",
        background: "rgba(15,15,30,0.6)",
        backdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          borderBottom: "1px solid rgba(109,113,249,0.12)",
          background: "rgba(109,113,249,0.06)",
        }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
        <span className="ml-3 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          data_pipeline · live
        </span>
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{
            background: "#10B981",
            boxShadow: "0 0 6px #10B981",
            animation: "hero-badge-pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Column headers */}
      <div
        className="grid grid-cols-[1fr_80px_70px] gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
        style={{
          color: "rgba(255,255,255,0.25)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span>Supplier</span>
        <span className="text-right">Unit Price</span>
        <span className="text-right">Status</span>
      </div>

      {/* Infinite-scroll rows */}
      <div
        style={{
          height: VISIBLE_H,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <motion.div
          animate={shouldAnimate ? { y: ["0px", `-${BATCH_H}px`] } : {}}
          transition={
            shouldAnimate
              ? { duration: 20, ease: "linear", repeat: Infinity, repeatType: "loop" }
              : {}
          }
        >
          {LOOP_ROWS.map((s, i) => {
            const base = i % SUPPLIERS.length;
            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_80px_70px] gap-3 px-4 items-center"
                style={{
                  height: ROW_H,
                  background:
                    tick === base ? "rgba(109,113,249,0.06)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  transition: "background 0.2s ease",
                }}
              >
                <span
                  className="text-[12px] truncate"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {s.name}
                </span>
                <span
                  className="text-right text-[12px] font-semibold tabular-nums"
                  style={{
                    color: tick === base ? "#54C1FB" : "rgba(255,255,255,0.8)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {s.price}
                </span>
                <div className="flex justify-end">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                      color: STATUS_COLORS[s.status],
                      background: `${STATUS_COLORS[s.status]}18`,
                      border: `1px solid ${STATUS_COLORS[s.status]}35`,
                    }}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Progress sweep bar */}
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background: "rgba(109,113,249,0.03)",
        }}
      >
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          scanning
        </span>
        <div
          className="flex-1 rounded-full overflow-hidden"
          style={{ height: 3, background: "rgba(255,255,255,0.05)" }}
        >
          {shouldAnimate && (
            <motion.div
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6D71F9, #54C1FB)" }}
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          live
        </span>
      </div>
    </div>
  );
}
