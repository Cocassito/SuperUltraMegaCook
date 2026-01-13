import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";

type AnimLogoProps = {
  onFinish?: () => void;
};

export const AnimLogo = ({ onFinish }: AnimLogoProps) => {
  const lottieRef = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <LottieView
        ref={lottieRef}
        source={require("../assets/anim/animLogo.json")}
        autoPlay
        loop={false} // ⛔ pas de loop
        onAnimationFinish={() => {
          onFinish?.(); // ✅ animation terminée
        }}
        style={{ width: 300, height: 300 }}
      />
    </View>
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
    backgroundColor: "black",
  },
});
