"use client";

import { useMotionSafe } from "@/hooks/useMotionSafe";
import { fadeUp, staggerContainer } from "@/lib/animations";
import * as Select from "@radix-ui/react-select";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  MapPin,
  Send,
} from "lucide-react";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import EnvelopeCheckIllustration from "@/components/illustrations/EnvelopeCheckIllustration";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

type ServiceOption =
  | "Web Application Development"
  | "Ecommerce Development"
  | "Automation & Data Pipelines"
  | "AI Workflow Integration"
  | "Other / General Inquiry";

type BudgetOption =
  | "Under $5,000"
  | "$5,000 – $15,000"
  | "$15,000 – $30,000"
  | "$30,000+"
  | "Not sure yet";

interface FormValues {
  name: string;
  email: string;
  company: string;
  service: ServiceOption | "";
  budget: BudgetOption | "";
  message: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

const serviceOptions: ServiceOption[] = [
  "Web Application Development",
  "Ecommerce Development",
  "Automation & Data Pipelines",
  "AI Workflow Integration",
  "Other / General Inquiry",
];

const budgetOptions: BudgetOption[] = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000+",
  "Not sure yet",
];

const nextSteps = [
  { num: "01", text: "We review your message" },
  { num: "02", text: "We schedule a discovery call" },
  { num: "03", text: "We send you a project proposal" },
];

const trustStats = [
  "48h response",
  "30-day post-launch support",
  "AU/UK/US clients",
];

/* ─── Floating label input ──────────────────────────────────────────── */
function FloatingField({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-danger flex items-center gap-1 mt-0.5">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const underlineInput = (hasError: boolean) =>
  [
    "w-full bg-transparent pb-2.5 pt-1 text-sm text-white outline-none",
    "border-b transition-colors duration-200 placeholder-white/20",
    hasError
      ? "border-danger/50 focus:border-danger"
      : "border-white/10 focus:border-primary",
  ].join(" ");

/* ─── Inner page (reads search params) ─────────────────────────────── */
function ContactPageContent() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [copied, setCopied] = useState(false);
  const { shouldAnimate } = useMotionSafe();

  const {
    register,
    control,
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
          from_name: stripHtml(data.name),
          from_email: data.email,
          company: stripHtml(data.company) || "-",
          service: data.service || "Not specified",
          budget: data.budget || "Not specified",
          message: stripHtml(data.message),
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@xpersivelabs.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mountProps = shouldAnimate
    ? { variants: staggerContainer, initial: "hidden", animate: "visible" }
    : { initial: false };

  const scrollProps = shouldAnimate
    ? {
        variants: staggerContainer,
        initial: "hidden",
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      }
    : { initial: false };

  const childProps = shouldAnimate ? { variants: fadeUp } : { initial: false };

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 text-center">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps} className="mx-auto max-w-3xl">
            <motion.span
              {...childProps}
              className="inline-block text-primary text-xs font-bold uppercase mb-5"
              style={{ letterSpacing: "0.14em" }}
            >
              Get in Touch
            </motion.span>
            <motion.h1
              {...childProps}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              Let&apos;s Talk About{" "}
              <span className="text-gradient">Your Project</span>
            </motion.h1>
            <motion.p
              {...childProps}
              className="mx-auto max-w-xl leading-relaxed"
              style={{ fontSize: 17, color: "rgba(255,255,255,0.55)" }}
            >
              No commitment. No sales pitch. Just an honest conversation about
              what you need and whether we&apos;re the right fit.
            </motion.p>
            <motion.div
              {...childProps}
              className="flex flex-wrap items-center justify-center gap-3 mt-8"
            >
              {trustStats.map((stat) => (
                <span
                  key={stat}
                  className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10"
                  style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.6)" }}
                >
                  {stat}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Two-column body */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 xl:gap-20 items-start">
            {/* LEFT - Form */}
            <motion.div {...scrollProps}>
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <SuccessBanner
                    key="success"
                    onReset={() => setSubmitState("idle")}
                  />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="space-y-8"
                    {...(shouldAnimate
                      ? {
                          variants: staggerContainer,
                          initial: "hidden",
                          animate: "visible",
                          exit: { opacity: 0 },
                        }
                      : { initial: false })}
                  >
                    {submitState === "error" && (
                      <motion.div
                        {...(shouldAnimate
                          ? {
                              initial: { opacity: 0, y: -8 },
                              animate: { opacity: 1, y: 0 },
                            }
                          : { initial: false })}
                        className="flex items-start gap-3 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm"
                      >
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span>
                          Something went wrong. Email us directly at{" "}
                          <a
                            href="mailto:hello@xpersivelabs.com"
                            className="underline"
                          >
                            hello@xpersivelabs.com
                          </a>
                        </span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <motion.div {...childProps}>
                        <FloatingField
                          id="name"
                          label="Your Name"
                          required
                          error={errors.name?.message}
                        >
                          <input
                            id="name"
                            type="text"
                            placeholder="Jane Smith"
                            className={underlineInput(!!errors.name)}
                            {...register("name", {
                              required: "Name is required",
                              minLength: {
                                value: 2,
                                message: "At least 2 characters",
                              },
                              validate: (v) =>
                                v.trim().length >= 2 ||
                                "Name cannot be blank",
                            })}
                          />
                        </FloatingField>
                      </motion.div>
                      <motion.div {...childProps}>
                        <FloatingField
                          id="email"
                          label="Email Address"
                          required
                          error={errors.email?.message}
                        >
                          <input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            className={underlineInput(!!errors.email)}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                              },
                            })}
                          />
                        </FloatingField>
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      <motion.div {...childProps}>
                        <FloatingField id="company" label="Company (optional)">
                          <input
                            id="company"
                            type="text"
                            placeholder="Acme Inc."
                            className={underlineInput(false)}
                            {...register("company")}
                          />
                        </FloatingField>
                      </motion.div>
                      <motion.div {...childProps}>
                        <FloatingField
                          id="service"
                          label="Service Interest"
                          required
                          error={errors.service?.message}
                        >
                          <Controller
                            name="service"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Please select a service" }}
                            render={({ field }) => (
                              <Select.Root
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <Select.Trigger
                                  id="service"
                                  onBlur={field.onBlur}
                                  className={`${underlineInput(!!errors.service)} flex items-center justify-between gap-2 text-left outline-none focus-visible:border-primary data-placeholder:text-white/20`}
                                >
                                  <Select.Value placeholder="Select a service…" />
                                  <Select.Icon>
                                    <ChevronDown
                                      size={14}
                                      className="text-white/30"
                                    />
                                  </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                  <Select.Content
                                    position="popper"
                                    sideOffset={8}
                                    className="z-60 overflow-hidden rounded-xl border border-white/10 shadow-xl"
                                    style={{ background: "#12122A" }}
                                  >
                                    <Select.Viewport className="p-1">
                                      {serviceOptions.map((s) => (
                                        <Select.Item
                                          key={s}
                                          value={s}
                                          className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-white outline-none data-highlighted:bg-primary/15 data-highlighted:text-primary data-[state=checked]:text-primary"
                                        >
                                          <Select.ItemText>
                                            {s}
                                          </Select.ItemText>
                                        </Select.Item>
                                      ))}
                                    </Select.Viewport>
                                  </Select.Content>
                                </Select.Portal>
                              </Select.Root>
                            )}
                          />
                        </FloatingField>
                      </motion.div>
                      <motion.div {...childProps}>
                        <FloatingField
                          id="budget"
                          label="Budget Range (optional)"
                          error={errors.budget?.message}
                        >
                          <Controller
                            name="budget"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Select.Root
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <Select.Trigger
                                  id="budget"
                                  onBlur={field.onBlur}
                                  className={`${underlineInput(!!errors.budget)} flex items-center justify-between gap-2 text-left outline-none focus-visible:border-primary data-placeholder:text-white/20`}
                                >
                                  <Select.Value placeholder="Select a range…" />
                                  <Select.Icon>
                                    <ChevronDown
                                      size={14}
                                      className="text-white/30"
                                    />
                                  </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                  <Select.Content
                                    position="popper"
                                    sideOffset={8}
                                    className="z-60 overflow-hidden rounded-xl border border-white/10 shadow-xl"
                                    style={{ background: "#12122A" }}
                                  >
                                    <Select.Viewport className="p-1">
                                      {budgetOptions.map((b) => (
                                        <Select.Item
                                          key={b}
                                          value={b}
                                          className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-white outline-none data-highlighted:bg-primary/15 data-highlighted:text-primary data-[state=checked]:text-primary"
                                        >
                                          <Select.ItemText>
                                            {b}
                                          </Select.ItemText>
                                        </Select.Item>
                                      ))}
                                    </Select.Viewport>
                                  </Select.Content>
                                </Select.Portal>
                              </Select.Root>
                            )}
                          />
                        </FloatingField>
                      </motion.div>
                    </div>

                    <motion.div {...childProps}>
                      <FloatingField
                        id="message"
                        label="Tell Us About Your Project"
                        required
                        error={errors.message?.message}
                      >
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="What are you building? Timeline, requirements, goals…"
                          className={`${underlineInput(!!errors.message)} resize-none`}
                          {...register("message", {
                            required: "Message is required",
                            minLength: {
                              value: 20,
                              message:
                                "Please add a bit more detail (20+ chars)",
                            },
                          })}
                        />
                      </FloatingField>
                    </motion.div>

                    <motion.div {...childProps}>
                      <button
                        type="submit"
                        disabled={submitState === "loading"}
                        className="group w-full inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                        style={{
                          background:
                            "linear-gradient(135deg, #6D71F9, #54C1FB)",
                        }}
                      >
                        {submitState === "loading" ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send
                              size={16}
                              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                            />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT - Trust signals */}
            <motion.div
              className="flex flex-col gap-4 lg:sticky lg:top-28"
              {...scrollProps}
            >
              <motion.div {...childProps}>
                <EnvelopeCheckIllustration className="w-10 h-10 mb-1" />
              </motion.div>

              {/* Availability */}
              <motion.div
                {...childProps}
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(16,185,129,0.05)",
                  border: "1px solid rgba(16,185,129,0.15)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-400"
                    style={{
                      animation: "badge-pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span className="text-sm font-semibold text-emerald-400">
                    Currently available
                  </span>
                </div>
                <p
                  className="text-xs ml-4"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Taking on new projects now
                </p>
              </motion.div>

              {/* Response time */}
              <motion.div
                {...childProps}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06]"
                style={{ background: "var(--surface-card)" }}
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">
                    We respond within 48 hours
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Usually much faster.
                  </p>
                </div>
              </motion.div>

              {/* Fix guarantee */}
              <motion.div
                {...childProps}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06]"
                style={{ background: "var(--surface-card)" }}
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">
                    30-day post-launch support
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    We stay on for 30 days after every launch to catch and
                    fix anything that surfaces in production.
                  </p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                {...childProps}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06]"
                style={{ background: "var(--surface-card)" }}
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">
                    Colombo, Sri Lanka
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Working remotely with businesses in AU, UK, and US.
                  </p>
                </div>
              </motion.div>

              {/* What happens next */}
              <motion.div
                {...childProps}
                className="p-5 rounded-2xl border border-white/[0.06]"
                style={{ background: "var(--surface-card)" }}
              >
                <p
                  className="text-xs font-bold uppercase mb-4"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.12em",
                  }}
                >
                  What happens next
                </p>
                <div className="space-y-3">
                  {nextSteps.map(({ num, text }) => (
                    <div key={num} className="flex items-center gap-3">
                      <span
                        className="shrink-0 font-display font-bold text-xs"
                        style={{ color: "#6D71F9" }}
                      >
                        {num}
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{ background: "rgba(109,113,249,0.15)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Direct email */}
              <motion.div
                {...childProps}
                className="p-5 rounded-2xl border border-white/[0.06]"
                style={{ background: "var(--surface-card)" }}
              >
                <p
                  className="text-xs mb-2"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Prefer email?
                </p>
                <button
                  onClick={copyEmail}
                  className="group flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-primary"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  <span>hello@xpersivelabs.com</span>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        {...(shouldAnimate
                          ? {
                              initial: { opacity: 0, scale: 0.8 },
                              animate: { opacity: 1, scale: 1 },
                              exit: { opacity: 0 },
                            }
                          : { initial: false })}
                        className="text-xs text-emerald-400 font-semibold"
                      >
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        {...(shouldAnimate
                          ? {
                              initial: { opacity: 0 },
                              animate: { opacity: 1 },
                              exit: { opacity: 0 },
                            }
                          : { initial: false })}
                        className="text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        click to copy
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageContent />
    </Suspense>
  );
}

function SuccessBanner({ onReset }: { onReset: () => void }) {
  const { shouldAnimate } = useMotionSafe();
  return (
    <motion.div
      {...(shouldAnimate
        ? {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
          }
        : { initial: false })}
      className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 gap-5"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
        <CheckCircle2 size={32} className="text-emerald-400" />
      </div>
      <div>
        <h3 className="font-display text-2xl font-bold mb-2">Message sent!</h3>
        <p
          className="text-sm leading-relaxed max-w-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          We&apos;ll review your message and get back to you within 48 hours.
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
