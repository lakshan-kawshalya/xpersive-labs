"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Smartphone, Palette, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Full-stack web applications built with React, Next.js, and modern frameworks. Scalable, performant, and beautifully crafted to drive real business outcomes.",
    href: "/services#web",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderHover: "hover:border-primary/30",
    glowColor: "rgba(109, 113, 249, 0.08)",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with React Native. Native performance, a unified codebase, and seamless experiences on both iOS and Android.",
    href: "/services#mobile",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    borderHover: "hover:border-accent/30",
    glowColor: "rgba(84, 193, 251, 0.08)",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Research-driven design that converts. From wireframes to polished design systems — we craft interfaces that users love and businesses trust.",
    href: "/services#design",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-500/30",
    glowColor: "rgba(168, 85, 247, 0.08)",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-28 bg-dark relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
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
            Our Expertise
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl font-bold mb-5"
          >
            What We Do
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
          >
            From concept to launch, we deliver end-to-end digital solutions that
            make a measurable impact.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className={`group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 ${service.borderHover} transition-colors duration-300`}
              style={{
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${service.glowColor} 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl ${service.iconBg} mb-7`}
              >
                <service.icon size={24} className={service.iconColor} />
              </div>

              <h3 className="relative font-display text-xl font-bold mb-3">
                {service.title}
              </h3>
              <p className="relative text-white/50 text-sm leading-relaxed mb-7">
                {service.description}
              </p>

              <Link
                href={service.href}
                className={`relative inline-flex items-center gap-1.5 text-sm font-semibold ${service.iconColor} transition-all group-hover:gap-3`}
              >
                Learn More
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
