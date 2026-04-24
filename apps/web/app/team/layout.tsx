import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — Xpersive Labs",
  description:
    "Meet the talented team behind Xpersive Labs — engineers, designers, and product thinkers building the future of immersive digital experiences.",
  keywords: ["team", "Xpersive Labs", "engineers", "designers", "Sri Lanka"],
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
