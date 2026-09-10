import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Xpersive Labs — Boutique Web Development Studio",
  description:
    "Xpersive Labs is a software studio founded in 2024 in Colombo, Sri Lanka. Websites, mobile apps, custom software, automation, and UI/UX design for businesses in AU, UK, US, and Europe.",
  alternates: { canonical: "https://www.xpersivelabs.com/about" },
  openGraph: {
    type: "website",
    url: "https://www.xpersivelabs.com/about",
    title: "About Xpersive Labs — Boutique Web Development Studio",
    description:
      "Xpersive Labs is a software studio founded in 2024 in Colombo, Sri Lanka. Websites, mobile apps, custom software, automation, and UI/UX design for businesses in AU, UK, US, and Europe.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
