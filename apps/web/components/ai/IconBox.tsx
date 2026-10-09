import type { LucideIcon } from "lucide-react";

export default function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-primary/30"
      style={{ background: "linear-gradient(135deg, rgba(109,113,249,0.2), rgba(84,193,251,0.2))" }}
    >
      <Icon size={24} className="text-primary" aria-hidden="true" />
    </span>
  );
}
