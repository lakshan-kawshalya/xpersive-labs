export const PARTNER_SERVICES = [
  "Business websites and landing pages",
  "Online shops and e-commerce stores",
  "Mobile apps",
  "Web apps and custom business systems (booking, inventory, POS, client portals)",
  "Process automation and AI features for existing systems",
  "Ongoing updates and maintenance for what we build",
] as const;

export interface PartnerBlock {
  title: string;
  body: string;
}

export interface PartnerOption {
  slug: "referral" | "white-label";
  href: string;
  label: string;
  summary: string;
  highlight: string;
}

export const REFERRAL_OPTION: PartnerOption = {
  slug: "referral",
  href: "/partners/referral",
  label: "Referral",
  summary: "You introduce a business that needs something built. We handle the project and the client.",
  highlight: "15% of the net fees we receive from that client for the first project.",
};

export const WHITE_LABEL_OPTION: PartnerOption = {
  slug: "white-label",
  href: "/partners/white-label",
  label: "White-label",
  summary: "We build under your brand. Your client sees only you.",
  highlight: "A partner rate agreed in writing before any work starts.",
};

export const PARTNER_OPTIONS: readonly PartnerOption[] = [REFERRAL_OPTION, WHITE_LABEL_OPTION];

export const REFERRAL_BLOCKS: readonly PartnerBlock[] = [
  {
    title: "What you receive",
    body: "You receive 15% of the net fees we receive from that client for the first project, paid within 14 days of each client payment we receive.",
  },
  {
    title: "What net fees means",
    body: "Net fees means money actually received for the agreed scope, after payment-platform fees and excluding taxes and pass-through costs such as domains, licences, stock assets and ad spend.",
  },
  {
    title: "One-time fee",
    body: "Hosting, maintenance, support and other recurring payments are not included.",
  },
  {
    title: "When a referral qualifies",
    body: "A referral qualifies when you introduce the client to us in writing, the client confirms interest in writing, and we log it within 5 working days. The first qualified introduction counts. Attribution lasts 12 months.",
  },
  {
    title: "If a client is refunded",
    body: "If a client is refunded, the matching share of the fee is returned.",
  },
  {
    title: "Confirmed in writing",
    body: "Everything is confirmed in a short written agreement before any referral is counted.",
  },
];

export const WHITE_LABEL_BLOCKS: readonly PartnerBlock[] = [
  {
    title: "Built under your brand",
    body: "We build under your brand. Your client sees only you.",
  },
  {
    title: "Your client, your price",
    body: "You own the client relationship and set the client price.",
  },
  {
    title: "Partner rate in writing",
    body: "We agree a partner rate in writing before any work starts.",
  },
  {
    title: "We stay in the background",
    body: "We stay in the background and do not contact your clients about our own services.",
  },
];

export const BOTH_OPTIONS_NOTE =
  "We do not approach your existing clients for your services, and we ask the same of you. Neither side is exclusive.";

export interface PartnerFaqItem {
  q: string;
  a: string;
}

// TODO(content): "Is there any cost to join?" is deliberately not listed. The approved
// facts do not state whether joining is free, so it needs a confirmed answer before it
// can be published.
// TODO(content): "Do I need to commit to a number of referrals?" and "Can I use both
// options?" are answered only with what the approved facts support (nothing is
// exclusive). Confirm explicitly that there is no minimum and that both can be used.
export const PARTNER_FAQS: readonly PartnerFaqItem[] = [
  {
    q: "Do I need to commit to a number of referrals?",
    a: "Neither side is exclusive. Everything is confirmed in a short written agreement before any referral is counted.",
  },
  {
    q: "Who talks to the client?",
    a: "With Referral, we handle the project and the client. With White-label, you own the client relationship and your client sees only you. We stay in the background.",
  },
  {
    q: "How and when am I paid?",
    a: "With Referral, you receive 15% of the net fees we receive from that client for the first project, paid within 14 days of each client payment we receive. With White-label, we agree a partner rate in writing before any work starts, and you set the client price.",
  },
  {
    q: "What if the client is refunded?",
    a: "With Referral, if a client is refunded, the matching share of the fee is returned.",
  },
  {
    q: "Can I use both options?",
    a: "Neither side is exclusive. Choose Not sure on the form and tell us what you have in mind.",
  },
];

export const PARTNER_FORM_OPTIONS = [
  { value: "referral", label: "Referral" },
  { value: "white-label", label: "White-label" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type PartnerFormOption = (typeof PARTNER_FORM_OPTIONS)[number]["value"];
