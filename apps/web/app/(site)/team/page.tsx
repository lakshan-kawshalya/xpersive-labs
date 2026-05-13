"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Briefcase, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

/* ─── Types ─────────────────────────────────────────────────────────── */

interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  gradient: string;
  initials: string;
  social: SocialLink[];
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const team: TeamMember[] = [
  {
    name: "Lakshan Kawshalya",
    role: "Founder & Full-Stack Developer",
    bio: "Building immersive web experiences and scalable software from Colombo, Sri Lanka. Passionate about clean code, great design, and technology that makes a real difference.",
    gradient: "from-[#6D71F9] to-[#54C1FB]",
    initials: "LK",
    social: [
      { icon: Code2, href: "https://github.com/lakshan-kawshalya", label: "GitHub" },
      { icon: Briefcase, href: "https://www.linkedin.com/in/lakshan-kawshalya/", label: "LinkedIn" },
    ],
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function TeamPage() {
  return (
    <div className="bg-dark text-white">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <motion.div
          className="absolute -top-24 left-1/4 w-[440px] h-[440px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-0 w-[360px] h-[360px] rounded-full blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.22) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.14, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
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
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5"
            >
              The People
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7"
            >
              Meet the{" "}
              <span className="text-gradient">Team</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg sm:text-xl leading-relaxed"
            >
              A focused, solo-founder studio based in Colombo, Sri Lanka —
              with a global mindset and an uncompromising commitment to craft.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Team grid ───────────────────────────────────────────── */}
      <section className="py-10 pb-28 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {team.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </motion.div>

          <motion.p
            className="text-center text-white/30 text-sm mt-14 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Building thoughtfully, shipping with care, and growing one project at a time.
          </motion.p>
        </div>
      </section>

      {/* HIRING — uncomment when actively recruiting
      <section className="py-24 border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="relative rounded-2xl overflow-hidden p-12 sm:p-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(109,113,249,0.15) 0%, rgba(84,193,251,0.08) 50%, rgba(109,113,249,0.05) 100%)",
              }}
            />
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
            <motion.div
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(109,113,249,0.2) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="max-w-xl">
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                >
                  Join Our Team
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-white/55 leading-relaxed"
                >
                  We&apos;re always looking for talented designers, engineers, and
                  strategists who want to build meaningful products. If you care
                  about craft, ship with pride, and thrive in a tight-knit team —
                  we&apos;d love to hear from you.
                </motion.p>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href="mailto:hello@xpersivelabs.com"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                  style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
                >
                  Send Us Your Work
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/70 font-semibold text-sm transition-all duration-300 hover:border-primary/40 hover:text-white hover:bg-white/5"
                >
                  Get in Touch
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      */}
    </div>
  );
}

/* ─── MemberCard ─────────────────────────────────────────────────────── */

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative p-7 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-primary/25 transition-colors duration-300 flex flex-col items-center text-center w-full max-w-sm"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(109,113,249,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Avatar */}
      <div className="relative mb-6">
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold font-display shadow-lg transition-transform duration-300 group-hover:scale-105`}
          style={{
            boxShadow: "0 0 0 4px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {member.initials}
        </div>
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-dark" />
      </div>

      <h3 className="relative font-display text-lg font-bold mb-1 leading-tight">
        {member.name}
      </h3>
      <p className="relative text-xs font-semibold text-primary uppercase tracking-wider mb-4">
        {member.role}
      </p>
      <p className="relative text-white/50 text-sm leading-relaxed mb-6 flex-1">
        {member.bio}
      </p>

      <div className="relative flex items-center gap-2">
        {member.social.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 text-white/40 transition-all duration-200 hover:bg-primary/15 hover:border-primary/30 hover:text-primary"
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
