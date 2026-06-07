// schemas/contact.ts
// Zod schema for the contact form — validated both client-side and server-side.

import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email address is too long"),
  contactingTo: z.string().min(1, "Please select who you are contacting"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
