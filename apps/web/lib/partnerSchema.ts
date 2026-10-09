import { z } from "zod";

// Control characters (incl. newlines) are rejected so a field cannot inject extra
// lines into the notification email. The free-text message is handled separately.
const NO_CONTROL_CHARS = /^[^\u0000-\u001f\u007f]*$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,25}$/;

const singleLine = (min: number, max: number) =>
  z.string().trim().min(min).max(max).regex(NO_CONTROL_CHARS);

export const partnerSchema = z.object({
  name: singleLine(2, 200),
  business: singleLine(2, 200),
  email: z.string().trim().email().max(320).regex(NO_CONTROL_CHARS),
  phone: z.string().trim().regex(PHONE_PATTERN),
  option: z.enum(["referral", "white-label", "not-sure"]),
  message: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true),
  // Honeypot: real visitors never see or fill this. Bots usually do.
  website: z.string().max(500).optional().default(""),
  turnstileToken: z.string().min(1).max(2048),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
