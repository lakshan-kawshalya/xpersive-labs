"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "Xpersive Labs transformed our vision into a stunning, high-performance platform. Their attention to detail and technical expertise are unmatched.",
    name: "Amal Perera",
    title: "CTO, HealthSync",
    initials: "AP",
    gradient: "from-primary to-accent",
  },
  {
    quote:
      "The team delivered our mobile app ahead of schedule with exceptional quality. They truly understand both design and engineering at the highest level.",
    name: "Priya Wijesinghe",
    title: "Founder, TradeFlow",
    initials: "PW",
    gradient: "from-accent to-cyan-400",
  },
  {
    quote:
      "Working with Xpersive Labs felt like having a world-class product team in-house. Passionate, professional, and they always deliver results.",
    name: "Kamal Jayawardena",
    title: "CEO, Lumina Co.",
    initials: "KJ",
    gradient: "from-purple-500 to-primary",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-dark relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(109,113,249,1) 1px, transparent 1px), linear-gradient(to right, rgba(109,113,249,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold"
          >
            What Clients Say
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/20 transition-colors duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="text-primary/25 mb-6 flex-shrink-0"
              />

              {/* Quote text */}
              <p className="text-white/60 text-sm leading-[1.8] mb-8 flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/[0.07]">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {t.name}
                  </p>
                  <p className="text-xs text-white/35 mt-0.5">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
