import { StyleSheet, View, Animated } from "react-native";
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
import { AnimLogo } from "@/components/AnimLogo";
import { LoadPopup } from "@/components/ui/popup/LoadPopup";

const AMBIENT_VOLUME = 0.3;
const FADE_DURATION = 1500;
const FADE_STEP = 50;

export default function HomePage() {
  /* ------------------ Backgrounds ------------------ */
  const BACKGROUNDS = [
    require("../assets/images/starter/1.png"),
    require("../assets/images/starter/2.png"),
    require("../assets/images/starter/3.png"),
    require("../assets/images/starter/4.png"),
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  /* ------------------ State ------------------ */
  const [ready, setReady] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  /* ------------------ Preload assets ------------------ */
  useEffect(() => {
    async function preloadAssets() {
      await Promise.all([
        Asset.fromModule(
          require("../assets/images/logo/Logo_MC_CompletOmbrage2.webp"),
        ).downloadAsync(),
        Asset.fromModule(
          require("../assets/video/VideoBDmegacook.mp4"),
        ).downloadAsync(),
      ]);
      setReady(true);
    }

    preloadAssets();
  }, []);

  /* ------------------ UI fade ------------------ */
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showSettings ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showSettings]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showLoad ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showLoad]);

  /* ------------------ Background animation ------------------ */
  useEffect(() => {
    const animateBackground = () => {
      opacity.setValue(0);
      translateX.setValue(0);
      translateY.setValue(0);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: -15,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -20,
            duration: 8000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
      });
    };

    animateBackground();
  }, [bgIndex]);

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
      },
    );

    soundRef.current = sound;
    await sound.playAsync();
    await fadeInSound(sound);
  };

  /* ------------------ Navigation focus handling ------------------ */
  useFocusEffect(
    useCallback(() => {
      return () => {
        fadeOutAndStopSound();
      };
    }, []),
  );

  /* ------------------ Conditional render ------------------ */
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

  /* ------------------ Main render ------------------ */
  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <Animated.Image
        source={BACKGROUNDS[bgIndex]}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity,
            transform: [{ translateX }, { translateY }, { scale: 1.6 }],
          },
        ]}
        resizeMode="cover"
      />

      {/* Overlay layers */}
      <View style={styles.overlay} />
      {showSettings && <View style={styles.overlay2} />}
      {showLoad && <View style={styles.overlay2} />}

      {/* Popups */}
      <SettingsPopup
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <LoadPopup visible={showLoad} onClose={() => setShowLoad(false)} />

      {/* UI */}
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
            <LoadGameButton onOpen={() => setShowLoad(true)} />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF2DD",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
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
