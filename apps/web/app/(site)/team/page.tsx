"use client";

import { useState } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useMotionSafe } from "@/hooks/useMotionSafe";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatar: string;
  social: { icon: React.ElementType; href: string; label: string }[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Lakshan Kawshalya",
    role: "Founder & Lead Developer",
    bio: "Building web applications, automation systems, and AI-powered tools for businesses in AU, UK, and US. Based in Colombo, Sri Lanka - shipping production-grade software since 2024.",
    initials: "LK",
    avatar: "/team/lakshan-kawshalya.png",
    social: [
      { icon: Code2, href: "https://github.com/lakshan-kawshalya", label: "GitHub" },
      { icon: Briefcase, href: "https://www.linkedin.com/in/lakshan-kawshalya/", label: "LinkedIn" },
    ],
  },
];

export default function TeamPage() {
  const { shouldAnimate } = useMotionSafe();

  const mountProps = shouldAnimate ? {
    variants: staggerContainer,
    initial: "hidden",
    animate: "visible",
  } : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <div className="bg-dark text-white">
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <motion.div
          className="absolute -top-24 left-1/4 w-110 h-110 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)" }}
          {...(shouldAnimate ? {
            animate: { scale: [1, 1.1, 1], x: [0, 20, 0] },
            transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const },
          } : {})}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps} className="max-w-3xl">
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase mb-5" style={{ letterSpacing: "0.14em" }}>
              Who We Are
            </motion.span>
            <motion.h1 {...childProps} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-7">
              The <span className="text-gradient">Studio</span>
            </motion.h1>
            <motion.p {...childProps} className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl">
              One developer, end-to-end. From the first call to production deployment, you work directly with the person writing the code - not an account manager, not a rotating team, not a handoff.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Studio quote */}
      <section className="pb-10 border-t border-white/[0.07]">
        <div className="max-w-3xl mx-auto px-6 pt-16">
          <motion.blockquote
            {...(shouldAnimate ? {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: "-80px" },
              transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] as const },
            } : { initial: false })}
            className="italic leading-relaxed pl-5"
            style={{
              borderLeft: "2px solid #6D71F9",
              fontSize: 18,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            A solo software studio in Colombo, Sri Lanka. Web development, automation, and AI workflows - built end-to-end by one senior developer, without the overhead of a large agency.
          </motion.blockquote>
        </div>
      </section>

      {/* Team cards */}
      <section className="py-16 pb-28 border-t border-white/[0.07]">
        <div className="max-w-xl mx-auto px-6">
          <motion.div
            {...(shouldAnimate ? {
              variants: fadeUp,
              initial: "hidden",
              whileInView: "visible" as const,
              viewport: { once: true, margin: "-80px" },
            } : { initial: false })}
          >
            <MemberCard member={teamMembers[0]} />
          </motion.div>
        </div>

        <motion.p
          className="text-center text-white/30 text-sm mt-14 max-w-lg mx-auto leading-relaxed px-6"
          {...(shouldAnimate ? {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.3 },
          } : { initial: false })}
        >
          Small on purpose. Every project gets full attention - not a junior dev and a Slack channel.
        </motion.p>

        <motion.div
          className="flex justify-center mt-8"
          {...(shouldAnimate ? {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.45 },
          } : { initial: false })}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
            style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
          >
            Start a Project <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const { shouldAnimate } = useMotionSafe();
  const [imgError, setImgError] = useState(false);

  const hoverProps = shouldAnimate ? {
    whileHover: { y: -8, boxShadow: "0 32px 80px rgba(109,113,249,0.18)" },
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  } : {};

  return (
    <motion.div
      {...hoverProps}
      className="group relative p-10 rounded-3xl border border-white/6 hover:border-primary/30 transition-colors duration-350 flex flex-col items-center text-center h-full"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(109,113,249,0.1) 0%, transparent 65%)" }} />

      {/* Avatar with hover ring */}
      <div className="relative mb-8">
        <div
          className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            border: "1.5px dashed rgba(109,113,249,0.5)",
            animation: "ring-rotate 8s linear infinite",
          }}
        />
        <div
          className="w-24 h-24 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
          style={{ boxShadow: "0 0 0 3px rgba(109,113,249,0.25), 0 8px 32px rgba(0,0,0,0.4)" }}
        >
          {member.avatar && !imgError ? (
            <Image src={member.avatar} alt={member.name} width={96} height={96} className="w-full h-full object-cover" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold font-display">
              {member.initials}
            </div>
          )}
        </div>
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-dark" />
      </div>

      <h2 className="relative font-display font-bold mb-1 text-white" style={{ fontSize: 28 }}>{member.name}</h2>
      <p className="relative text-gradient text-sm font-semibold uppercase tracking-wider mb-5">{member.role}</p>
      <p className="relative leading-relaxed mb-8 max-w-sm" style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>
        {member.bio}
      </p>

      {/* Social links */}
      <div className="relative flex items-center gap-4 mt-auto">
        {member.social.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 text-white/50 hover:text-primary"
          >
            <Icon size={14} />
            <span>{label}</span>
            <ExternalLink size={11} className="opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
