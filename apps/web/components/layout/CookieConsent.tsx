"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export function CookieConsent() {
  useEffect(() => {
    import("vanilla-cookieconsent").then((CookieConsent) => {
      CookieConsent.run({
        guiOptions: {
          consentModal: {
            layout: "box inline",
            position: "bottom left",
            equalWeightButtons: false,
            flipButtons: false,
          },
          preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false,
          },
        },

        categories: {
          necessary: {
            readOnly: true,
            enabled: true,
          },
          analytics: {},
        },

        language: {
          default: "en",
          autoDetect: "browser",
          translations: {
            en: {
              consentModal: {
                title: "We use cookies",
                description:
                  "We use an essential cookie to remember your cookie preferences, and optional analytics to understand how visitors use this site. No advertising cookies, ever.",
                acceptAllBtn: "Accept all",
                acceptNecessaryBtn: "Necessary only",
                showPreferencesBtn: "Manage preferences",
                footer:
                  '<a href="/privacy-policy">Privacy Policy</a> · <a href="/cookie-policy">Cookie Policy</a>',
              },
              preferencesModal: {
                title: "Cookie preferences",
                acceptAllBtn: "Accept all",
                acceptNecessaryBtn: "Necessary only",
                savePreferencesBtn: "Save preferences",
                closeIconLabel: "Close",
                serviceCounterLabel: "Service|Services",
                sections: [
                  {
                    title: "Cookie usage",
                    description:
                      "We use a minimal set of cookies to make the site work and, with your consent, to understand how it's used. We do not use cookies for advertising or tracking across other websites.",
                  },
                  {
                    title:
                      'Necessary cookies <span class="pm__badge">Always on</span>',
                    description:
                      "This cookie stores your cookie consent choices so we don't ask again. It's essential for the preference banner to work and can't be disabled.",
                    linkedCategory: "necessary",
                    cookieTable: {
                      caption: "Cookie table",
                      headers: {
                        name: "Cookie",
                        domain: "Domain",
                        desc: "Description",
                      },
                      body: [
                        {
                          name: "cc_cookie",
                          domain: "xpersivelabs.com",
                          desc: "Stores your cookie consent preferences",
                        },
                      ],
                    },
                  },
                  {
                    title: "Analytics",
                    description:
                      "We use Vercel Analytics and Speed Insights to see which pages are useful and how the site performs. These run without setting any tracking cookie — they send anonymous, aggregated page-view and performance data with no persistent identifier. Enabling this category lets that anonymous data collection run.",
                    linkedCategory: "analytics",
                  },
                ],
              },
            },
          },
        },
      });
    });
  }, []);

  return null;
}
