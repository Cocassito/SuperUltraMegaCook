import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Animated } from "react-native";

export default function PixelButton({ label = "Play", onPress }) {
  const scale = new Animated.Value(1);

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start(() => onPress && onPress());
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      {/* Ombre pixelisée */}
      <View style={styles.shadowLayer}>
        {/* Bloc principal */}
        <Pressable onPressIn={pressIn} onPressOut={pressOut}>
          <View style={styles.button}>
            <Text style={styles.text}>{label}</Text>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shadowLayer: {
    backgroundColor: "#4B2474", // ombre sombre comme l'image
    padding: 6, // épaisseur pixel
  },

  button: {
    backgroundColor: "#C8A2DA", // violet clair intérieur
    paddingVertical: 8,
    paddingHorizontal: 24,

    /* Pixel borders fidèles */
    borderTopWidth: 6,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderColor: "#7C3FA6", // même pourtour que l'image

    /* Pas de coins arrondis = pixel art */
    borderRadius: 0,
  },

  text: {
    fontSize: 16,
    color: "#5A2B87",
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownboldm",
    textAlign: "center",
  },
});
