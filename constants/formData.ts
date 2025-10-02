import z from "zod";
import { loginSchema, registerCompanySchema, registerTruckSchema } from "./schema";

export type RegisterTruckFormData = z.infer<typeof registerTruckSchema>;
export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export interface VerificationFormData {
    otp: string;
    truck_id?:string;
    company_id?:string;
}


export interface ResendOtpFormData {
    truck_id?:string;
    company_id?:string;
}