import { renderOgImage } from "@/lib/ogImage";

export const alt = "The Xpersive Labs team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    headline: "Meet the team",
    accent: "behind Xpersive Labs.",
    subtext: "A small team of builders, designers and problem-solvers in Colombo, Sri Lanka.",
    badge: "Colombo, Sri Lanka",
    path: "xpersivelabs.com/team",
  });
}
