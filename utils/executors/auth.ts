import { RegisterCompanyFormData, RegisterTruckFormData } from "@/constants/formData";
import { CommonApi } from "../CommonApi";
import { AuthEndpoints } from "../endpoints/auth";


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
  } catch (err:any) {
    throw err; // rethrow so UI can also show it
  }
};
