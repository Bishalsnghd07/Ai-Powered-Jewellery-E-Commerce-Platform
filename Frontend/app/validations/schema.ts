// validations/checkoutSchema.ts
import { z } from "zod";

export const checkoutSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone must be 10 digits")
      .max(10),
    address: z.object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z
        .string()
        .min(4, "Zip code must be 4-6 digits")
        .max(6, "Zip code not more than 6 digits"),
      country: z.string().min(1, "Country is required"),
    }),
    paymentMode: z.enum(["upi", "netbanking", "card", "wallet", "cod"]),
    paymentMethod: z.enum(["cod", "upi", "netbanking", "card", "wallet"]),
    upiId: z.string().optional(),
    selectedBank: z.string().optional(),
  })
  .refine(
    (data) =>
      data.paymentMode !== "upi" ||
      (data.upiId && /^[\w.-]+@[\w.-]+$/.test(data.upiId)),
    {
      message: "Invalid UPI ID format",
      path: ["upiId"],
    }
  )
  .refine((data) => data.paymentMode !== "netbanking" || !!data.selectedBank, {
    message: "Please select a bank",
    path: ["selectedBank"],
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
