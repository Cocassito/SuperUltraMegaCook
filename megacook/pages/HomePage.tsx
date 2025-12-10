import { ImageBackground, StyleSheet, View, Animated } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState, useRef } from "react";
import { Asset } from "expo-asset";
import NewGameButton from "@/components/ui/button/NewGameButton";
import LoadGameButton from "@/components/ui/button/LoadGameButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingsButton } from "@/components/ui/button/SettingsButton";
import { SettingsPopup } from "@/components/ui/popup/SettingsPopup";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function loadAssets() {
      await Asset.fromModule(
        require("../assets/images/logo/Logo_MC_CompletOmbrage2.webp")
      ).downloadAsync();
      setReady(true);
    }
    loadAssets();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showSettings ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showSettings]);

  if (!ready) return null;

  return (
    <ImageBackground
      source={require("../assets/images/background/BackgroundScene.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      {showSettings && <View style={styles.overlay2} />}

      <SettingsPopup
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View
            style={{
              position: "absolute",
              top: 24,
              left: 24,
              zIndex: 2,
            }}
          >
            <SettingsButton onOpen={() => setShowSettings(true)} />
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
        </Animated.View>
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

  overlay2: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },

  content: {
    justifyContent: "center",
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
