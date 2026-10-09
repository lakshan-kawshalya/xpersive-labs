import type { Metadata } from "next";
import PartnerDetailPage from "@/components/partners/PartnerDetailPage";
import { REFERRAL_OPTION, WHITE_LABEL_OPTION } from "@/lib/partnerContent";

const URL = "https://www.xpersivelabs.com/partners/white-label";
const TITLE = "White-label Partner Option";
const DESCRIPTION =
  "We build under your brand and stay in the background. You own the client relationship and set the client price. Partner rate agreed in writing before work starts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", title: `${TITLE} | Xpersive Labs`, description: DESCRIPTION, url: URL },
};

export default function WhiteLabelPage() {
  return <PartnerDetailPage option={WHITE_LABEL_OPTION} otherOption={REFERRAL_OPTION} />;
}
