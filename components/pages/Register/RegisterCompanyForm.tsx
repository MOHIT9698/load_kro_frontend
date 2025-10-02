import RegisterPasswordInput from "@/components/common-components/form/register/RegisterPasswordInput";
import RegisterTextInput from "@/components/common-components/form/register/RegisterTextInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { RegisterCompanyFormData } from "@/constants/formData";
import { registerCompanySchema } from "@/constants/schema";
import { createCompany, resendOtpVerification, VerifyRegistration } from "@/utils/executors/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Platform, View } from "react-native";
import Toast from "react-native-toast-message";
import OtpVerification from "./OtpVerification";




const RegisterCompanyForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterCompanyFormData>({
        resolver: zodResolver(registerCompanySchema),
        defaultValues: {
            company_name: "",
            company_contact: "",
            gst_number: "",
            address: "",
            password: "",
        },
    });
    const router = useRouter();
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [companyId, setCompanyId] = useState<string | null>(null);


    const onSubmit = async (data: RegisterCompanyFormData) => {
        setLoading(true);
        try {

            const response = await createCompany(data);

            if (response?.status) {
                const token = response.token;

                Toast.show({
                    type: "success",
                    text1: response?.message ?? "Company Registered",
                    text2: "Your company has been registered successfully",

                });
                if (token) {
                    if (Platform.OS === 'web') {
                        localStorage.setItem("reg_token", token)
                    } else {
                        await AsyncStorage.setItem('reg_token', token);
                    }
                }
                if (response?.company_id) {
                    setCompanyId(response.company_id);
                }
                if (response?.otp_sent) {
                    setShowOtpModal(true)
                }
            }
        } catch (err: any) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: err?.message ?? "Something went wrong!",

            });
        }
        setLoading(false);
    };

    const resendOtp = async () => {
        const data = {
            company_id: companyId ?? ""
        };
        try {

            const response = await resendOtpVerification(data);

            if (response?.status) {
                Toast.show({
                    type: "success",
                    text1: response?.message ?? "Otp resend successfully ",

                });

            }
        } catch (err: any) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: err?.message ?? "Something went wrong!",

            });
        }
    }


    const verifyOtp = async (otp: string) => {
        setOtpLoading(true);
        const data = {
            otp: otp,
            company_id: companyId ?? "",
        }
        try {

            const response = await VerifyRegistration(data);

            if (response?.status) {
                Toast.show({
                    type: "success",
                    text1: response?.message ?? "Otp Verified",
                    text2: "Your company has been registered successfully",

                });
                setShowOtpModal(false);
                router.push("/auth/login")

            }
        } catch (err: any) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: err?.message ?? "Something went wrong!",

            });
        }
        setOtpLoading(false);


    }

    return (
        <>
            <View>
                <RegisterTextInput control={control} error={errors.company_name} autoCapitalize="words" autoComplete="name" iconName="person-outline" label="Company Name" name="company_name" placeholder="Enter Company name" />
                <RegisterTextInput control={control} error={errors.company_contact} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label="Mobile Number" name="company_contact" placeholder="Enter mobile number" />
                <RegisterTextInput control={control} error={errors.gst_number} autoCapitalize="words" autoComplete="name" iconName="card-outline" label="GST Number" name="gst_number" placeholder="Enter Gst Number" />
                <RegisterTextInput control={control} error={errors.address} autoCapitalize="words" autoComplete="name" iconName="location-outline" label="Address" name="address" placeholder="Enter Company Address" />
                <RegisterPasswordInput control={control} name="password" label="Password" placeholder="Create password" error={errors.password} />
                <PrimaryButton text="Create Company" isLoading={loading} onPress={handleSubmit(onSubmit)} />

            </View>


            <OtpVerification getOtp={verifyOtp} loading={otpLoading} resendOtp={resendOtp} setShowOtpModal={setShowOtpModal} showOtpModal={showOtpModal} />

        </>
    )
};

export default RegisterCompanyForm;



