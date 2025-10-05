import RegisterPasswordInput from "@/components/common-components/form/register/RegisterPasswordInput";
import RegisterTextInput from "@/components/common-components/form/register/RegisterTextInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { RegisterTruckFormData } from "@/constants/formData";
import { registerTruckSchema } from "@/constants/schema";
import { createTruck, resendOtpVerification, VerifyRegistration } from "@/utils/executors/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Platform, View } from "react-native";
import Toast from "react-native-toast-message";
import OtpVerification from "./OtpVerification";
import { useTranslation } from "react-i18next";



const RegisterTruckForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTruckFormData>({
    resolver: zodResolver(registerTruckSchema),
    defaultValues: {
      truck_number: "",
      driver_name: "",
      driver_contact: "",
      owner_name: "",
      owner_contact: "",
      password: "",
    },
  });
  const router = useRouter();
  const {t} = useTranslation();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [truckId, setTruckId] = useState<string | null>(null);


  const onSubmit = async (data: RegisterTruckFormData) => {
    setLoading(true);
    try {

      const response = await createTruck(data);
      if (response?.status) {
        const token = response.token;

        Toast.show({
          type: t("success"),
          text1: response?.message ?? t("Truck Registered"),
          text2: t("Your truck has been registered successfully"),

        });
        if (token) {
          if (Platform.OS === 'web') {
            localStorage.setItem("reg_token", token)
          } else {
            await AsyncStorage.setItem('reg_token', token);
          }
        }
        if (response?.truck_id) {
          setTruckId(response.truck_id);
        }
        if (response?.otp_sent) {
          setShowOtpModal(true)
        }
      }
    } catch (err: any) {
      
      Toast.show({
                 type: "error",
        text1: t("Failed"),
        text2: err.message ?? t("Something went wrong!"),

      });
    }
    setLoading(false);

  };

  const resendOtp = async () => {
         const data = {
             truck_id: truckId ?? ""
         };
         try {
 
             const response = await resendOtpVerification(data);
 
             if (response?.status) {
 
                 Toast.show({
                        type: "success",
                     text1: response?.message ?? t("Otp resend successfully"),
 
                 });
 
             }
         } catch (err: any) {
             Toast.show({
                 type: "error",
                 text1: t("Failed"),
                 text2: err?.message ?? t("Something went wrong!"),
 
             });
         }
     }
 


  const verifyOtp = async (otp: string) => {
    setOtpLoading(true);
    const data = {
      otp: otp,
      truck_id: truckId ?? "",
    }
    try {

      const response = await VerifyRegistration(data);

      if (response?.status) {
        Toast.show({
          type: t("success"),
          text1: response?.message ?? t("Otp Verified"),
          text2: t("Your truck has been registered successfully"),

        });
        setShowOtpModal(false);
        router.push("/auth/login")

      }
    } catch (err: any) {
      Toast.show({
                 type: "error",
        text1: t("Failed"),
        text2: err?.message ?? t("Something went wrong!"),

      });
    }
    setOtpLoading(false);


  }
  return (
    <>
      <View>
        <RegisterTextInput control={control} error={errors.truck_number} autoCapitalize="words" autoComplete="name" iconName="car-outline" label={t("Truck Number")} name="truck_number" placeholder={t("Enter truck number")} />
        <RegisterTextInput control={control} error={errors.driver_name} autoCapitalize="words" autoComplete="name" iconName="person-outline" label={t("Driver Name")} name="driver_name" placeholder={t("Enter driver name")} />
        <RegisterTextInput control={control} error={errors.driver_contact} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label={t("Driver Mobile Number")} name="driver_contact" placeholder={t("Enter mobile number")} />
        <RegisterTextInput control={control} error={errors.owner_name} autoCapitalize="words" autoComplete="name" iconName="person-outline" label={t("Owner Name")} name="owner_name" placeholder={t("Enter owner name")} />
        <RegisterTextInput control={control} error={errors.owner_contact} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label={t("Owner Mobile Number")} name="owner_contact" placeholder={t("Enter onwer mobile number")} />
        <RegisterPasswordInput control={control} name="password" label={t("Password")} placeholder={t("Create password")} error={errors.password} />
        <PrimaryButton text={t("Create Truck")} isLoading={loading} onPress={handleSubmit(onSubmit)} />
      </View>
      <OtpVerification getOtp={verifyOtp} loading={otpLoading} resendOtp={resendOtp} setShowOtpModal={setShowOtpModal} showOtpModal={showOtpModal} />

    </>
  )
};

export default RegisterTruckForm;

