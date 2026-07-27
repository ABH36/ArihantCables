import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().max(200).optional(),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(/^[+\d\s\-()]+$/, "Invalid phone number format"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  productRef: z.string().optional(),
  categoryRef: z.string().optional(),
  sourcePage: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const clientInquirySchema = inquirySchema.omit({
  productRef: true,
  categoryRef: true,
  sourcePage: true,
});
