import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { preloadModel } from "@/utils/PreloadModel";
import finalplate from "megacook/assets/models/ingredients/finalplate.glb";
import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import chefsData from "@/data/chefsData";
import { ImageSourcePropType } from "react-native/Libraries/Image/Image";

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
            require("../assets/video/pixelvideo.mp4"),
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

function getImageUri(image: ImageSourcePropType): string | undefined {
  if (typeof image === "number") {
    const asset = Asset.fromModule(image);
    return asset.localUri || asset.uri;
  } else if (
    typeof image === "object" &&
    !Array.isArray(image) &&
    "uri" in image
  ) {
    return image.uri;
  }
  return undefined;
}

// Preload images before rendering the component
async function preloadImages() {
  try {
    await Promise.all([
      ...Object.values(basesData).map((base) => {
        const uri = getImageUri(base.image);
        if (uri) {
          return Asset.fromURI(uri).downloadAsync();
        }
      }),
      ...Object.values(fruitsData).map((fruit) => {
        const uri = getImageUri(fruit.image);
        if (uri) {
          return Asset.fromURI(uri).downloadAsync();
        }
      }),
      ...Object.values(saucesData).map((sauce) => {
        const uri = getImageUri(sauce.image);
        if (uri) {
          return Asset.fromURI(uri).downloadAsync();
        }
      }),
      ...Object.values(autresData).map((autre) => {
        const uri = getImageUri(autre.image);
        if (uri) {
          return Asset.fromURI(uri).downloadAsync();
        }
      }),
      ...Object.values(chefsData).map((chef) => {
        const uri = getImageUri(chef.image);
        if (uri) {
          return Asset.fromURI(uri).downloadAsync();
        }
      }),
    ]);
  } catch (error) {
    console.error("Error preloading images:", error);
  }
}

preloadImages();
