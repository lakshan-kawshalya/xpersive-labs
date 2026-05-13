import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Xpersive Labs",
  description:
    "Web development, mobile engineering, and UI/UX design services from Xpersive Labs. We build modern, scalable digital products tailored to your needs.",
  keywords: ["web development", "mobile development", "UI/UX design", "React", "Next.js", "React Native", "Sri Lanka"],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
