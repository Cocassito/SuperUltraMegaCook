import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/video/loading.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.CONTAIN}
        style={styles.video}
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
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
