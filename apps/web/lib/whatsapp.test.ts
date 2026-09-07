import { describe, expect, test } from "vitest";
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  test("builds a wa.me URL using the real WhatsApp number", () => {
    expect(buildWhatsAppUrl("Hi")).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi`);
  });

  test("URL-encodes the message", () => {
    const url = buildWhatsAppUrl("Hi Xpersive Labs! I'd like to start a project.");
    expect(url).toBe(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Xpersive%20Labs!%20I'd%20like%20to%20start%20a%20project.`,
    );
  });
});
