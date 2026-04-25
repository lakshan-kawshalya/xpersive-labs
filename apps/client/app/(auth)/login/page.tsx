"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, CheckCircle } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function ClientLoginPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailForm) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmittedEmail(data.email);
      setSubmitted(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden px-6">
      {/* Background glow orbs */}
      <div className="absolute -top-60 -right-60 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo / branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-2xl font-display">X</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            Client Portal
          </h1>
          <p className="text-white/40 text-sm mt-1">Xpersive Labs</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-white mb-1">
                  Sign in to your account
                </h2>
                <p className="text-white/40 text-sm mb-6">
                  Enter your email to receive a login link
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div>
                    <label className="block text-sm text-white/60 mb-1.5 font-medium">
                      Email address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      autoFocus
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-primary/60 focus:bg-white/[0.06] transition-all text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending link…
                      </>
                    ) : (
                      <>
                        <Mail size={15} />
                        Send Login Link
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/20 mb-5">
                  <CheckCircle size={28} className="text-green-400" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">Check your inbox</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  We sent a login link to{" "}
                  <span className="text-white/80 font-medium">{submittedEmail}</span>.
                  {" "}It expires in 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmittedEmail("");
                  }}
                  className="mt-6 text-primary/70 hover:text-primary text-sm transition-colors"
                >
                  Use a different email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          Don&apos;t have an invitation? Contact{" "}
          <a
            href="mailto:hello@xpersivelabs.com"
            className="text-white/40 hover:text-white/60 transition-colors underline underline-offset-2"
          >
            hello@xpersivelabs.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
