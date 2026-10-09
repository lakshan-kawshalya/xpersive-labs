"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Cloudflare Turnstile widget state. Mirrors the contact form's setup; the global
 * `window.turnstile` typing is declared in app/(site)/contact/page.tsx.
 */
export function useTurnstile() {
  const [token, setToken] = useState<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !isScriptReady || widgetIdRef.current) return;
    if (!window.turnstile || !containerRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (newToken) => setToken(newToken),
      "expired-callback": () => setToken(null),
      "error-callback": () => setToken(null),
    });
  }, [isScriptReady]);

  const markScriptReady = useCallback(() => setIsScriptReady(true), []);

  const reset = useCallback(() => {
    if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
    setToken(null);
  }, []);

  return { isEnabled: Boolean(TURNSTILE_SITE_KEY), token, containerRef, markScriptReady, reset };
}
