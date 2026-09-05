import type { Metadata } from "next";
import Link from "next/link";
import { LegalHero } from "@/components/legal/LegalHero";
import { LegalSectionNav } from "@/components/legal/LegalSectionNav";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about the cookies used on xpersivelabs.com.",
  alternates: { canonical: "https://www.xpersivelabs.com/cookie-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "September 4, 2026";

const sections = [
  { id: "what-are-cookies", label: "What Are Cookies" },
  { id: "cookies-we-use", label: "Cookies We Use" },
  { id: "cookies-we-do-not-use", label: "Cookies We Do Not Use" },
  { id: "managing-your-cookie-preferences", label: "Managing Your Preferences" },
  { id: "more-information", label: "More Information" },
];

export default function CookiePolicyPage() {
  return (
    <div className="text-text-primary min-h-screen">
      <LegalHero
        eyebrow="Legal"
        title="Cookie Policy"
        lastUpdated={LAST_UPDATED}
      />

      <section className="pb-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-16">
            <LegalSectionNav sections={sections} />

            <div className="mdx-prose max-w-[760px]">
              <h2 id="what-are-cookies">What Are Cookies</h2>
              <p>
                Cookies are small text files placed on your device when you
                visit a website. They are widely used to make websites work
                correctly and to provide information to site owners.
              </p>

              <h2 id="cookies-we-use">Cookies We Use</h2>
              <p>We keep our cookie usage minimal. Here is a complete list:</p>

              <h3>Necessary cookies (always active)</h3>
              <p>
                These cookies are required for the website to function. You
                cannot disable them through our cookie preferences panel.
              </p>
              <ul>
                <li>
                  <strong>Name:</strong> cc_cookie
                  <br />
                  <strong>Purpose:</strong> Stores your cookie consent
                  preferences so we do not ask again
                  <br />
                  <strong>Duration:</strong> 6 months
                  <br />
                  <strong>Set by:</strong> xpersivelabs.com
                  (vanilla-cookieconsent)
                </li>
                <li>
                  <strong>Name:</strong> xl_region
                  <br />
                  <strong>Purpose:</strong> Remembers your region (based on
                  your approximate location) so we can show you relevant
                  content. No personal data or precise location is stored —
                  only a region code such as &quot;US&quot; or &quot;EU&quot;
                  <br />
                  <strong>Duration:</strong> 6 months
                  <br />
                  <strong>Set by:</strong> xpersivelabs.com
                </li>
              </ul>

              <h3>Analytics (requires your consent)</h3>
              <p>
                We use{" "}
                <a
                  href="https://vercel.com/docs/analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel Analytics
                </a>{" "}
                and{" "}
                <a
                  href="https://vercel.com/docs/speed-insights"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Speed Insights
                </a>{" "}
                to understand how the website is used and how it performs.
                Both are designed to be cookieless: they send anonymous
                page-view and performance beacons without setting a
                persistent tracking cookie. No individual identifier or
                cookie is stored on your device for this purpose — enabling
                this category simply allows that anonymous, aggregated data
                collection to run.
              </p>

              <h2 id="cookies-we-do-not-use">Cookies We Do Not Use</h2>
              <p>We do not use:</p>
              <ul>
                <li>Google Analytics or Google Tag Manager</li>
                <li>Facebook Pixel or any Meta tracking</li>
                <li>LinkedIn Insight Tag</li>
                <li>Advertising or retargeting cookies</li>
                <li>Any cookies that track you across other websites</li>
              </ul>

              <h2 id="managing-your-cookie-preferences">Managing Your Cookie Preferences</h2>
              <p>
                You can change your cookie preferences at any time by
                clicking &quot;Cookie preferences&quot; in the footer of any
                page on our website.
              </p>
              <p>
                You can also control cookies through your browser settings.
                Note that disabling all cookies may affect website
                functionality.
              </p>
              <p>Browser cookie controls:</p>
              <ul>
                <li>Chrome: Settings → Privacy and Security → Cookies</li>
                <li>
                  Firefox: Settings → Privacy &amp; Security → Cookies and
                  Site Data
                </li>
                <li>Safari: Preferences → Privacy → Manage Website Data</li>
                <li>
                  Edge: Settings → Privacy, Search and Services → Cookies
                </li>
              </ul>

              <h2 id="more-information">More Information</h2>
              <p>
                For information about how we handle your personal data more
                broadly, see our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
              <p>
                Questions? Email{" "}
                <a href="mailto:hello@xpersivelabs.com">
                  hello@xpersivelabs.com
                </a>
              </p>

              <p style={{ marginTop: "3rem" }}>
                <Link href="/privacy-policy">← Read our Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
