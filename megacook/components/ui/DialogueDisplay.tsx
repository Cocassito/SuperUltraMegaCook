import { View, Text, StyleSheet } from "react-native";

interface DialogueDisplayProps {
  text: string | null;
}

export const DialogueDisplay = ({ text }: DialogueDisplayProps) => {
  if (!text) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text.toUpperCase()}</Text>
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
