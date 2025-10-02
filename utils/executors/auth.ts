import { LoginFormData, RegisterCompanyFormData, RegisterTruckFormData, ResendOtpFormData, VerificationFormData } from "@/constants/formData";
import { CommonApi } from "../CommonApi";
import { AuthEndpoints } from "../endpoints/auth";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const createCompany = async (data: RegisterCompanyFormData) => {
  const response = await CommonApi(AuthEndpoints.company_register, {
    method: "POST",
    body: data,
  });
  return response;
}


export const createTruck = async (data: RegisterTruckFormData) => {
  try {
    const response = await CommonApi(AuthEndpoints.truck_register, {
      method: "POST",
      body: data,
    });

    return response;
  } catch (err: any) {
    throw err; // rethrow so UI can also show it
  }
};


export const VerifyRegistration = async (data: VerificationFormData) => {

  const token = Platform.OS === 'web' ? localStorage.getItem("reg_token") : await AsyncStorage.getItem('reg_token');

  const response = await CommonApi(AuthEndpoints.verification, {
    method: "POST",
    body: data,
    token: token ?? undefined
  });
  return response;
}

export const resendOtpVerification = async (data: ResendOtpFormData) => {

  const token = Platform.OS === 'web' ? localStorage.getItem("reg_token") : await AsyncStorage.getItem('reg_token');

  const response = await CommonApi(AuthEndpoints.resend_otp, {
    method: "POST",
    body: data,
    token: token ?? undefined
  });
  return response;
}



export const loginUser = async (data: LoginFormData) => {
  const response = await CommonApi(AuthEndpoints.login, {
    method: "POST",
    body: data,
  });
  return response;
}
