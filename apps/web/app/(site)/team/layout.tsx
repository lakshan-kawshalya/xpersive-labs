import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the team behind Xpersive Labs. Founded by Lakshan Kawshalya, a full-stack developer based in Colombo, Sri Lanka.",
  alternates: { canonical: "https://www.xpersivelabs.com/team" },
  openGraph: { url: "https://www.xpersivelabs.com/team" },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
