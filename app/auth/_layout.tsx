import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import i18n from '@/src/i18n';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const unstable_settings = {
    anchor: '(tabs)',
};

const languages = [
    { label: 'English', code: 'en' },
    { label: 'हिन्दी', code: 'hi' },
    { label: 'ਪੰਜਾਬੀ', code: 'pa' },
    { label: 'தமிழ்', code: 'ta' },
    { label: 'తెలుగు', code: 'te' },
    { label: 'ಕನ್ನಡ', code: 'kn' },
    { label: 'मराठी', code: 'mr' },
    { label: 'বাংলা', code: 'bn' },
];

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [modalVisible, setModalVisible] = useState(false);
    const onSelectLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode)
        setModalVisible(false);
    };


    return (
        <>

            <Stack screenOptions={{ headerShown: false }} />
            {/* Floating Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="language" size={24} color="white" />
            </TouchableOpacity>

            <Modal
                transparent
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Language</Text>
                        {languages.map(lang => (
                            <TouchableOpacity
                                key={lang.code}
                                onPress={() => onSelectLanguage(lang.code)}
                                style={styles.languageOption}
                            >
                                <Text style={styles.languageText}>{lang.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </>

    );
}


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#ef4444',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        zIndex: 1000,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxHeight: '50%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    languageOption: {
        paddingVertical: 12,
    },
    languageText: {
        fontSize: 16,
    },
});