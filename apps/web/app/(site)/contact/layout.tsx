import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Start Your Project",
  description:
    "Contact Xpersive Labs for Alibaba data tools, FBA research automation, web development, or white-label agency work. Based in Colombo, Sri Lanka. Serving AU, UK, and US.",
  alternates: { canonical: "https://www.xpersivelabs.com/contact" },
  openGraph: { url: "https://www.xpersivelabs.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
