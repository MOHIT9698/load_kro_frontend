import RegisterPasswordInput from '@/components/common-components/form/register/RegisterPasswordInput';
import RegisterTextInput from '@/components/common-components/form/register/RegisterTextInput';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import { LoginFormData } from '@/constants/formData';
import { loginSchema } from '@/constants/schema';
import { loginUser } from '@/utils/executors/auth';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
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
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {

            const response = await loginUser(data);

            if (response?.status) {
                router.push("/")
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

    const handleForgotPassword = () => {
        console.log('Forgot password pressed');
    };

    const handleSignUp = () => {
        router.push("/auth");
    };
    const handleGoBack = () => {
        router.back();
    };


    return (
        <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]} >
            <StatusBar barStyle="light-content" backgroundColor="#ef4444" />
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons name="car" size={32} color="white" />
                </View>
                <Text style={styles.headerTitle}>TruckConnect</Text>
                <Text style={styles.headerSubtitle}>Connecting trucks & Companies</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Let’s Get Started</Text>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={60} // adjust based on your header height
                >
                    <ScrollView
                        // style={styles.content}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.formContainer}>
                            <RegisterTextInput control={control} error={errors.contact_number} keyboardType="phone-pad" autoComplete="tel" iconName="call-outline" label="Mobile Number" name="contact_number" placeholder="Enter mobile number" />
                            <RegisterPasswordInput control={control} name="password" label="Password" placeholder="Enter password" error={errors.password} />


                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={styles.rememberMeContainer}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                        {rememberMe && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                                    </View>
                                    <Text style={styles.rememberMeText}>Remember me</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </View>

                            <PrimaryButton text="Sign In" isLoading={loading} onPress={handleSubmit(onSubmit)} />

                            <View style={styles.signUpContainer}>
                                <Text style={styles.signUpText}>Don't have an account?</Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={styles.signUpLink}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

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
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#424242',
        marginBottom: 8,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FAFAFA',
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: '#212121',
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
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
    signInButton: {
        backgroundColor: '#E53935',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 24,
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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