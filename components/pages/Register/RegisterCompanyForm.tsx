import RegisterPasswordInput from "@/components/common-components/form/register/RegisterPasswordInput";
import RegisterTextInput from "@/components/common-components/form/register/RegisterTextInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { RegisterCompanyFormData } from "@/constants/formData";
import { registerCompanySchema } from "@/constants/schema";
import { createCompany } from "@/utils/executors/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Toast from "react-native-toast-message";



const RegisterCompanyForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterCompanyFormData>({
        resolver: zodResolver(registerCompanySchema),
        defaultValues: {
            company_name: "",
            contact_number: "",
            gst_number: "",
            address: "",
            password: "",
        },
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const onSubmit = async (data: RegisterCompanyFormData) => {
        setLoading(true);
        try {

            const response = await createCompany(data);

            if (response?.status) {
                router.push("/auth")
                Toast.show({
                    type: "success",
                    text1: "Company Registered",
                    text2: "Your company has been registered successfully",

                });
                router.push("/auth")
            }
        } catch (err: any) {
            Toast.show({
                type: "error",
                text1: "Failed",
                text2: err.error.error ?? "Something went wrong!",

            });
        }
        setLoading(false);
    };
    return (
        <View>
            <RegisterTextInput control={control} error={errors.company_name} autoCapitalize="words" autoComplete="name" iconName="person-outline" label="Company Name" name="company_name" placeholder="Enter Company name" />
            <RegisterTextInput control={control} error={errors.contact_number} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label="Mobile Number" name="contact_number" placeholder="Enter mobile number" />
            <RegisterTextInput control={control} error={errors.gst_number} autoCapitalize="words" autoComplete="name" iconName="card-outline" label="GST Number" name="gst_number" placeholder="Enter Gst Number" />
            <RegisterTextInput control={control} error={errors.address} autoCapitalize="words" autoComplete="name" iconName="location-outline" label="Address" name="address" placeholder="Enter Company Address" />
            <RegisterPasswordInput control={control} name="password" label="Password" placeholder="Create password" error={errors.password} />
            <PrimaryButton text="Create Company" isLoading={loading} onPress={handleSubmit(onSubmit)} />

        </View>
    )
};

export default RegisterCompanyForm;

