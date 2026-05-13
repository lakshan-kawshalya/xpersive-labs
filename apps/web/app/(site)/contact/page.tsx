"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Code2,
  Briefcase,
  Share2,
  ChevronDown,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const EMAILJS_SERVICE_ID = "service_cq58rg3";
const EMAILJS_TEMPLATE_ID = "template_ttq7fzc";
const EMAILJS_PUBLIC_KEY = "k-RM945un6WuOh_AP";

/* ─── Types ─────────────────────────────────────────────────────────── */

type ServiceOption =
  | "Web Development"
  | "UI/UX Design"
  | "Automation & Web Scraping"
  | "Other / General Inquiry";

interface FormValues {
  name: string;
  email: string;
  company: string;
  service: ServiceOption | "";
  message: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

/* ─── Static data ────────────────────────────────────────────────────── */

const serviceOptions: ServiceOption[] = [
  "Web Development",
  "UI/UX Design",
  "Automation & Web Scraping",
  "Other / General Inquiry",
];

const infoCards = [
  {
    icon: MapPin,
    label: "Location",
    value: "Colombo, Sri Lanka",
    sub: "Available for remote projects worldwide",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@xpersivelabs.com",
    sub: "Drop us a line any time",
    color: "text-accent",
    bg: "bg-accent/10",
    href: "mailto:hello@xpersivelabs.com",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 48 hours",
    sub: "We take every enquiry seriously",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const socialLinks = [
  { icon: Code2, href: "https://github.com/Xpersive-Labs", label: "GitHub" },
  { icon: Briefcase, href: "https://www.linkedin.com/in/xpersive-labs/", label: "LinkedIn" },
  { icon: Share2, href: "#", label: "Twitter / X" /* TODO: add when Twitter/X account is created */ },
];

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onTouched" });

  const onSubmit = async (data: FormValues) => {
    setSubmitState("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          company: data.company || "—",
          service: data.service || "Not specified",
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <motion.div
          className="absolute -top-28 -right-20 w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-20 w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(84,193,251,0.22) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
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
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.span
              variants={fadeUp}
              className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-5"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 max-w-3xl"
            >
              Let&apos;s Build Something{" "}
              <span className="text-gradient">Together</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg leading-relaxed max-w-xl"
            >
              Tell us about your project. We read every message and reply within
              48 hours — no automated responses, just real conversation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Two-column body ─────────────────────────────────────── */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 xl:gap-16 items-start">
            {/* ── LEFT: Form ───────────────────────────────────── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <SuccessBanner key="success" onReset={() => setSubmitState("idle")} />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {submitState === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                      >
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <span>
                          Something went wrong. Please try again or email us directly at{" "}
                          <a href="mailto:hello@xpersivelabs.com" className="underline">
                            hello@xpersivelabs.com
                          </a>
                        </span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={fadeUp}>
                        <Field label="Name" required error={errors.name?.message}>
                          <input
                            type="text"
                            placeholder="Your name"
                            className={inputClass(!!errors.name)}
                            {...register("name", {
                              required: "Name is required",
                              minLength: { value: 2, message: "At least 2 characters" },
                            })}
                          />
                        </Field>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <Field label="Email" required error={errors.email?.message}>
                          <input
                            type="email"
                            placeholder="you@company.com"
                            className={inputClass(!!errors.email)}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                              },
                            })}
                          />
                        </Field>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={fadeUp}>
                        <Field label="Company" hint="optional">
                          <input
                            type="text"
                            placeholder="Acme Inc."
                            className={inputClass(false)}
                            {...register("company")}
                          />
                        </Field>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <Field label="Service Interest">
                          <div className="relative">
                            <select
                              className={`${inputClass(false)} appearance-none pr-10`}
                              {...register("service")}
                              defaultValue=""
                            >
                              <option value="" disabled>Select a service…</option>
                              {serviceOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                            />
                          </div>
                        </Field>
                      </motion.div>
                    </div>

                    <motion.div variants={fadeUp}>
                      <Field label="Message" required error={errors.message?.message}>
                        <textarea
                          rows={6}
                          placeholder="Tell us about your project — what you're building, your timeline, and any specific requirements…"
                          className={`${inputClass(!!errors.message)} resize-none`}
                          {...register("message", {
                            required: "Message is required",
                            minLength: {
                              value: 20,
                              message: "Please give us a bit more detail (20+ characters)",
                            },
                          })}
                        />
                      </Field>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <button
                        type="submit"
                        disabled={submitState === "loading"}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
                      >
                        {submitState === "loading" ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send
                              size={16}
                              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                            />
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── RIGHT: Info cards + social ───────────────────── */}
            <motion.div
              className="flex flex-col gap-4 lg:sticky lg:top-28"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {infoCards.map((card) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  className="group p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <card.icon size={18} className={card.color} />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-1">
                        {card.label}
                      </p>
                      {card.href ? (
                        <a href={card.href} className={`font-semibold ${card.color} hover:underline`}>
                          {card.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-white">{card.value}</p>
                      )}
                      <p className="text-xs text-white/35 mt-1">{card.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                variants={fadeUp}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-white/40 transition-all duration-200 hover:bg-primary/15 hover:border-primary/30 hover:text-primary"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <p className="text-sm text-emerald-400 font-medium">
                  Currently accepting new projects
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-white/80">
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs text-white/25 font-medium">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1.5 mt-0.5">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25",
    "bg-white/[0.04] border transition-all duration-200 outline-none",
    "focus:bg-white/[0.06] focus:border-primary/50 focus:ring-2 focus:ring-primary/15",
    hasError
      ? "border-rose-500/40 bg-rose-500/5"
      : "border-white/10 hover:border-white/20",
  ].join(" ");
}

function SuccessBanner({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 gap-5"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
        <CheckCircle2 size={32} className="text-emerald-400" />
      </div>
      <div>
        <h3 className="font-display text-2xl font-bold mb-2">Message sent!</h3>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
          Thanks for reaching out. We&apos;ll review your message and get back
          to you within 48 hours.
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-sm font-semibold text-primary hover:underline"
      >
        Send another message
      </button>
    </motion.div>
  );
}
