import { renderOgImage } from "@/lib/ogImage";

export const alt = "Xpersive Labs Referral partner option";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    kicker: "PARTNER PROGRAM",
    headline: "Referral",
    accent: "partner option.",
    subtext: "You introduce a business that needs something built. We handle the project and the client.",
    badge: "15% of net fees, first project",
    path: "xpersivelabs.com/partners/referral",
  });
}
