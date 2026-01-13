import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/video/Loading.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.COVER}
        style={StyleSheet.absoluteFill}
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
    flex: 1,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
