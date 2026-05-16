import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Xpersive Labs — a Sri Lankan software studio founded in Colombo, dedicated to building immersive web experiences and innovative technology for global clients.",
  alternates: { canonical: "https://www.xpersivelabs.com/about" },
  openGraph: { url: "https://www.xpersivelabs.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
