// src/components/AppHeader.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { RouteIcon } from "@/assets/icons/SvgIcons"; // or your profile icon

export default function AppHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Left section: App name + tagline */}
      <View>
        <Text style={styles.appName}>LoadMatch Pro</Text>
        <Text style={styles.tagline}>Find loads on your route</Text>
      </View>

      {/* Right section: Profile / truck icon */}
      <TouchableOpacity onPress={() => router.push("/profile")} style={styles.iconWrapper}>
        <View style={styles.iconCircle}>
          <RouteIcon size={22} fill="#fff" />
          <View style={styles.statusDot} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E50914", // solid red (Netflix-style red)
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45, // for safe area (status bar)
    paddingBottom: 14,
    paddingHorizontal: 16,
    height: 100,
  },
  appName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  tagline: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.85,
    marginTop: 2,
  },
  iconWrapper: {
    padding: 4,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00C853", // bright green
    position: "absolute",
    top: 6,
    right: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
