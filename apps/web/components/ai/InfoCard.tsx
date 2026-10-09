import type { LucideIcon } from "lucide-react";

export default function InfoCard({
  icon: Icon,
  title,
  body,
  tone = "light",
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={
        isDark
          ? "flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
          : "flex gap-4 rounded-2xl border border-border-subtle bg-bg-card p-6 shadow-sm"
      }
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          isDark ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <h3 className={`font-display text-lg font-bold ${isDark ? "text-white" : "text-text-primary"}`}>{title}</h3>
        <p className={`mt-1.5 text-sm leading-relaxed ${isDark ? "text-white/70" : "text-text-secondary"}`}>{body}</p>
      </div>
    </div>
  );
}
