import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().min(1).max(100),
  budget: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(20).max(5000),
  turnstileToken: z.string().min(1).max(2048),
});

export type ContactInput = z.infer<typeof contactSchema>;
