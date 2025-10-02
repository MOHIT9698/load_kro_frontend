import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProp {
    isLoading: boolean;
    text: string;
    onPress: (data: any) => void;
}

const TextButton = ({ isLoading, onPress, text = "Button" }: ButtonProp) => {
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

export default TextButton;



const styles = StyleSheet.create({

    createButton: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginBottom: 32,
     
        elevation: 4,
    },
    createButtonDisabled: {
        backgroundColor: '#9ca3af',
        shadowOpacity: 0,
        elevation: 0,
    },
    createButtonText: {
        color: '#ef4444',
        fontSize: 18,
        fontWeight: '600',
    },
});