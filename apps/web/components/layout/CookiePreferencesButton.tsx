"use client";

export function CookiePreferencesButton() {
  const openPreferences = () => {
    import("vanilla-cookieconsent").then((CookieConsent) => {
      CookieConsent.showPreferences();
    });
  };

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-sm transition-colors duration-200 hover:text-primary"
      style={{ color: "rgba(255,255,255,0.45)" }}
    >
      Cookie preferences
    </button>
  );
}
