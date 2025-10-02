import { z } from "zod";

export const registerTruckSchema = z.object({
  truck_number: z
    .string()
    .regex(
      /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/,
      "Enter valid truck number (e.g., MH12AB1234)"
    ),
  driver_name: z
    .string()
    .min(3, "Driver name must be at least 3 characters")
    .regex(/^[a-zA-Z ]+$/, "Driver name can only contain letters and spaces"),
  driver_contact: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  owner_name: z
    .string()
    .min(3, "Owner name must be at least 3 characters")
    .regex(/^[a-zA-Z ]+$/, "Owner name can only contain letters and spaces"),
  owner_contact: z
    .string()
    .regex(/^[0-9]{10}$/, "Owner mobile number must be exactly 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});


export const registerCompanySchema = z.object({
  company_name: z
    .string()
    .min(3, "Company name must be at least 3 characters")
    .regex(/^[a-zA-Z ]+$/, "Company name can only contain letters and spaces"),
  company_contact: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  gst_number: z
    .string()
    .min(6, "GST number must be at least 6 characters")
    .regex(/^[A-Z0-9-]+$/, "GST number must contain only letters, numbers, or dashes"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});


export const loginSchema = z.object({

  contact_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});




