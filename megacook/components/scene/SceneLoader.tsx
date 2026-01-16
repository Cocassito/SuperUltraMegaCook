import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { preloadModel } from "@/utils/PreloadModel";
import finalplate from "megacook/assets/models/ingredients/finalplate.glb";

export function SceneLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "pixelgridtrial-linedownboldm": require("../assets/fonts/pixelgridtrial-linedownboldm.ttf"),
    "pixelgridtrial-linedownbolds": require("../assets/fonts/pixelgridtrial-linedownbolds.ttf"),
    "pixelgridtrial-linedownboldxl": require("../assets/fonts/pixelgridtrial-linedownboldxl.ttf"),
  });

  useEffect(() => {
    async function preload() {
      try {
        await Promise.all([
          Asset.fromModule(
            require("../assets/video/pixelvideo.mp4")
          ).downloadAsync(),
          Asset.fromModule(finalplate).downloadAsync(),
          preloadModel(finalplate),
        ]);
        setReady(true);
      } catch (error) {
        console.error("Error preloading assets:", error);
      }
    }
    preload();
  }, []);

  if (!fontsLoaded) return null; // Wait for fonts to load

  if (fontError) {
    console.error("Error loading fonts:", fontError);
    return null; // Handle font loading error
  }

  if (!ready) return null; // Wait for assets to preload

  return <>{children}</>;
}
