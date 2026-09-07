"use client";

import { useMotionSafe } from "@/hooks/useMotionSafe";
import { fadeUp, staggerContainer } from "@/lib/animations";
import * as Select from "@radix-ui/react-select";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CodeEditorIllustration from "@/components/illustrations/CodeEditorIllustration";
import { WhatsAppIcon } from "@/components/layout/WhatsAppWidget";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

type ServiceOption =
  | "Website Development"
  | "Mobile Application Development"
  | "Software Development"
  | "Automation Development"
  | "UI/UX Development"
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
  "Website Development",
  "Mobile Application Development",
  "Software Development",
  "Automation Development",
  "UI/UX Development",
  "Other / General Inquiry",
];

const budgetOptions: BudgetOption[] = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000+",
  "Not sure yet",
];

const connectOptions = [
  {
    label: "Email",
    icon: Mail,
    description: "Tell us about your project and we'll get back to you.",
    cta: "Contact us",
    href: "mailto:hello@xpersivelabs.com",
    external: false,
  },
  {
    label: "WhatsApp",
    icon: WhatsAppIcon,
    description: "Prefer a quick conversation? Chat with us directly on WhatsApp.",
    cta: "Chat on WhatsApp",
    href: buildWhatsAppUrl("Hi Xpersive Labs! I'd like to discuss a project."),
    external: true,
  },
  {
    label: "LinkedIn",
    icon: null,
    description: "Connect with Xpersive Labs and stay up to date with what we're building.",
    cta: "Visit LinkedIn",
    href: "https://www.linkedin.com/in/xpersive-labs/",
    external: true,
  },
];

const nextSteps = [
  { num: "01", text: "We review your inquiry." },
  { num: "02", text: "We get back to you with any questions or next steps." },
  { num: "03", text: "We discuss the right approach for your project." },
  { num: "04", text: "If we're a good fit, we start building." },
];

/* ─── Floating label field ──────────────────────────────────────────── */
function FormField({
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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label}
        {required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-danger flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const boxedInput = (hasError: boolean) =>
  [
    "w-full px-4 py-3.5 rounded-xl border bg-[rgba(109,113,249,0.03)] text-text-primary placeholder:text-text-muted text-sm outline-none transition-all",
    hasError
      ? "border-danger/50 focus:border-danger"
      : "border-border-subtle focus:border-primary focus:bg-bg-card focus:ring-2 focus:ring-primary/15",
  ].join(" ");

/* ─── Inner page (form logic) ───────────────────────────────────────── */
function ContactPageContent() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
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

  const ambientProps = shouldAnimate ? {
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
  } : {};

  return (
    <div className="text-text-primary min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(109,113,249,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div {...mountProps} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              <motion.span {...childProps} className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.2em] bg-[rgba(109,113,249,0.08)] px-4 py-1.5 rounded-full">
                Get in Touch
              </motion.span>
              <motion.h1 {...childProps} className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-text-primary">
                Let&apos;s build something that matters.
              </motion.h1>
              <motion.p {...childProps} className="text-text-secondary text-lg leading-relaxed max-w-xl">
                Have a project, an idea, or a problem that needs solving? Tell us what you&apos;re working on. We&apos;ll get back to you and figure out the best way forward.
              </motion.p>
              <motion.div {...childProps} className="pt-1">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-2.5 px-8 py-[14px] rounded-full font-semibold text-base text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
                >
                  Start a Conversation
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </motion.div>
            </div>

            <motion.div {...childProps} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md rounded-2xl bg-bg-card border border-border-subtle p-2" style={{ boxShadow: "0 12px 44px -8px rgba(23,24,55,0.09)" }}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center bg-[rgba(109,113,249,0.04)]">
                  <CodeEditorIllustration className="w-4/5" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-medium text-primary bg-bg-card/90 backdrop-blur-md px-3 py-1 rounded-full">
                    Xpersive // Colombo HQ Studio
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="bg-bg-card/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-medium text-text-primary">Accepting select client projects</span>
                    </div>
                    <span className="hidden sm:flex text-[10px] font-mono text-white bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">GMT+5:30</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Choose how to connect ────────────────────────────────────── */}
      <section className="py-16 bg-[rgba(109,113,249,0.035)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 {...(shouldAnimate ? { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } } : { initial: false })} className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-10">
            Choose how you&apos;d like to connect.
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...scrollProps}>
            {connectOptions.map((option) => (
              <motion.div
                key={option.label}
                {...childProps}
                {...(shouldAnimate ? { whileHover: { y: -4, boxShadow: "0 16px 36px rgba(109,113,249,0.14)" }, transition: { type: "spring", stiffness: 220, damping: 24 } } : {})}
                className="bg-bg-card rounded-2xl p-8 border border-border-subtle transition-colors duration-300 hover:border-primary/30 flex flex-col justify-between"
                style={{ boxShadow: "0 2px 12px rgba(23,24,55,0.04)" }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary">
                      {option.icon ? <option.icon size={16} /> : <FontAwesomeIcon icon={faLinkedin} style={{ width: 16, height: 16 }} />}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{option.label}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{option.description}</p>
                </div>
                <a
                  href={option.href}
                  {...(option.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  {option.cta}
                  <ArrowRight size={14} className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────────── */}
      <section className="py-24" id="contact-form">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="mb-10" {...scrollProps}>
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Start a Project</motion.span>
            <motion.h2 {...childProps} className="font-display text-3xl sm:text-5xl font-bold text-text-primary tracking-tight mb-4">Tell us what you&apos;re building.</motion.h2>
            <motion.p {...childProps} className="text-text-secondary text-lg leading-relaxed">A few details are enough to get the conversation started. You don&apos;t need to have everything figured out yet.</motion.p>
          </motion.div>

          <motion.div {...scrollProps} className="bg-bg-card rounded-3xl p-8 md:p-12 border border-border-subtle" style={{ boxShadow: "0 12px 44px -8px rgba(23,24,55,0.08)" }}>
            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(37,211,102,0.06)] border border-[rgba(37,211,102,0.2)]">
                <WhatsAppIcon size={20} color="#25D366" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">Prefer WhatsApp?</p>
                  <p className="text-xs text-text-secondary">Message us directly — we reply within a few hours.</p>
                </div>
                <a
                  href={buildWhatsAppUrl("Hi Xpersive Labs! I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white transition-all"
                  style={{ background: "#25D366" }}
                >
                  Open WhatsApp
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <SuccessBanner key="success" onReset={() => setSubmitState("idle")} />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-7"
                  {...(shouldAnimate ? { variants: staggerContainer, initial: "hidden", animate: "visible", exit: { opacity: 0 } } : { initial: false })}
                >
                  {submitState === "error" && (
                    <motion.div
                      {...(shouldAnimate ? { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 } } : { initial: false })}
                      className="flex items-start gap-3 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm"
                    >
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>
                        Something went wrong. Email us directly at{" "}
                        <a href="mailto:hello@xpersivelabs.com" className="underline">hello@xpersivelabs.com</a>
                      </span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div {...childProps}>
                      <FormField id="name" label="Full Name" required error={errors.name?.message}>
                        <input
                          id="name"
                          type="text"
                          placeholder="Alex Morgan"
                          className={boxedInput(!!errors.name)}
                          {...register("name", {
                            required: "Name is required",
                            minLength: { value: 2, message: "At least 2 characters" },
                            validate: (v) => v.trim().length >= 2 || "Name cannot be blank",
                          })}
                        />
                      </FormField>
                    </motion.div>
                    <motion.div {...childProps}>
                      <FormField id="email" label="Email Address" required error={errors.email?.message}>
                        <input
                          id="email"
                          type="email"
                          placeholder="alex@company.com"
                          className={boxedInput(!!errors.email)}
                          {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                          })}
                        />
                      </FormField>
                    </motion.div>
                  </div>

                  <motion.div {...childProps}>
                    <FormField id="company" label="Company / Organisation">
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Studio / Self"
                        className={boxedInput(false)}
                        {...register("company")}
                      />
                    </FormField>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div {...childProps}>
                      <FormField id="service" label="What do you need help with?" required error={errors.service?.message}>
                        <Controller
                          name="service"
                          control={control}
                          defaultValue=""
                          rules={{ required: "Please select a service" }}
                          render={({ field }) => (
                            <Select.Root value={field.value} onValueChange={field.onChange}>
                              <Select.Trigger
                                id="service"
                                onBlur={field.onBlur}
                                className={`${boxedInput(!!errors.service)} flex items-center justify-between gap-2 text-left data-placeholder:text-text-muted`}
                              >
                                <Select.Value placeholder="Select a capability" />
                                <Select.Icon>
                                  <ChevronDown size={14} className="text-text-muted" />
                                </Select.Icon>
                              </Select.Trigger>
                              <Select.Portal>
                                <Select.Content position="popper" sideOffset={8} className="z-60 overflow-hidden rounded-xl border border-border-subtle shadow-xl" style={{ background: "#ffffff" }}>
                                  <Select.Viewport className="p-1">
                                    {serviceOptions.map((s) => (
                                      <Select.Item key={s} value={s} className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none data-highlighted:bg-primary/15 data-highlighted:text-primary data-[state=checked]:text-primary">
                                        <Select.ItemText>{s}</Select.ItemText>
                                      </Select.Item>
                                    ))}
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                          )}
                        />
                      </FormField>
                    </motion.div>
                    <motion.div {...childProps}>
                      <FormField id="budget" label="Project Budget" error={errors.budget?.message}>
                        <Controller
                          name="budget"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Select.Root value={field.value} onValueChange={field.onChange}>
                              <Select.Trigger
                                id="budget"
                                onBlur={field.onBlur}
                                className={`${boxedInput(!!errors.budget)} flex items-center justify-between gap-2 text-left data-placeholder:text-text-muted`}
                              >
                                <Select.Value placeholder="Estimated range" />
                                <Select.Icon>
                                  <ChevronDown size={14} className="text-text-muted" />
                                </Select.Icon>
                              </Select.Trigger>
                              <Select.Portal>
                                <Select.Content position="popper" sideOffset={8} className="z-60 overflow-hidden rounded-xl border border-border-subtle shadow-xl" style={{ background: "#ffffff" }}>
                                  <Select.Viewport className="p-1">
                                    {budgetOptions.map((b) => (
                                      <Select.Item key={b} value={b} className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none data-highlighted:bg-primary/15 data-highlighted:text-primary data-[state=checked]:text-primary">
                                        <Select.ItemText>{b}</Select.ItemText>
                                      </Select.Item>
                                    ))}
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                          )}
                        />
                      </FormField>
                    </motion.div>
                  </div>

                  <motion.div {...childProps}>
                    <FormField id="message" label="Tell us about your project" required error={errors.message?.message}>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your idea, the problem you're trying to solve, or what you'd like us to build…"
                        className={`${boxedInput(!!errors.message)} resize-none min-h-[140px]`}
                        {...register("message", {
                          required: "Message is required",
                          minLength: { value: 20, message: "Please add a bit more detail (20+ chars)" },
                        })}
                      />
                    </FormField>
                  </motion.div>

                  <motion.div {...childProps} className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-semibold text-white text-base transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
                    >
                      {submitState === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-text-muted">We&apos;ll only use your information to respond to your inquiry.</p>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── What happens next ─────────────────────────────────────────── */}
      <section className="py-24 bg-[rgba(109,113,249,0.035)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="mb-12" {...scrollProps}>
            <motion.span {...childProps} className="inline-block text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">Process</motion.span>
            <motion.h2 {...childProps} className="font-display text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">What happens next</motion.h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" {...scrollProps}>
            {nextSteps.map((step) => (
              <motion.div
                key={step.num}
                {...childProps}
                {...(shouldAnimate ? { whileHover: { y: -4, boxShadow: "0 16px 36px rgba(109,113,249,0.14)" }, transition: { type: "spring", stiffness: 220, damping: 24 } } : {})}
                className="p-8 rounded-2xl bg-bg-card border border-border-subtle transition-colors duration-300 hover:border-primary/30"
                style={{ boxShadow: "0 2px 12px rgba(23,24,55,0.04)" }}
              >
                <div className="font-mono text-sm font-bold text-primary mb-3">{step.num}</div>
                <p className="text-text-primary font-medium leading-snug">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Closing brand statement ───────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="relative overflow-hidden rounded-3xl p-12 sm:p-20 text-center flex flex-col items-center border border-border-subtle"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
            {...scrollProps}
          >
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
              <motion.h2 {...childProps} className="font-display font-extrabold leading-[1.1] mb-4 text-text-primary" style={{ fontSize: "clamp(28px, 4.5vw, 40px)" }}>
                Good software starts with a good conversation.
              </motion.h2>
              <motion.p {...childProps} className="text-lg leading-relaxed mb-8 max-w-xl text-text-secondary">
                You don&apos;t need a perfect brief. Just tell us what you&apos;re trying to achieve.
              </motion.p>
              <motion.div {...childProps}>
                <a
                  href="#contact-form"
                  className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)", boxShadow: "0 8px 24px rgba(109,113,249,0.3)" }}
                >
                  Let&apos;s Talk
                  <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </motion.div>
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
        <p className="text-sm leading-relaxed max-w-sm text-text-secondary">
          We&apos;ll review your message and get back to you within 48 hours.
        </p>
      </div>
      <button onClick={onReset} className="text-sm font-semibold text-primary hover:underline">
        Send another message
      </button>
    </motion.div>
  );
}
