//fait un composant qui rends une image png
import React from "react";
import { Image, StyleSheet } from "react-native";

export const RightInfo = () => {
  return (
    <Image
      source={require("../assets/images/icon/r.png")}
      resizeMode="contain"
    />
  );
};
