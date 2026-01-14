import { View, StyleSheet, Animated } from "react-native";
import LottieView from "lottie-react-native";
import { useRef, useEffect, useState } from "react";
import { Audio } from "expo-av";

type AnimLogoProps = {
  onFinish?: () => void;
};

export const AnimLogo = ({ onFinish }: AnimLogoProps) => {
  const lottieRef = useRef<LottieView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);
  const [ready, setReady] = useState(false); // son préchargé

  // Précharge le son au montage
  useEffect(() => {
    let isMounted = true;

    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/AnimLogo.mp3") // ton fichier audio
      );
      soundRef.current = sound;

      if (isMounted) setReady(true); // prêt à lancer animation et son
    }

    loadSound();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync(); // cleanup
      }
    };
  }, []);

  // Lancement du son et de l'animation quand tout est prêt
  useEffect(() => {
    if (ready && lottieRef.current && soundRef.current) {
      soundRef.current.playAsync(); // joue le son
    }
  }, [ready]);

  // Fondu à la fin de l'animation
  const handleFinish = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500, // durée du fondu
      useNativeDriver: true,
    }).start(async () => {
      // stoppe le son si encore en train de jouer
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }
      onFinish?.(); // appel du callback
    });
  };

  if (!ready) return null; // attend que le son soit prêt

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LottieView
        ref={lottieRef}
        source={require("../assets/anim/animLogo.json")}
        autoPlay
        loop={false}
        onAnimationFinish={handleFinish}
        style={{ width: 500, height: 500 }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2DD",
  },
});
