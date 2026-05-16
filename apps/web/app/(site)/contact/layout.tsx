import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Start Your Project",
  description:
    "Ready to build something great? Contact Xpersive Labs for web development, UI/UX design, or automation projects. Based in Colombo, Sri Lanka. Serving global clients.",
  alternates: { canonical: "https://www.xpersivelabs.com/contact" },
  openGraph: { url: "https://www.xpersivelabs.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
