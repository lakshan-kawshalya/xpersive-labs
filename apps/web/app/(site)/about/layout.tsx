import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Xpersive Labs — Boutique Web Development Studio",
  description:
    "Xpersive Labs is a solo software studio founded in 2024 in Colombo, Sri Lanka. Web application development, automation, and AI workflows for businesses in AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/about" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/about",
    title: "About Xpersive Labs — Boutique Web Development Studio",
    description:
      "Xpersive Labs is a solo software studio founded in 2024 in Colombo, Sri Lanka. Web application development, automation, and AI workflows for businesses in AU, UK, and US.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
