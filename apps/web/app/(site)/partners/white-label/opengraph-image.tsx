import { renderPartnerOgImage } from "@/lib/partnerOgImage";

export const alt = "Xpersive Labs White-label partner option";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderPartnerOgImage({
    headline: "White-label",
    accent: "partner option.",
    subtext: "We build under your brand. Your client sees only you.",
    badge: "Partner rate agreed in writing",
    path: "xpersivelabs.com/partners/white-label",
  });
}
