import AmbientBackground from "@/components/layout/AmbientBackground";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import PageTransitionProvider from "@/components/layout/PageTransitionProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteProviders from "@/components/layout/SiteProviders";
import { JsonLd } from "@/components/seo/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xpersive Labs",
  url: "https://www.xpersivelabs.com",
  logo: "https://www.xpersivelabs.com/logo/brandmark.svg",
  description:
    "Boutique software studio building web applications, automation pipelines, and AI workflows for businesses in AU, UK, and US.",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Lakshan Kawshalya",
    url: "https://www.linkedin.com/in/lakshan-kawshalya/",
    sameAs: [
      "https://github.com/lakshan-kawshalya",
      "https://www.linkedin.com/in/lakshan-kawshalya/",
    ],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@xpersivelabs.com",
    contactType: "customer service",
    availableLanguage: "English",
  },
  sameAs: [
    "https://github.com/Xpersive-Labs",
    "https://www.linkedin.com/company/xpersive-labs/",
  ],
  serviceArea: {
    "@type": "AdministrativeArea",
    name: "Worldwide",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Xpersive Labs",
  url: "https://www.xpersivelabs.com",
  description: "Boutique software studio building web applications, automation pipelines, and AI workflows for businesses in AU, UK, and US.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.xpersivelabs.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <SiteProviders>
        {/* Fixed ambient background — z-index 0, behind everything */}
        <AmbientBackground />

        {/* Page content — z-index 1, above background */}
        <div className="relative" style={{ zIndex: 1 }}>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <PageTransitionProvider>
            <div id="main-content">{children}</div>
          </PageTransitionProvider>
          <Footer />
        </div>
      </SiteProviders>
    </>
  );
}
