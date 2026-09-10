"use client";

import { fadeUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { WhatsAppIcon } from "@/components/layout/WhatsAppWidget";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function CTASectionLK() {
  const { shouldAnimate } = useMotionSafe();

  const scrollProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  const ambientProps = shouldAnimate ? {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
  } : {};

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center flex flex-col items-center border border-border-subtle"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
            boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
          }}
          {...scrollProps}
        >
          {/* Ambient orbs */}
          <motion.div
            className="absolute -top-16 -left-16 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
            style={{ background: "rgba(84,193,251,0.22)" }}
            {...ambientProps}
          />
          <motion.div
            className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
            style={{ background: "rgba(109,113,249,0.18)" }}
            {...ambientProps}
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.span
              {...childProps}
              className="inline-block text-primary text-xs font-bold uppercase mb-4"
              style={{ letterSpacing: "0.14em" }}
            >
              Start an Engagement
            </motion.span>
            <motion.h2
              {...childProps}
              className="font-display font-extrabold leading-[1.05] mb-4 text-text-primary"
              style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
            >
              Have a project in mind?
            </motion.h2>
            <motion.p
              {...childProps}
              className="text-lg leading-relaxed mb-10 max-w-xl text-text-secondary"
            >
              Let&apos;s talk about what you&apos;re building.
            </motion.p>
            <motion.a
              {...childProps}
              href={buildWhatsAppUrl("Hi Xpersive Labs! I'd like to start a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
            >
              <WhatsAppIcon size={20} color="white" />
              Chat on WhatsApp
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            </motion.a>
            <motion.p {...childProps} className="text-sm mt-6 text-text-muted">
              No formal briefs required. Tell us what you want to achieve, and we&apos;ll map the technical execution.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
