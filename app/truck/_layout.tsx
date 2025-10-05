import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import { CreateRoutePlusIcon, MapTabIcon, RouteIcon, TruckProfileIcon } from '@/assets/icons/SvgIcons';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TruckLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerStyle: {
          backgroundColor: Colors.light.tint,
          height: 120

        },
        headerShown: true,
        tabBarButton: HapticTab,
        headerTitle: () => null,
        headerLeft: () => (
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>TRUCKSY</Text>
            <Text style={styles.headerSubtitle}>{t("Connecting Trucks with Companies")} </Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() =>router.push("/auth")}
            style={styles.profileButton}
          >
            <TruckProfileIcon size={35} fill={Colors.light.tint} />
          </TouchableOpacity>
        ),


      }}>
      <Tabs.Screen
        name="TruckMap"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <MapTabIcon size={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="CreateRoute"
        options={{
          title: 'Create',
          headerShown:false,
          tabBarIcon: ({ color }) => <CreateRoutePlusIcon size={28} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="TruckRoute"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color }) => <RouteIcon size={28} fill={color} />,
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
 titleContainer: {
    marginLeft: 16,
    maxWidth: 220, // 👈 limit width to prevent text wrapping
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  profileButton: {
    marginRight: 16,
    backgroundColor: Colors.light.background,
    padding: 4,
    paddingVertical:3,
    borderRadius: 20, // use numeric instead of '50%'
  },



})