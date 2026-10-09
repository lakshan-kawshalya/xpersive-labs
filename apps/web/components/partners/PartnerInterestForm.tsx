"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useTurnstile } from "@/hooks/useTurnstile";
import { PARTNER_FORM_OPTIONS } from "@/lib/partnerContent";

type SubmitState = "idle" | "loading" | "success" | "error";

const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const RATE_LIMITED_STATUS = 429;

const FIELD_CLASSES =
  "w-full rounded-xl border border-primary/10 bg-[rgba(109,113,249,0.03)] px-4 py-3.5 text-base text-text-primary outline-none transition-all placeholder:text-text-muted focus:border-primary focus:bg-bg-card focus:ring-2 focus:ring-primary/15";

const GRADIENT_BUTTON =
  "inline-flex items-center justify-center gap-3 rounded-full bg-gradient-brand px-10 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(109,113,249,0.3)] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:w-fit";

function readText(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

function Field({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
        {optional && <span className="font-normal text-text-secondary"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default function PartnerInterestForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const { isEnabled, token, containerRef, markScriptReady, reset } = useTurnstile();

  useEffect(() => {
    if (submitState === "success") statusRef.current?.focus();
  }, [submitState]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitState("loading");
    try {
      const response = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: readText(data, "name"),
          business: readText(data, "business"),
          email: readText(data, "email"),
          phone: readText(data, "phone"),
          option: readText(data, "option"),
          message: readText(data, "message"),
          consent: data.get("consent") === "on",
          website: readText(data, "website"),
          turnstileToken: token ?? "",
        }),
      });

      if (!response.ok) {
        setErrorMessage(
          response.status === RATE_LIMITED_STATUS
            ? "Too many attempts. Please try again in a few minutes."
            : "Something went wrong. Please check your details and try again, or email hello@xpersivelabs.com.",
        );
        setSubmitState("error");
        reset();
        return;
      }

      form.reset();
      reset();
      setSubmitState("success");
    } catch {
      setErrorMessage("Something went wrong. Please try again, or email hello@xpersivelabs.com.");
      setSubmitState("error");
      reset();
    }
  }

  if (submitState === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center gap-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-16 text-center focus:outline-none"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 size={32} className="text-emerald-600" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-bold text-text-primary">Thank you. We have your details.</h3>
        <p className="text-base leading-relaxed text-text-secondary">
          We will be in touch about the partner program.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Send another response
        </button>
      </div>
    );
  }

  const isSubmitDisabled = submitState === "loading" || (isEnabled && !token);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-6 rounded-3xl border border-primary/10 bg-bg-card p-8 md:p-12"
      style={{ boxShadow: "0 12px 44px -8px rgba(23,24,55,0.08)" }}
    >
      {submitState === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger/20 bg-danger/10 p-4 text-sm text-danger"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="partner-name" label="Your name">
          <input
            id="partner-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={200}
            autoComplete="name"
            className={FIELD_CLASSES}
          />
        </Field>
        <Field id="partner-business" label="Business or agency name">
          <input
            id="partner-business"
            name="business"
            type="text"
            required
            minLength={2}
            maxLength={200}
            autoComplete="organization"
            className={FIELD_CLASSES}
          />
        </Field>
        <Field id="partner-email" label="Email">
          <input
            id="partner-email"
            name="email"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            className={FIELD_CLASSES}
          />
        </Field>
        <Field id="partner-phone" label="Phone or WhatsApp">
          <input
            id="partner-phone"
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={25}
            autoComplete="tel"
            className={FIELD_CLASSES}
          />
        </Field>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Which option are you interested in?
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PARTNER_FORM_OPTIONS.map(({ value, label }, index) => (
            <label key={value} className="relative cursor-pointer">
              <input
                type="radio"
                name="option"
                value={value}
                required
                defaultChecked={index === PARTNER_FORM_OPTIONS.length - 1}
                className="peer sr-only"
              />
              <span className="flex min-h-12 items-center justify-center rounded-xl border border-primary/10 bg-[rgba(109,113,249,0.03)] px-4 py-3 text-base font-semibold text-text-primary transition-all duration-200 hover:border-primary/30 peer-checked:border-transparent peer-checked:bg-gradient-brand peer-checked:text-white peer-checked:shadow-[0_8px_24px_rgba(109,113,249,0.3)] peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 motion-reduce:transition-none">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="partner-message" label="Message" optional>
        <textarea
          id="partner-message"
          name="message"
          rows={4}
          maxLength={2000}
          className={FIELD_CLASSES}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary"
        />
        <span className="text-base leading-relaxed text-text-primary">
          I agree to be contacted about the partner program
        </span>
      </label>

      {isEnabled && <div ref={containerRef} />}

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={GRADIENT_BUTTON}
      >
        {submitState === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Register your interest"
        )}
      </button>

      <p className="text-sm leading-relaxed text-text-secondary">
        We use your details only to contact you about the partner program. Read our{" "}
        <Link href="/privacy-policy" className="font-semibold text-primary underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      {isEnabled && (
        <Script src={TURNSTILE_SCRIPT_SRC} strategy="lazyOnload" onReady={markScriptReady} />
      )}
    </form>
  );
}
