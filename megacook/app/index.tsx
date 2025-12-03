import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

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
      />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text>Commencer</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#C8A2DA",
    color: "#55256D",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontSize: 20,
    textAlign: "center",
  },
});
