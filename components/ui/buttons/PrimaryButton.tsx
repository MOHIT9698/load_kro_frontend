import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProp {
    isLoading: boolean;
    text: string;
    onPress: (data: any) => void;
}

const PrimaryButton = ({ isLoading, onPress, text = "Button" }: ButtonProp) => {
    return (
        <TouchableOpacity
            style={[styles.createButton, isLoading && styles.createButtonDisabled]}
            onPress={onPress}
            disabled={isLoading}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.createButtonText}>{text}</Text>
            )}
        </TouchableOpacity>
    )
};

export default PrimaryButton;



const styles = StyleSheet.create({

    createButton: {
        backgroundColor: '#ef4444',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 32,
        shadowColor: '#ef4444',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    createButtonDisabled: {
        backgroundColor: '#9ca3af',
        shadowOpacity: 0,
        elevation: 0,
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});