import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import TextButton from "@/components/ui/buttons/TextButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, View } from "react-native";
import OTPTextInput from 'react-native-otp-textinput';

interface OtpVerificationProps {
    showOtpModal: boolean;
    setShowOtpModal: (visible: boolean) => void;
    getOtp: (otp: string) => void;
    resendOtp: () => void;
    loading: boolean;
}



const OtpVerification = ({ showOtpModal, setShowOtpModal, getOtp, resendOtp, loading }: OtpVerificationProps) => {
    const {t} = useTranslation();
    const [otp, setOtp] = useState("");


    const submitOtp = () => {
        if (getOtp) {
            getOtp(otp);
        }
    }
    return <>
        <Modal
            visible={showOtpModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowOtpModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{t("Enter OTP")}</Text>

                    <OTPTextInput
                        inputCount={6}
                        handleTextChange={(val) => setOtp(val)}
                        containerStyle={{ marginBottom: 20 }}
                        tintColor="#ef4444"
                        offTintColor="#ccc"
                        textInputStyle={{
                            width: 45,
                            height: 50,
                            borderRadius: 8,
                            borderWidth: 1,
                            // fontSize: 20,
                        }}
                    />


                    <PrimaryButton text={t("Submit")} isLoading={loading} onPress={submitOtp} />
                    <TextButton text={t("Resend OTP")} isLoading={false} onPress={resendOtp} />
                </View>
            </View>
        </Modal>
    </>;
}



const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    otpInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },

});


export default OtpVerification;