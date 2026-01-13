import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

interface PlayerBDProps {
  onVideoEnd?: () => void;
}

export const PlayerBD = forwardRef<Video, PlayerBDProps>(
  ({ onVideoEnd }, ref) => {
    return (
      <View style={styles.container}>
        <Video
          ref={ref}
          source={require("../assets/video/VideoBDmegacook.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          shouldPlay
          isLooping={false}
          resizeMode={ResizeMode.CONTAIN}
          style={styles.video}
          onPlaybackStatusUpdate={(status) => {
            if ("didJustFinish" in status && status.didJustFinish) {
              onVideoEnd?.();
            }
          }}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 4,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 12, // optionnel
  },
});
