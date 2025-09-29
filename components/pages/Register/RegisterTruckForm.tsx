import RegisterPasswordInput from "@/components/common-components/form/register/RegisterPasswordInput";
import RegisterTextInput from "@/components/common-components/form/register/RegisterTextInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { RegisterTruckFormData } from "@/constants/formData";
import { registerTruckSchema } from "@/constants/schema";
import { createTruck } from "@/utils/executors/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";



const RegisterTruckForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterTruckFormData>({
    resolver: zodResolver(registerTruckSchema),
    defaultValues: {
      truck_number: "",
      name: "",
      contact_number: "",
      owner_name: "",
      owner_contact: "",
      password: "",
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const onSubmit = async (data: RegisterTruckFormData) => {
    setLoading(true);
    try {

      const response = await createTruck(data);
      if (response?.status) {
        router.push("/auth")
        Toast.show({
          type: "success",
          text1: "truck Registered",
          text2: "Your truck has been registered successfully",

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
      <RegisterTextInput control={control} error={errors.truck_number} autoCapitalize="words" autoComplete="name" iconName="car-outline" label="Truck Number" name="truck_number" placeholder="Enter truck number" />
      <RegisterTextInput control={control} error={errors.name} autoCapitalize="words" autoComplete="name" iconName="person-outline" label="Driver Name" name="name" placeholder="Enter driver name" />
      <RegisterTextInput control={control} error={errors.contact_number} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label="Driver Mobile Number" name="contact_number" placeholder="Enter mobile number" />
      <RegisterTextInput control={control} error={errors.owner_name} autoCapitalize="words" autoComplete="name" iconName="person-outline" label="Owner Name" name="owner_name" placeholder="Enter owner name" />
      <RegisterTextInput control={control} error={errors.owner_contact} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label="Owner Mobile Number" name="owner_contact" placeholder="Enter onwer mobile number" />
      <RegisterPasswordInput control={control} name="password" label="Password" placeholder="Create password" error={errors.password} />
      <PrimaryButton text="Create Truck" isLoading={loading} onPress={handleSubmit(onSubmit)} />
    </View>
  )
};

export default RegisterTruckForm;

const styles = StyleSheet.create({


})
