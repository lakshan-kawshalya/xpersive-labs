import type { Metadata } from "next";
import Link from "next/link";
import { Info, X as XIcon } from "lucide-react";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { LegalIntroCallout } from "@/components/legal/LegalIntroCallout";
import { LegalNumberedCard } from "@/components/legal/LegalNumberedCard";
import { LegalPageHero } from "@/components/legal/LegalPageHero";
import { LegalTocSidebar } from "@/components/legal/LegalTocSidebar";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The terms governing your use of the Xpersive Labs website and the engagement of our software studio services.",
  alternates: { canonical: "https://www.xpersivelabs.com/terms-and-conditions" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "September 9, 2026";

const sections = [
  { id: "about", label: "About Xpersive Labs" },
  { id: "use-of-website", label: "Use of Our Website" },
  { id: "enquiries", label: "Project Enquiries & Comms" },
  { id: "agreements", label: "Project Agreements" },
  { id: "pricing-payments", label: "Pricing and Payments" },
  { id: "scope-changes", label: "Changes to Project Scope" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "portfolio", label: "Portfolio & Case Studies" },
  { id: "guarantees", label: "No Guarantee of Results" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "availability", label: "Website Availability" },
  { id: "external-links", label: "Links to Third Parties" },
  { id: "terms-changes", label: "Changes to These Terms" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact", label: "Contact Us" },
];

const studioServices = [
  "Website development",
  "Mobile application development",
  "Custom software development",
  "Automation development",
  "UI/UX design and development",
  "Technology consulting and related digital services",
];

const prohibitedUses = [
  "Use the website in any way that violates applicable laws or regulations.",
  "Attempt to gain unauthorized access to our website, systems, or servers.",
  "Interfere with the security or functionality of the website.",
  "Copy, reproduce, or distribute website content without permission where prohibited by applicable law.",
  "Use our website to transmit harmful, fraudulent, or malicious content.",
];

const pricingNotes = [
  "Quotes and estimates are based on the information available at the time.",
  "Changes to the agreed project scope may result in additional costs or changes to delivery timelines.",
  "Payment schedules and methods will be communicated before or during the project agreement process.",
  "Xpersive Labs may suspend work where agreed payments are overdue.",
];

const scopeChangeFactors = ["Project pricing", "Delivery timelines", "Technical reqs", "Deliverables"];

const noGuaranteeItems = [
  "Search engine rankings",
  "Revenue or sales increases",
  "User acquisition",
  "Business growth",
  "Performance of third-party platforms",
];

export default function TermsAndConditionsPage() {
  return (
    <div className="text-text-primary min-h-screen">
      <LegalPageHero
        eyebrow="Legal & Governance"
        title="Terms and Conditions"
        subtitle="These terms establish the principles, governance, and contractual foundations for accessing our website and engaging Xpersive Labs software studio services."
        effectiveDate={EFFECTIVE_DATE}
      />

      <section className="pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <LegalTocSidebar sections={sections} />

            <div className="lg:col-span-8 flex flex-col gap-10">
              <LegalIntroCallout icon={Info} title="Welcome to Xpersive Labs">
                Welcome to Xpersive Labs. These Terms and Conditions govern your use of our website
                and services. By accessing our website or engaging Xpersive Labs for services, you
                agree to these Terms and Conditions.
              </LegalIntroCallout>

              <LegalNumberedCard number="01" id="about" title="About Xpersive Labs">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Xpersive Labs is a software studio providing services including, but not limited to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {studioServices.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-text-primary">{service}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-secondary bg-primary/5 p-3.5 rounded-xl border border-primary/15 font-medium">
                  Our services are provided to clients in Sri Lanka and internationally.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="02" id="use-of-website" title="Use of Our Website">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  You may use our website for lawful purposes only. You agree not to:
                </p>
                <ul className="space-y-2.5 mb-5">
                  {prohibitedUses.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                      <XIcon size={16} className="text-red-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="p-4 rounded-xl text-xs sm:text-sm leading-relaxed font-normal"
                  style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", color: "#92610a" }}
                >
                  We reserve the right to restrict or terminate access to our website if these Terms are
                  violated.
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="03" id="enquiries" title="Project Enquiries and Communications">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    When you contact Xpersive Labs through our website, email, WhatsApp, or other
                    communication channels, you may provide information about your business or project.
                    You agree that the information you provide is accurate and that you have the
                    authority to share it with us.
                  </p>
                  <p className="font-medium text-text-primary bg-[rgba(109,113,249,0.035)] p-3.5 rounded-xl border border-border-subtle">
                    Submitting an enquiry does not create a client relationship or guarantee that
                    Xpersive Labs will accept or undertake a project.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="04" id="agreements" title="Project Agreements">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    The specific scope, timeline, deliverables, pricing, payment terms, and other
                    requirements for a project will be agreed upon separately with the client.
                  </p>
                  <p>
                    A project may begin only after the relevant agreement, proposal, quotation, or other
                    agreed arrangement has been accepted by both parties.
                  </p>
                  <p className="text-xs sm:text-sm text-primary bg-primary/5 p-3.5 rounded-xl border border-primary/15 font-medium">
                    Where there is a conflict between these website Terms and a separate written
                    agreement for a specific project, the specific project agreement will take
                    precedence.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="05" id="pricing-payments" title="Pricing and Payments">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Project pricing depends on the scope and requirements of each project. Unless
                  otherwise agreed in writing:
                </p>
                <ul className="space-y-2.5 mb-4">
                  {pricingNotes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs sm:text-sm text-text-secondary pt-3 border-t border-border-subtle">
                  Any applicable taxes, transaction fees, or third-party costs may be charged
                  separately where relevant and agreed with the client.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="06" id="scope-changes" title="Changes to Project Scope">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  Any significant changes requested after a project has been agreed upon may be treated
                  as a change in scope. Changes may affect:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {scopeChangeFactors.map((factor) => (
                    <div
                      key={factor}
                      className="p-3 rounded-xl bg-[rgba(109,113,249,0.035)] border border-border-subtle text-center"
                    >
                      <span className="text-xs font-semibold text-text-primary">{factor}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Xpersive Labs will communicate any significant changes before proceeding where
                  reasonably possible.
                </p>
              </LegalNumberedCard>

              <LegalNumberedCard number="07" id="client-responsibilities" title="Client Responsibilities">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Clients are responsible for providing the information, content, feedback,
                    approvals, and access reasonably required for us to complete a project.
                  </p>
                  <p>Delays in providing required materials or feedback may affect the project timeline.</p>
                  <p className="bg-[rgba(109,113,249,0.035)] p-3.5 rounded-xl border border-border-subtle text-xs sm:text-sm text-text-primary">
                    Clients are responsible for ensuring that any content, materials, trademarks,
                    images, data, or other resources supplied to Xpersive Labs can legally be used for
                    the intended project.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="08" id="intellectual-property" title="Intellectual Property">
                <div className="flex flex-col gap-3.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Unless otherwise agreed in writing, ownership and intellectual property
                    arrangements for project deliverables will be specified in the relevant project
                    agreement.
                  </p>
                  <p>
                    Xpersive Labs retains ownership of its pre-existing tools, frameworks, reusable
                    code, processes, methodologies, and technologies.
                  </p>
                  <p>
                    We may use general knowledge, skills, techniques, and experience gained during a
                    project in future work, provided that confidential client information is not
                    disclosed.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="09" id="third-party-services" title="Third-Party Services">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Projects may involve third-party platforms, services, software, APIs, hosting
                    providers, payment providers, or other external technologies.
                  </p>
                  <p>
                    Xpersive Labs is not responsible for outages, changes, security incidents, pricing
                    changes, or discontinuation of third-party services that are outside our reasonable
                    control.
                  </p>
                  <p>
                    Clients may be responsible for maintaining subscriptions or accounts required for
                    third-party services unless otherwise agreed.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="10" id="confidentiality" title="Confidentiality">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    We respect the confidentiality of information shared with us in connection with
                    potential and active projects.
                  </p>
                  <p className="font-medium text-text-primary">
                    However, where specific confidentiality obligations are required, clients should
                    request a separate Non-Disclosure Agreement (NDA) or confidentiality arrangement.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="11" id="portfolio" title="Portfolio and Case Studies">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    Unless otherwise agreed in writing, Xpersive Labs may display completed work in our
                    portfolio, website, case studies, or promotional materials.
                  </p>
                  <p>
                    If a client requires a project to remain confidential, this should be agreed upon
                    before or during the project engagement.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="12" id="guarantees" title="No Guarantee of Specific Results">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
                  While we aim to deliver high-quality services, we cannot guarantee specific business
                  results, including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {noGuaranteeItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[rgba(39,40,72,0.03)] text-xs sm:text-sm text-text-secondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-text-muted">Results may depend on factors outside our control.</p>
              </LegalNumberedCard>

              <LegalNumberedCard number="13" id="liability" title="Limitation of Liability">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    To the maximum extent permitted by applicable law, Xpersive Labs will not be liable
                    for indirect, incidental, consequential, or special damages arising from the use of
                    our website or services.
                  </p>
                  <p>
                    This includes, where permitted by law, loss of profits, business interruption, loss
                    of data, or other indirect losses.
                  </p>
                  <p className="text-xs sm:text-sm text-text-primary bg-[rgba(39,40,72,0.03)] p-3 rounded-xl border border-border-subtle font-medium">
                    Nothing in these Terms excludes liability where it cannot legally be excluded under
                    applicable law.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="14" id="availability" title="Website Availability">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>
                    We aim to keep our website available and functioning correctly. However, we do not
                    guarantee that the website will always be uninterrupted, error-free, or available.
                  </p>
                  <p>We may update, modify, suspend, or discontinue parts of the website at any time.</p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="15" id="external-links" title="Links to Third-Party Websites">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>Our website may contain links to third-party websites or services.</p>
                  <p>
                    We are not responsible for the content, privacy practices, availability, or policies
                    of third-party websites.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="16" id="terms-changes" title="Changes to These Terms">
                <div className="flex flex-col gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <p>We may update these Terms and Conditions from time to time.</p>
                  <p>
                    Any changes will be posted on this page with an updated revision date. Continued use
                    of our website after changes are published may constitute acceptance of the updated
                    Terms.
                  </p>
                </div>
              </LegalNumberedCard>

              <LegalNumberedCard number="17" id="governing-law" title="Governing Law">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  These Terms shall be interpreted in accordance with applicable laws relevant to the
                  operations of Xpersive Labs, unless otherwise specified in a separate agreement with a
                  client.
                </p>
              </LegalNumberedCard>

              <LegalContactCard
                number="18"
                intro="If you have any questions about these Terms and Conditions, please contact us:"
              />

              <p className="text-sm">
                <Link href="/privacy-policy" className="text-primary font-semibold hover:underline">
                  Read our Privacy Policy →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
