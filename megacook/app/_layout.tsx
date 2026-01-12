import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "pixelgridtrial-linedownboldm": require("../assets/fonts/pixelgridtrial-linedownboldm.otf"),
    "pixelgridtrial-linedownbolds": require("../assets/fonts/pixelgridtrial-linedownbolds.otf"),
    "pixelgridtrial-linedownboldxl": require("../assets/fonts/pixelgridtrial-linedownboldxl.otf"),
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
