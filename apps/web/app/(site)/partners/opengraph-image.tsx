import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs Partner Program: Referral and White-label";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "PARTNER PROGRAM",
    headline: "Work with us",
    accent: "as a partner.",
    subtext: "For marketing agencies and freelancers. Introduce a client, or have us build under your brand.",
    badge: "Referral or White-label",
    path: "xpersivelabs.com/partners",
  });
}
