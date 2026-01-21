import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDialogueSound } from "@/hooks/useButtonSound";
import { useDialogueAnimation } from "@/hooks/useDialogueAnimation";

interface DialogueDisplayProps {
  text: string | null;
}

export const DialogueDisplay = ({ text }: DialogueDisplayProps) => {
  const playDialogueSound = useDialogueSound();
  const { opacity, displayedText } = useDialogueAnimation(text);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!text) return null;

  if (text) {
    playDialogueSound();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.text}>{displayedText.toUpperCase()}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 9998,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "pixelgridtrial-linedownbolds",
  },
});
