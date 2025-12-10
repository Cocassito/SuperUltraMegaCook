import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "pixelgridtrial-linedownboldm": require("../assets/fonts/pixelgridtrial-linedownboldm.otf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
