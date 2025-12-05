import { ImageBackground, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import PixelButton from "@/components/ui/button/PixelButtonComponent";
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import NewGameButton from "@/components/ui/button/NewGameButton";
import LoadGameButton from "@/components/ui/button/LoadGameButton";
import SettingsButton from "@/components/ui/button/SettingsButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      await Asset.fromModule(
        require("../assets/images/logo/Logo_MC_CompletOmbrage2.webp")
      ).downloadAsync();
      setReady(true);
    }
    loadAssets();
  }, []);

  if (!ready) return null;

  return (
    <ImageBackground
      source={require("../assets/images/background/BackgroundScene.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
            }}
          >
            <SettingsButton />
          </View>
          <Image
            source={require("../assets/images/logo/Logo_MC_CompletOmbrage2.webp")}
            style={styles.logo}
            contentFit="contain"
          />

          <NewGameButton />

          <View style={{ marginTop: 6 }}>
            <LoadGameButton />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  content: {
    alignItems: "center",
    gap: 24,
    zIndex: 2,
    flex: 1,
  },

  logo: {
    width: 200,
    height: 150,
  },
});
