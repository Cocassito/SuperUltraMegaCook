//fait un composant qui rends une image png
import React from "react";
import { Image } from "react-native";

export const LeftInfo = () => {
  return (
    <Image
      source={require("../assets/images/icon/l.png")}
      resizeMode="contain"
    />
  );
};
