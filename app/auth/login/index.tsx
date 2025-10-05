import RegisterPasswordInput from '@/components/common-components/form/register/RegisterPasswordInput';
import RegisterTextInput from '@/components/common-components/form/register/RegisterTextInput';
import OtpVerification from '@/components/pages/Register/OtpVerification';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import { LoginFormData } from '@/constants/formData';
import { loginSchema } from '@/constants/schema';
import { loginUser, resendOtpVerification, VerifyRegistration } from '@/utils/executors/auth';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
    Animated,
    Easing,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function SignInScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [truckId, setTruckId] = useState<string | null>(null);
    const [companyId, setCompanyId] = useState<string | null>(null);


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            contact_number: "",
            password: "",
        },
    });

    // Animated header height
    const headerHeight = useRef(new Animated.Value(315)).current;

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => {
            Animated.timing(headerHeight, {
                toValue: 210,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start();
        });

        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(headerHeight, {
                toValue: 315,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const onSubmit = async (data: LoginFormData) => {
                                // router.push("/truck/TruckMap")

        setLoading(true);
        try {
            const response = await loginUser(data);
            if (response?.status) {
                if (response?.verified === true) {
                    Toast.show({
                        type: "success",
                        text1: t("Login Successful"),

                    });
                    console.log("response",response);
                    

                    if (Platform.OS === 'web') {
                        localStorage.setItem("auth_token", response.token);
                        localStorage.setItem("user_type", response.user_type);

                    } else {
                        await AsyncStorage.setItem('auth_token', response.token);
                        await AsyncStorage.setItem('user_type', response.user_type);

                    }

                    if (response?.user_type === "truck") {
                        router.push("/truck/TruckMap")
                    } else {
                        router.push("/company/CompanyMap")
                    }
                } else {

                    setShowOtpModal(true);
                    if (response?.truck_id) {
                        setTruckId(response.truck_id);
                    } else {
                        setCompanyId(response?.company_id);
                    }
                    if (Platform.OS === 'web') {
                        localStorage.setItem("reg_token", response.token)
                    } else {
                        await AsyncStorage.setItem('reg_token', response.token);
                    }

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

    const handleForgotPassword = () => {
        console.log('Forgot password pressed');
    };

    const handleSignUp = () => {
        router.replace("/auth");
    };

    const verifyOtp = async (otp: string) => {
        setOtpLoading(true);
        const data = {
            otp: otp,
            ...(truckId ? { truck_id: truckId } : { company_id: companyId })
        };
        try {

            const response = await VerifyRegistration(data);

            if (response?.status) {
                Toast.show({
                        type: "success",
                    text1: response?.message ?? t("Otp Verified"),
                    text2: t("Registered successfully"),

                });
                setShowOtpModal(false);
                router.push("/")

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


    const resendOtp = async () => {
        const data = {
            ...(truckId ? { truck_id: truckId } : { company_id: companyId })
        };
        try {

            const response = await resendOtpVerification(data);

            if (response?.status) {
                Toast.show({
                        type: "success",
                    text1: response?.message ?? t("Otp resend successfull "),

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
    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
            <StatusBar barStyle="light-content" backgroundColor="#ef4444" />

            {/* ✅ Animated Header */}
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Image
                    source={require("../../../assets/images/truckLogo.png")}

                    style={{ width: 140, height: 90 }}
                />
                <Text style={styles.headerTitle}>LOADKRO</Text>
                <Text style={styles.headerSubtitle}>{t("Connecting Trucks with Companies")}</Text>
            </Animated.View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        <Text style={styles.title}>{t("Let’s Get Started")}</Text>
                        <View style={styles.formContainer}>
                            <RegisterTextInput
                                control={control}
                                error={errors.contact_number}
                                keyboardType="phone-pad"
                                autoComplete="tel"
                                iconName="call-outline"
                                label={t("Mobile Number")}
                                name="contact_number"
                                placeholder={t("Enter mobile number")}
                            />
                            <RegisterPasswordInput
                                control={control}
                                name="password"
                                label={t("Password")}
                                placeholder={t("Enter password")}
                                error={errors.password}
                            />

                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={styles.rememberMeContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                        {rememberMe && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                                    </View>
                                    <Text style={styles.rememberMeText}>{t("Remember me")}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={styles.forgotPasswordText}>{t("Forgot Password?")}</Text>
                                </TouchableOpacity>
                            </View>

                            <PrimaryButton text={t("Sign In")} isLoading={loading} onPress={handleSubmit(onSubmit)} />

                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>{t("Don't have an account?")}</Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={styles.signUpLink}>{t("Sign Up")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <OtpVerification getOtp={verifyOtp} loading={otpLoading} resendOtp={resendOtp} setShowOtpModal={setShowOtpModal} showOtpModal={showOtpModal} />

        </SafeAreaView>
    );
}

// ✅ Updated styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        backgroundColor: '#ef4444',
        paddingVertical: 80,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        marginLeft: 6,
        fontFamily: "Inter_700Bold",
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        paddingHorizontal: 4,
        paddingBottom: 40,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#BDBDBD',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#E53935',
        borderColor: '#E53935',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#616161',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#E53935',
        fontWeight: '500',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    signUpText: {
        fontSize: 14,
        color: '#757575',
        marginRight: 4,
    },
    signUpLink: {
        fontSize: 14,
        color: '#E53935',
        fontWeight: '600',
    },
});
