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
        // Précharger en parallèle tous les assets critiques
        await Promise.all([
          // Vidéo et modèle final
          Asset.fromModule(
            require("../assets/video/pixelvideo.mp4"),
          ).downloadAsync(),
          Asset.fromModule(finalplate).downloadAsync(),
          
          // Images de tous les ingrédients et chefs (en parallèle)
          ...preloadImages(),
        ]);
        
        // Précharger le modèle 3D final (après le téléchargement de l'asset)
        preloadModel(finalplate);
        
        setReady(true);
      } catch (error) {
        console.error("Error preloading assets:", error);
      }
    }
    preload();
  }, []);

  if (!fontsLoaded) return null;

  if (fontError) {
    console.error("Error loading fonts:", fontError);
    return null;
  }

  if (!ready) return null;

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

// Précharger les images - retourne un tableau de promesses pour Promise.all
function preloadImages(): Promise<any>[] {
  const imagePromises: Promise<any>[] = [];
  
  // Bases
  Object.values(basesData).forEach((base) => {
    const uri = getImageUri(base.image);
    if (uri) {
      imagePromises.push(Asset.fromURI(uri).downloadAsync());
    }
  });
  
  // Fruits
  Object.values(fruitsData).forEach((fruit) => {
    const uri = getImageUri(fruit.image);
    if (uri) {
      imagePromises.push(Asset.fromURI(uri).downloadAsync());
    }
  });
  
  // Sauces
  Object.values(saucesData).forEach((sauce) => {
    const uri = getImageUri(sauce.image);
    if (uri) {
      imagePromises.push(Asset.fromURI(uri).downloadAsync());
    }
  });
  
  // Autres
  Object.values(autresData).forEach((autre) => {
    const uri = getImageUri(autre.image);
    if (uri) {
      imagePromises.push(Asset.fromURI(uri).downloadAsync());
    }
  });
  
  // Chefs
  Object.values(chefsData).forEach((chef) => {
    const uri = getImageUri(chef.image);
    if (uri) {
      imagePromises.push(Asset.fromURI(uri).downloadAsync());
    }
  });
  
  return imagePromises;
}
