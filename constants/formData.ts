import z from "zod";
import { loginSchema, registerCompanySchema, registerTruckSchema } from "./schema";

export type RegisterTruckFormData = z.infer<typeof registerTruckSchema>;
export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
