import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";

const footerSections = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
  ],
  Services: [
    { href: "/services#web", label: "Web Development" },
    { href: "/services#automation", label: "Automation & Data Pipelines" },
    { href: "/services#ecommerce", label: "Ecommerce Development" },
    { href: "/services#ai", label: "AI Workflow Integration" },
  ],
  Connect: [
    { href: "/contact", label: "Contact Us" },
    { href: "mailto:hello@xpersivelabs.com", label: "hello@xpersivelabs.com" },
    { href: "https://wa.me/94742366282", label: "WhatsApp" },
  ],
};

const socialLinks = [
  { href: "https://github.com/Xpersive-Labs", icon: faGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/xpersive-labs/", icon: faLinkedin, label: "LinkedIn" },
  { href: "mailto:hello@xpersivelabs.com", icon: faEnvelope, label: "Email" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-dark-elevated)" }}>
      <div
        className="h-0.5"
        style={{ background: "linear-gradient(90deg, #6D71F9, #54C1FB, #6D71F9)" }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-bold text-gradient">
              Xpersive Labs
            </span>
            <p className="mt-3 text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              One developer. End-to-end. From brief to production.
            </p>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Built with passion in Colombo, Sri Lanka 🇱🇰
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 hover:-translate-y-0.5 text-white/50 hover:text-primary bg-white/4 border-white/8 hover:bg-primary/15 hover:border-primary/30"
                >
                  <FontAwesomeIcon icon={icon} width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "#9d9daa" }}
              >
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/link flex items-center gap-1 text-sm transition-colors duration-200 min-h-11"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="group-hover/link:text-white transition-colors duration-200">
                        {link.label}
                      </span>
                      <span
                        className="text-primary opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-xs"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Xpersive Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-sm transition-colors duration-200 hover:text-primary"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-sm transition-colors duration-200 hover:text-primary"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Cookie Policy
            </Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
