import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project — Xpersive Labs",
  description:
    "Tell us what you need. No commitment, no sales pitch. We scope it, plan it, and build it. Web development, automation, and AI workflows for businesses in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/contact" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/contact",
    title: "Start a Project — Xpersive Labs",
    description:
      "Tell us what you need. No commitment, no sales pitch. We scope it, plan it, and build it. Web development, automation, and AI workflows for businesses in AU, UK, and US.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Project — Xpersive Labs",
    description:
      "Tell us what you need. No commitment, no sales pitch. We scope it, plan it, and build it. Web development, automation, and AI workflows for businesses in AU, UK, and US.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
