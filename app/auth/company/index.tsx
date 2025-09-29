import RegisterCompanyForm from '@/components/pages/Register/RegisterCompanyForm';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const CreateCompanyAccountScreen: React.FC = () => {
    const router = useRouter();
   

    const handleCreateAccount = async () => {
      
            Alert.alert(
                'Success',
                'Company account created successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate to dashboard or login
                            console.log('Navigate to company dashboard');
                        },
                    },
                ]
            );
     
    };

    const handleGoBack = () => {
        // Navigate back to previous screen
        router.back();
    };

    return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]} >
            <StatusBar barStyle="light-content" backgroundColor="#ef4444" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Company Account</Text>
            </View>

            {/* Form */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
               
               <RegisterCompanyForm/>
                {/* <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, errors.fullName && styles.inputError]}
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChangeText={(value) => handleInputChange('fullName', value)}
                            autoCapitalize="words"
                            autoComplete="name"
                        />
                    </View>
                    {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="call-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, errors.phoneNumber && styles.inputError]}
                            placeholder="Enter your phone"
                            value={formData.phoneNumber}
                            onChangeText={(value) => handleInputChange('phoneNumber', value)}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                        />
                    </View>
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Company Name</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="business-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, errors.companyName && styles.inputError]}
                            placeholder="Enter company name"
                            value={formData.companyName}
                            onChangeText={(value) => handleInputChange('companyName', value)}
                            autoCapitalize="words"
                        />
                    </View>
                    {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Business License</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.inputWithoutIcon, errors.businessLicense && styles.inputError]}
                            placeholder="Enter business license"
                            value={formData.businessLicense}
                            onChangeText={(value) => handleInputChange('businessLicense', value)}
                            autoCapitalize="characters"
                        />
                    </View>
                    {errors.businessLicense && <Text style={styles.errorText}>{errors.businessLicense}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Address</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="location-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, errors.address && styles.inputError]}
                            placeholder="Enter full address"
                            value={formData.address}
                            onChangeText={(value) => handleInputChange('address', value)}
                            autoCapitalize="words"
                            multiline={true}
                            numberOfLines={2}
                        />
                    </View>
                    {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, errors.password && styles.inputError]}
                            placeholder="Create password"
                            value={formData.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#9ca3af"
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <TouchableOpacity
                    style={[styles.createButton, isLoading && styles.createButtonDisabled]}
                    onPress={handleCreateAccount}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <Text style={styles.createButtonText}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Text>
                </TouchableOpacity> */}

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        backgroundColor: '#ef4444',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputIcon: {
        marginRight: 12,
        marginTop: 16, // Align with text input
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: '#374151',
        textAlignVertical: 'top',
    },
    inputWithoutIcon: {
        paddingHorizontal: 16,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    eyeIcon: {
        padding: 4,
        marginLeft: 8,
        marginTop: 12,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        marginTop: 4,
        marginLeft: 4,
    },
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
    bottomSpacing: {
        height: 50,
    },
});

export default CreateCompanyAccountScreen;