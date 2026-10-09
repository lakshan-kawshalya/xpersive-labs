import type { Metadata } from "next";
import PartnerDetailPage from "@/components/partners/PartnerDetailPage";
import { REFERRAL_BLOCKS, REFERRAL_OPTION, WHITE_LABEL_OPTION } from "@/lib/partnerContent";

const URL = "https://www.xpersivelabs.com/partners/referral";
const TITLE = "Referral Partner Option";
const DESCRIPTION =
  "Introduce a business that needs something built and receive 15% of the net fees we receive from that client for the first project. Terms confirmed in writing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", title: `${TITLE} | Xpersive Labs`, description: DESCRIPTION, url: URL },
};

export default function ReferralPage() {
  return <PartnerDetailPage option={REFERRAL_OPTION} otherOption={WHITE_LABEL_OPTION} blocks={REFERRAL_BLOCKS} />;
}
