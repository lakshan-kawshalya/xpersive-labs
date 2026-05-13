"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#5457f5] to-accent" />

      {/* Mesh/glow overlay */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] bg-white/10"
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Corner orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-7">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-sm font-medium backdrop-blur-sm">
              <Zap size={13} />
              Let&apos;s Work Together
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.1] mb-6"
          >
            Ready to Build Something
            <br className="hidden sm:block" />
            {" "}Amazing?
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-white/75 text-lg leading-relaxed mb-11 max-w-xl mx-auto"
          >
            Tell us about your project. We&apos;ll craft a solution that exceeds your
            expectations - on time, on budget, with zero compromises.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-white text-primary font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/25"
            >
              Start a Project
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
