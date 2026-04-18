import Link from "next/link";
import { Globe, Code2, Share2, Mail } from "lucide-react";

const footerSections = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/team", label: "Our Team" },
    { href: "/blog", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
  ],
  Services: [
    { href: "/services#web", label: "Web Development" },
    { href: "/services#mobile", label: "Mobile Development" },
    { href: "/services#design", label: "UI/UX Design" },
  ],
  Connect: [
    { href: "/contact", label: "Contact Us" },
    { href: "mailto:hello@xpersivelabs.com", label: "hello@xpersivelabs.com" },
  ],
};

const socialLinks = [
  { href: "https://github.com/xpersivelabs", icon: Code2, label: "GitHub" },
  { href: "https://linkedin.com/company/xpersivelabs", icon: Globe, label: "LinkedIn" },
  { href: "https://twitter.com/xpersivelabs", icon: Share2, label: "Twitter" },
  { href: "mailto:hello@xpersivelabs.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-bold text-gradient">
              Xpersive Labs
            </span>
            <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-xs">
              Innovation for a Better Tomorrow. Building immersive digital
              experiences from Colombo, Sri Lanka.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/50 transition-all duration-200 hover:bg-primary/20 hover:border-primary/40 hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Xpersive Labs. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with passion in Colombo, Sri Lanka 🇱🇰
          </p>
        </div>
      </div>
    </footer>
  );
}
