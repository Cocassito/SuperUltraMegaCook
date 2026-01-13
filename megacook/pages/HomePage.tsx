import { ImageBackground, StyleSheet, View, Animated } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState, useRef, useCallback } from "react";
import { Asset } from "expo-asset";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

import NewGameButton from "@/components/ui/button/NewGameButton";
import LoadGameButton from "@/components/ui/button/LoadGameButton";
import { SettingsButton } from "@/components/ui/button/SettingsButton";
import { SettingsPopup } from "@/components/ui/popup/SettingsPopup";
import { preloadModel } from "@/utils/PreloadModel";
import { AnimLogo } from "@/components/AnimLogo";

import scene from "../assets/models/environment/scene.glb";

const AMBIENT_VOLUME = 0.3;
const FADE_DURATION = 1500;
const FADE_STEP = 50;

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  /* ------------------ Assets ------------------ */

  useEffect(() => {
    Asset.fromModule(scene).downloadAsync();
    preloadModel(scene);
  }, []);

  useEffect(() => {
    async function loadAssets() {
      await Asset.fromModule(
        require("../assets/images/logo/Logo_MC_CompletOmbrage2.webp")
      ).downloadAsync();
      setReady(true);
    }
    loadAssets();
  }, []);

  /* ------------------ UI fade ------------------ */

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showSettings ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showSettings]);

  /* ------------------ Audio helpers ------------------ */

  const fadeInSound = async (sound: Audio.Sound) => {
    let volume = 0;
    await sound.setVolumeAsync(0);

    const interval = setInterval(async () => {
      volume += AMBIENT_VOLUME / (FADE_DURATION / FADE_STEP);
      if (volume >= AMBIENT_VOLUME) {
        volume = AMBIENT_VOLUME;
        clearInterval(interval);
      }
      await sound.setVolumeAsync(volume);
    }, FADE_STEP);
  };

  const fadeOutAndStopSound = async () => {
    const sound = soundRef.current;
    if (!sound) return;

    let volume = AMBIENT_VOLUME;

    const interval = setInterval(async () => {
      volume -= AMBIENT_VOLUME / (FADE_DURATION / FADE_STEP);
      if (volume <= 0) {
        volume = 0;
        clearInterval(interval);
        await sound.setVolumeAsync(0);
        await sound.stopAsync();
        await sound.unloadAsync();
        soundRef.current = null;
      } else {
        await sound.setVolumeAsync(volume);
      }
    }, FADE_STEP);
  };

  const playAmbientSound = async () => {
    if (soundRef.current) return;

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/music.mp3"),
      {
        isLooping: true,
        volume: 0,
      }
    );

    soundRef.current = sound;
    await sound.playAsync();
    await fadeInSound(sound);
  };

  /* ------------------ Navigation focus handling ------------------ */

  useFocusEffect(
    useCallback(() => {
      // HomePage focused
      return () => {
        // HomePage blurred (NewGame / Load / back / etc.)
        fadeOutAndStopSound();
      };
    }, [])
  );

  /* ------------------ Render ------------------ */

  if (!ready) return null;

  if (showLoading) {
    return (
      <AnimLogo
        onFinish={async () => {
          setShowLoading(false);
          await playAmbientSound();
        }}
      />
    );
  }

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

/* ------------------ Styles ------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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
