import type { Metadata } from "next";
import Link from "next/link";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSectionNav } from "@/components/legal/LegalSectionNav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Xpersive Labs collects, uses, and protects your personal information.",
  alternates: { canonical: "https://www.xpersivelabs.com/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "August 27, 2026";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-your-information", label: "How We Use Your Information" },
  { id: "how-we-store-your-information", label: "How We Store Your Information" },
  { id: "how-long-we-keep-your-information", label: "How Long We Keep Your Information" },
  { id: "your-rights", label: "Your Rights" },
  { id: "third-party-services", label: "Third-Party Services" },
  { id: "cookies", label: "Cookies" },
  { id: "links-to-other-websites", label: "Links to Other Websites" },
  { id: "changes-to-this-policy", label: "Changes to This Policy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="text-text-primary min-h-screen">
      <LegalHero
        eyebrow="Legal"
        title="Privacy Policy"
        lastUpdated={LAST_UPDATED}
      />

      <section className="pb-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-16">
            <LegalSectionNav sections={sections} />

            <div className="mdx-prose max-w-[760px]">
              <h2 id="introduction">Introduction</h2>
              <p>
                Xpersive Labs (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
                operates the website xpersivelabs.com. This Privacy Policy
                explains what personal information we collect, why we
                collect it, how we use it, and your rights in relation to
                it.
              </p>
              <p>
                We take your privacy seriously. We collect only what we
                need, we do not sell your data, and we do not use it for
                advertising.
              </p>

              <h2 id="who-we-are">Who We Are</h2>
              <p>
                Xpersive Labs is a software development studio based in
                Colombo, Sri Lanka, providing web development, UI/UX
                design, and automation services to clients in Australia,
                the United Kingdom, the United States, and internationally.
              </p>
              <p>
                Contact:{" "}
                <a href="mailto:hello@xpersivelabs.com">
                  hello@xpersivelabs.com
                </a>
              </p>

              <h2 id="information-we-collect">Information We Collect</h2>
              <h3>1. Information you give us directly</h3>
              <p>When you use our contact form, we collect:</p>
              <ul>
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your company name (optional)</li>
                <li>The service you are interested in</li>
                <li>
                  Your project description and any other information you
                  choose to share
                </li>
              </ul>
              <p>We collect this information solely to respond to your enquiry.</p>

              <h3>2. Information collected automatically</h3>
              <p>
                When you visit our website, we collect anonymous usage data
                through Vercel Analytics, including:
              </p>
              <ul>
                <li>Pages visited</li>
                <li>Approximate geographic region (country level only)</li>
                <li>Browser and device type</li>
                <li>Referral source (how you found us)</li>
                <li>Time spent on pages</li>
              </ul>
              <p>
                This data is aggregated and anonymised. It cannot be used to
                identify you personally. Vercel Analytics is cookieless — it
                sends anonymous page-view beacons without setting a
                persistent tracking cookie or using third-party advertising
                cookies.
              </p>

              <h3>3. Cookies</h3>
              <p>
                We use one small, necessary cookie to remember your cookie
                preferences. See our{" "}
                <Link href="/cookie-policy">Cookie Policy</Link> for the
                full list. In summary:
              </p>
              <ul>
                <li>
                  Necessary cookies: required for the website to function
                  correctly (stores your cookie consent choice)
                </li>
                <li>
                  Analytics: anonymous, cookie-free usage data via Vercel
                  Analytics (only runs with your consent)
                </li>
              </ul>

              <h2 id="how-we-use-your-information">How We Use Your Information</h2>
              <p>
                <strong>Contact form submissions:</strong> We use the name,
                email, and project details you provide to respond to your
                enquiry and, if you become a client, to manage our working
                relationship. We do not add you to any marketing list
                without your explicit consent.
              </p>
              <p>
                <strong>Analytics data:</strong> We use anonymous analytics
                data to understand which pages are useful, where visitors
                come from, and how to improve the website. This data does
                not identify you and is not shared with third parties for
                advertising purposes.
              </p>

              <h2 id="how-we-store-your-information">How We Store Your Information</h2>
              <p>
                <strong>Contact form submissions:</strong> Your contact form
                submission is sent directly to our inbox via EmailJS, a
                transactional email delivery service. The message is
                delivered to hello@xpersivelabs.com and is not stored in any
                database by Xpersive Labs — it exists only as an email in
                our inbox.
              </p>
              <p>
                Vercel Analytics data is stored on Vercel&apos;s
                infrastructure. For information on how Vercel handles data,
                see{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vercel.com/legal/privacy-policy
                </a>
                .
              </p>
              <p>
                Our website is hosted on Vercel, Inc. (USA). By using our
                website, your data may be processed on servers in the
                United States and other countries where Vercel operates.
              </p>

              <h2 id="how-long-we-keep-your-information">How Long We Keep Your Information</h2>
              <p>
                <strong>Contact form data:</strong> We retain email
                correspondence for as long as is necessary to manage your
                enquiry or client relationship. If no engagement follows
                your initial enquiry, we retain your contact details for up
                to 12 months before deletion.
              </p>
              <p>
                <strong>Analytics data:</strong> Anonymous analytics data is
                retained for up to 24 months in accordance with
                Vercel&apos;s data retention policies.
              </p>

              <h2 id="your-rights">Your Rights</h2>
              <p>
                Depending on where you are located, you may have the
                following rights in relation to your personal data:
              </p>
              <ul>
                <li>
                  <strong>Right of access</strong> — you can ask us what
                  personal data we hold about you.
                </li>
                <li>
                  <strong>Right to rectification</strong> — you can ask us
                  to correct inaccurate data.
                </li>
                <li>
                  <strong>Right to erasure</strong> — you can ask us to
                  delete your personal data. We will do so unless we have a
                  legal obligation to retain it.
                </li>
                <li>
                  <strong>Right to object</strong> — you can object to our
                  processing of your data.
                </li>
                <li>
                  <strong>Right to data portability</strong> — you can ask
                  for a copy of your data in a machine-readable format.
                </li>
              </ul>
              <p>
                If you are in the European Union or United Kingdom, these
                rights are provided under GDPR and UK GDPR respectively. If
                you are in Australia, your rights are provided under the
                Privacy Act 1988.
              </p>
              <p>
                To exercise any of these rights, email us at:{" "}
                <a href="mailto:hello@xpersivelabs.com">
                  hello@xpersivelabs.com
                </a>
                . We will respond within 30 days.
              </p>

              <h2 id="third-party-services">Third-Party Services</h2>
              <p>
                We use the following third-party services that may process
                your data:
              </p>
              <ul>
                <li>
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vercel
                  </a>{" "}
                  — hosting and analytics
                </li>
                <li>
                  <a
                    href="https://www.emailjs.com/legal/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EmailJS
                  </a>{" "}
                  — contact form delivery
                </li>
              </ul>
              <p>
                We do not use Google Analytics, Facebook Pixel, or any
                advertising networks on this website.
              </p>

              <h2 id="cookies">Cookies</h2>
              <p>
                For full information about the cookies we use, see our{" "}
                <Link href="/cookie-policy">Cookie Policy</Link>.
              </p>
              <p>
                You can manage your cookie preferences at any time using the
                &quot;Cookie preferences&quot; link in the footer.
              </p>

              <h2 id="links-to-other-websites">Links to Other Websites</h2>
              <p>
                Our website may contain links to external websites. We are
                not responsible for the privacy practices of those sites
                and recommend you review their privacy policies.
              </p>

              <h2 id="changes-to-this-policy">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We
                will update the &quot;Last updated&quot; date at the top of
                this page when we do. Significant changes will be
                communicated via a notice on the website.
              </p>

              <h2 id="contact-us">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how we
                handle your personal data, contact us at:
              </p>
              <p>
                Email:{" "}
                <a href="mailto:hello@xpersivelabs.com">
                  hello@xpersivelabs.com
                </a>
                <br />
                Website: <Link href="/contact">xpersivelabs.com/contact</Link>
              </p>

              <p style={{ marginTop: "3rem" }}>
                <Link href="/cookie-policy">Read our Cookie Policy →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
