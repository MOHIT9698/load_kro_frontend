import z from "zod";
import { registerCompanySchema, registerTruckSchema } from "./schema";

export type RegisterTruckFormData = z.infer<typeof registerTruckSchema>;
export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>;
