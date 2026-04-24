import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Xpersive Labs",
  description:
    "Get in touch with Xpersive Labs. Tell us about your project and let's build something amazing together from Colombo, Sri Lanka.",
  keywords: ["contact", "hire", "project inquiry", "Xpersive Labs", "Colombo", "Sri Lanka"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
