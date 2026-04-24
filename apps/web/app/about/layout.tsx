import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Xpersive Labs",
  description:
    "Learn about Xpersive Labs — our mission to revolutionize human-technology interaction, our brand values, and the milestones that shaped us.",
  keywords: ["about", "Xpersive Labs", "Sri Lanka", "software startup", "immersive tech"],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
