"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  ArrowRight,
  Search,
  PenTool,
  Code2,
  Rocket,
  CheckCircle,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* ─── Shared types ──────────────────────────────────────────────────── */

interface Step {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

interface Service {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  headline: string;
  body: string[];
  steps: Step[];
  tools: string[];
  accentColor: string;
  accentBg: string;
  gradientFrom: string;
  gradientTo: string;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const processSteps: Step[] = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "We dive deep into your goals, users, and constraints to define exactly what success looks like before we write a single line of code.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Wireframes, prototypes, and high-fidelity mockups that align stakeholders and de-risk development before build begins.",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Agile sprints, clean architecture, thorough testing, and continuous delivery so you see progress — and can steer it — every week.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Production deployment, performance audits, monitoring setup, and post-launch support so your product lands without friction.",
  },
];

const designSteps: Step[] = [
  {
    icon: Search,
    title: "Research",
    description:
      "User interviews, competitive audits, and heuristic evaluations to uncover real needs and opportunities before any pixel is placed.",
  },
  {
    icon: PenTool,
    title: "Wireframes",
    description:
      "Low-fidelity layouts that map out information architecture and user flows — fast to iterate, easy to validate with stakeholders.",
  },
  {
    icon: CheckCircle,
    title: "Prototyping",
    description:
      "Interactive prototypes that simulate the real product so you can test with users before committing to full development.",
  },
  {
    icon: Rocket,
    title: "Design System",
    description:
      "A living library of components, tokens, and guidelines that keeps product teams moving fast and brand consistent at scale.",
  },
];

const services: Service[] = [
  {
    id: "web",
    icon: Globe,
    label: "Web Development",
    headline: "Full-Stack Web Applications Built to Scale",
    body: [
      "We architect and build web applications that handle real-world complexity without sacrificing speed or maintainability. From single-page apps to multi-tenant SaaS platforms, we work in the stack that makes sense for your problem.",
      "Our web projects are built with React and Next.js at the core — combining server-side rendering for SEO and performance, with client-side interactivity where it matters. Every decision, from database schema to deployment pipeline, is made intentionally.",
    ],
    steps: processSteps,
    tools: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel", "AWS"],
    accentColor: "text-primary",
    accentBg: "bg-primary/10",
    gradientFrom: "from-primary/20",
    gradientTo: "to-accent/5",
  },
  {
    id: "mobile",
    icon: Smartphone,
    label: "Mobile Development",
    headline: "Cross-Platform Mobile Apps with Native Feel",
    body: [
      "One codebase, two platforms — without the trade-offs you've been warned about. React Native has matured into a powerhouse for shipping high-quality iOS and Android apps at a fraction of the cost of two native builds.",
      "We build mobile experiences that feel genuinely native: smooth animations, proper gesture handling, push notifications, offline support, and deep OS integrations. You won't catch us shipping something that feels like a web wrapper.",
    ],
    steps: processSteps,
    tools: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "React Query", "Firebase", "App Store", "Play Store"],
    accentColor: "text-accent",
    accentBg: "bg-accent/10",
    gradientFrom: "from-accent/20",
    gradientTo: "to-primary/5",
  },
  {
    id: "design",
    icon: Palette,
    label: "UI/UX Design",
    headline: "Design That Converts, Delights, and Endures",
    body: [
      "Good design isn't decoration — it's strategy. We start with research to understand your users deeply, then translate those insights into interfaces that are both beautiful and unmistakably purposeful.",
      "Whether you need a full product design from scratch, a design system to scale an existing product, or a usability audit to diagnose conversion issues — we bring structured process and aesthetic rigor to every engagement.",
    ],
    steps: designSteps,
    tools: ["Figma", "Framer", "Maze", "Hotjar", "Lottie", "Storybook", "Adobe CC", "Zeplin"],
    accentColor: "text-purple-400",
    accentBg: "bg-purple-500/10",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-pink-500/5",
  },
];

/* ─── Sub-components ────────────────────────────────────────────────── */

function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reversed = index % 2 !== 0;

  return (
    <section
      id={service.id}
      className="py-24 border-t border-white/[0.07] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Label + headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20 ${reversed ? "lg:grid-flow-dense" : ""}`}
        >
          {/* Text block */}
          <motion.div variants={fadeUp} className={reversed ? "lg:col-start-2" : ""}>
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.accentBg}`}
              >
                <service.icon size={22} className={service.accentColor} />
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-[0.2em] ${service.accentColor}`}
              >
                {service.label}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-7">
              {service.headline}
            </h2>

            <div className="space-y-4 text-white/55 leading-relaxed mb-8">
              {service.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tool badges */}
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-3">
                Tools &amp; Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${service.accentBg} ${service.accentColor} border border-white/10`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual / accent card */}
          <motion.div variants={fadeUp} className={reversed ? "lg:col-start-1 lg:row-start-1" : ""}>
            <div
              className={`relative rounded-2xl p-10 border border-white/10 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} overflow-hidden h-full min-h-[280px] flex items-center justify-center`}
            >
              {/* Big icon watermark */}
              <div className="absolute -bottom-8 -right-8 opacity-5">
                <service.icon size={200} />
              </div>
              {/* Floating glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${
                    service.id === "web"
                      ? "rgba(109,113,249,0.25)"
                      : service.id === "mobile"
                      ? "rgba(84,193,251,0.25)"
                      : "rgba(168,85,247,0.25)"
                  } 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10 text-center">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${service.accentBg} mb-5 border border-white/10`}
                >
                  <service.icon size={38} className={service.accentColor} />
                </div>
                <p className="font-display text-2xl font-bold mb-2">{service.label}</p>
                <p className={`text-sm font-medium ${service.accentColor}`}>
                  End-to-end delivery
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Process steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-8"
          >
            Our Process
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors duration-300"
              >
                {/* Step number */}
                <span
                  className={`absolute top-5 right-5 font-display text-3xl font-bold opacity-10 ${service.accentColor}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${service.accentBg} mb-4`}
                >
                  <step.icon size={18} className={service.accentColor} />
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <div className="bg-dark text-white">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Orbs */}
        <motion.div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.2) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6D71F9 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5"
            >
              What We Offer
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7 max-w-3xl"
            >
              Our{" "}
              <span className="text-gradient">Services</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10"
            >
              From pixel-perfect interfaces to production-grade backends and
              native mobile apps — we cover the full stack of digital product development.
            </motion.p>

            {/* Service anchors */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white/70 hover:text-white hover:border-white/25 transition-all duration-200`}
                >
                  <s.icon size={15} className={s.accentColor} />
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Service rows ───────────────────────────────────────────── */}
      {services.map((service, index) => (
        <ServiceRow key={service.id} service={service} index={index} />
      ))}

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="relative rounded-2xl overflow-hidden p-12 sm:p-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            {/* Gradient bg */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, #6D71F9 0%, #5457f5 50%, #54C1FB 100%)" }}
            />
            {/* Dot overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[80px] bg-white/10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5"
              >
                Not sure which service fits?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/75 text-lg mb-10 max-w-xl mx-auto"
              >
                Tell us about your project and we&apos;ll scope the right solution
                together — no commitment required.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-white text-primary font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                >
                  Let&apos;s Talk
                  <ArrowRight
                    size={17}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
