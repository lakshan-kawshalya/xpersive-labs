"use client";

import type { ReactNode } from "react";

interface CookiePreferencesButtonProps {
  className?: string;
  children?: ReactNode;
}

export function CookiePreferencesButton({ className, children }: CookiePreferencesButtonProps) {
  const openPreferences = () => {
    import("vanilla-cookieconsent").then((CookieConsent) => {
      CookieConsent.showPreferences();
    });
  };

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={className ?? "text-sm transition-colors duration-200 hover:text-primary"}
      style={className ? undefined : { color: "rgba(255,255,255,0.45)" }}
    >
      {children ?? "Cookie preferences"}
    </button>
  );
}
