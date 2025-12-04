import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import PixelButton from "@/components/ui/button/PixelButton";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";

export default function HomePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      await Asset.fromModule(
        require("../assets/images/logo/Logo_MC_Complet.webp")
      ).downloadAsync();

      setReady(true);
    }

    loadAssets();
  }, []);

  const handleStart = () => {
    router.push("/App");
  };

  if (!ready) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo/Logo_MC_Complet.webp")}
        style={styles.logo}
        contentFit="contain"
      />

      <PixelButton
        onPress={handleStart}
        title="Nouvelle partie"
        colorPrimary="#C8A2DA"
        colorSecondary="#773B94"
        colorBorder="#55256D"
        colorInnerShadow="#E9DAF0"
      />
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
});
