import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";

export function SceneLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "pixelgridtrial-linedownboldm": require("../assets/fonts/pixelgridtrial-linedownboldm.ttf"),
    "pixelgridtrial-linedownbolds": require("../assets/fonts/pixelgridtrial-linedownbolds.ttf"),
    "pixelgridtrial-linedownboldxl": require("../assets/fonts/pixelgridtrial-linedownboldxl.ttf"),
  });

  useEffect(() => {
    async function preload() {
      await Asset.fromModule(
        require("../assets/video/pixelvideo.mp4")
      ).downloadAsync();
      setReady(true);
    }
    preload();
  }, []);

  if (!ready || (!fontsLoaded && !fontError)) return null;

  return <>{children}</>;
}
