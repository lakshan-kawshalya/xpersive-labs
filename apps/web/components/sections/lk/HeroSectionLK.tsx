"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Lock, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const HEADLINE_LINE_1 = ["Built", "Here."];
const HEADLINE_LINE_2 = ["Built", "Right."];

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  }),
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function HeroSectionLK() {
  const { shouldAnimate } = useMotionSafe();

  return (
    <section className="relative min-h-screen grid place-items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            {/* Location / studio badge */}
            <motion.div
              className="mb-8"
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.05 },
              } : { initial: false })}
            >
              <span
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-medium select-none"
                style={{ background: "rgba(109,113,249,0.08)", border: "1px solid rgba(109,113,249,0.2)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--color-success)", animation: "hero-badge-pulse 2s ease-in-out infinite" }}
                />
                <span className="text-text-secondary">Colombo, Sri Lanka — Software Studio</span>
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-7 text-text-primary"
              style={{ perspective: "800px" }}
            >
              <span className="block">
                {HEADLINE_LINE_1.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    {...(shouldAnimate ? { custom: i, variants: wordVariants, initial: "hidden", animate: "visible" } : { initial: false })}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {HEADLINE_LINE_2.map((word, i) => (
                  <motion.span
                    key={i + HEADLINE_LINE_1.length}
                    className="inline-block mr-[0.25em] text-gradient"
                    {...(shouldAnimate ? {
                      custom: i + HEADLINE_LINE_1.length,
                      variants: wordVariants,
                      initial: "hidden",
                      animate: "visible",
                    } : { initial: false })}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              className="max-w-[520px] mx-auto lg:mx-0 text-[18px] text-text-secondary leading-[1.7] mb-8"
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.8, ease: "easeOut" },
              } : { initial: false })}
            >
              Xpersive Labs is a Colombo-based software studio building websites, apps, and automation for Sri Lankan businesses ready to grow. Innovation for a Better Tomorrow.
            </motion.p>

            {/* CTA + founded line */}
            <motion.div
              className="flex flex-col items-center lg:items-start gap-6"
              {...(shouldAnimate ? {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 1.0, ease: "easeOut" },
              } : { initial: false })}
            >
              <a
                href={buildWhatsAppUrl("Hi Xpersive Labs! I'd like to start a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(109,113,249,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <MessageCircle size={20} className="transition-transform group-hover:scale-110" aria-hidden="true" />
                Chat on WhatsApp
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>

              <span className="inline-flex items-center gap-2 text-sm text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-primary/70 inline-block" />
                <span className="font-medium text-text-primary">Founded 2024</span>
                <span className="text-text-muted">·</span>
                <span>Based in Colombo, Sri Lanka</span>
              </span>
            </motion.div>
          </div>

          {/* Right column — browser mockup showing a real kind of client site */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            {...(shouldAnimate ? {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1, y: [0, -10, 0] },
              transition: {
                opacity: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1.0] },
                scale: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1.0] },
                y: { duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" },
              },
            } : { initial: false })}
          >
            <div
              className="relative w-full max-w-[440px] rounded-2xl bg-bg-card border border-border-subtle overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(109,113,249,0.24)]"
              style={{ boxShadow: "0 16px 48px rgba(109,113,249,0.18)" }}
            >
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[rgba(109,113,249,0.06)] border-b border-border-subtle">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-text-muted/30 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-text-muted/30 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-text-muted/30 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-card border border-border-subtle max-w-[210px] w-full justify-center shadow-sm">
                  <Lock size={12} className="text-primary" aria-hidden="true" />
                  <span className="text-[10px] font-bold tracking-tight text-text-primary">aurabotanica.lk</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-card text-primary text-[10px] uppercase font-bold tracking-wider shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Live
                </div>
              </div>

              {/* Mock client site content */}
              <div className="p-5 sm:p-6 flex flex-col gap-4" style={{ background: "linear-gradient(145deg, #fff, rgba(109,113,249,0.04))" }}>
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center text-white">
                      <Sparkles size={13} aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-text-primary font-bold leading-tight">Aura Botanica</span>
                      <span className="text-[9px] text-text-muted tracking-wider uppercase">Hair &amp; Skin Studio · Colombo 07</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <PhoneCall size={13} aria-hidden="true" />
                  </div>
                </div>

                <div className="rounded-xl border border-primary/15 p-5 flex flex-col gap-3 relative overflow-hidden" style={{ background: "linear-gradient(145deg, rgba(109,113,249,0.05), rgba(84,193,251,0.08))" }}>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white self-start text-primary text-[10px] uppercase tracking-wider font-bold shadow-sm">
                    Holistic Wellness &amp; Aesthetics
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-base text-text-primary font-bold leading-tight">
                      Effortless Radiance,
                      <span className="text-gradient block">Naturally Crafted.</span>
                    </h4>
                    <p className="text-[12px] text-text-secondary leading-relaxed">
                      Bespoke botanical treatments, scalp therapy &amp; clinical skin rejuvenation.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-medium shadow-sm"
                    >
                      <Calendar size={13} aria-hidden="true" />
                      Book Appointment
                    </button>
                    <span className="text-[10px] text-text-muted">Next slot: Today, 3:30 PM</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-bg-card border border-border-subtle shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[12px] text-text-primary font-medium">12 visitors exploring now</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] text-primary font-bold bg-[rgba(109,113,249,0.08)] px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={11} aria-hidden="true" />
                    Direct Calendar Sync
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(109,113,249,0.2), transparent)" }}
      />
    </section>
  );
}
