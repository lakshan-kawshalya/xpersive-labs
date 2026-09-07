import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team — Xpersive Labs",
  description:
    "Meet the small team behind Xpersive Labs — builders, designers, and problem-solvers based in Colombo, Sri Lanka, building websites, mobile apps, custom software, and automation for businesses in AU, UK, US, and Europe.",
  alternates: { canonical: "https://www.xpersivelabs.com/team" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/team",
    title: "Our Team — Xpersive Labs",
    description:
      "Meet the small team behind Xpersive Labs, building websites, mobile apps, software, and automation for growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team — Xpersive Labs",
    description:
      "Meet the small team behind Xpersive Labs, building websites, mobile apps, software, and automation for growing businesses.",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
