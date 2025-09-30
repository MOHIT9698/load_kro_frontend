import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AccountTypeOption {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const AccountTypeScreen: React.FC = () => {
  const router = useRouter();
  const accountTypes: AccountTypeOption[] = [
    {
      id: 'truck',
      title: 'Truck',
      description: 'Manage trucks, routes & find loads',
      icon: 'car-outline',
      color: '#ef4444',
    },
    {
      id: 'company',
      title: 'Company',
      description: 'Post loads & connect with trucks',
      icon: 'business-outline',
      color: '#ef4444',

    },
  ];

  const handleAccountTypeSelect = (type: string) => {
    router.push((`/auth/${type}`) as any);
  };

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]} >
      {/* <StatusBar barStyle="light-content" backgroundColor="#ef4444" /> */}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="car" size={32} color="white" />
        </View>
        <Text style={styles.headerTitle}>TruckConnect</Text>
        <Text style={styles.headerSubtitle}>Connecting trucks & Companies</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Choose Your Account Type</Text>

        {/* Account Type Options */}
        <View style={styles.optionsContainer}>
          {accountTypes.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handleAccountTypeSelect(option.id)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}15` }]}>
                  <Ionicons name={option.icon} size={24} color={option.color} />
                </View>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign In Section */}
        <View style={styles.signInSection}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 40,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  signInSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  signInLink: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
});

export default AccountTypeScreen;