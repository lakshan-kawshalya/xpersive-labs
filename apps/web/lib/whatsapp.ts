export const WHATSAPP_NUMBER = "94742366282"; // E.164 format, no + or spaces

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
