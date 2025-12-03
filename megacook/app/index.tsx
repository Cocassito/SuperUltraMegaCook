import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import PixelButton from "@/components/ui/button/PixelButton";

export default function Menu() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/App");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo/Logo_MC_Complet.webp")}
        style={styles.logo}
        contentFit="contain"
      />{" "}
      <PixelButton label="Commencer" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2DD",
    gap: 4,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
