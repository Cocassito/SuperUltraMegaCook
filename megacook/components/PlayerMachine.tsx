import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

interface PlayerMachineProps {
  onVideoEnd?: () => void;
}

export const PlayerMachine = forwardRef<Video, PlayerMachineProps>(
  ({ onVideoEnd }, ref) => {
    return (
      <View style={styles.container}>
        <Video
          ref={ref}
          source={require("../assets/video/pixelvideo.mp4")}
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
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
