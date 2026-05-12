import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Xpersive Labs",
  description:
    "Explore our portfolio of web apps, mobile products, and design systems built by Xpersive Labs for clients across industries.",
  keywords: ["portfolio", "case studies", "web apps", "mobile apps", "UI/UX", "Xpersive Labs"],
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
