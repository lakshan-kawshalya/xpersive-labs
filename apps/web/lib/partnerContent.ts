import {
  BadgeCheck,
  Banknote,
  EyeOff,
  FileText,
  Handshake,
  Percent,
  Receipt,
  RotateCcw,
  Tag,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
}

export interface PartnerOption {
  slug: "referral" | "white-label";
  href: string;
  label: string;
  summary: string;
  highlight: string;
  icon: LucideIcon;
}

export const REFERRAL_OPTION: PartnerOption = {
  slug: "referral",
  href: "/partners/referral",
  label: "Referral",
  summary: "You introduce a business that needs something built. We handle the project and the client.",
  highlight: "15% of the net fees we receive from that client for the first project.",
  icon: Users,
};

export const WHITE_LABEL_OPTION: PartnerOption = {
  slug: "white-label",
  href: "/partners/white-label",
  label: "White-label",
  summary: "We build under your brand. Your client sees only you.",
  highlight: "A partner rate agreed in writing before any work starts.",
  icon: Tag,
};

export const PARTNER_OPTIONS: readonly PartnerOption[] = [REFERRAL_OPTION, WHITE_LABEL_OPTION];

export const REFERRAL_BLOCKS: readonly PartnerBlock[] = [
  {
    title: "What you receive",
    body: "You receive 15% of the net fees we receive from that client for the first project, paid within 14 days of each client payment we receive.",
    icon: Percent,
  },
  {
    title: "What net fees means",
    body: "Net fees means money actually received for the agreed scope, after payment-platform fees and excluding taxes and pass-through costs such as domains, licences, stock assets and ad spend.",
    icon: Receipt,
  },
  {
    title: "One-time fee",
    body: "Hosting, maintenance, support and other recurring payments are not included.",
    icon: Banknote,
  },
  {
    title: "When a referral qualifies",
    body: "A referral qualifies when you introduce the client to us in writing, the client confirms interest in writing, and we log it within 5 working days. The first qualified introduction counts. Attribution lasts 12 months.",
    icon: UserCheck,
  },
  {
    title: "If a client is refunded",
    body: "If a client is refunded, the matching share of the fee is returned.",
    icon: RotateCcw,
  },
  {
    title: "Confirmed in writing",
    body: "Everything is confirmed in a short written agreement before any referral is counted.",
    icon: FileText,
  },
];

export const WHITE_LABEL_BLOCKS: readonly PartnerBlock[] = [
  {
    title: "Built under your brand",
    body: "We build under your brand. Your client sees only you.",
    icon: BadgeCheck,
  },
  {
    title: "Your client, your price",
    body: "You own the client relationship and set the client price.",
    icon: Handshake,
  },
  {
    title: "Partner rate in writing",
    body: "We agree a partner rate in writing before any work starts.",
    icon: FileText,
  },
  {
    title: "We stay in the background",
    body: "We stay in the background and do not contact your clients about our own services.",
    icon: EyeOff,
  },
];

export const BOTH_OPTIONS_NOTE =
  "We do not approach your existing clients for your services, and we ask the same of you. Neither side is exclusive.";

export interface PartnerFaqItem {
  q: string;
  a: string;
}

export const PARTNER_FAQS: readonly PartnerFaqItem[] = [
  {
    q: "Does it cost anything to join?",
    a: "No. Joining is free, and there is no minimum number of referrals.",
  },
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
    a: "Yes, you can use either option, chosen per project. No referral fee applies to a project you take through white-label.",
  },
];

export const PARTNER_FORM_OPTIONS = [
  { value: "referral", label: "Referral" },
  { value: "white-label", label: "White-label" },
  { value: "not-sure", label: "Not sure" },
] as const;

export type PartnerFormOption = (typeof PARTNER_FORM_OPTIONS)[number]["value"];
