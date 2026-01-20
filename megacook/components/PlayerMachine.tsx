import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

interface PlayerMachineProps {
  onVideoEnd?: () => void;
}

export const PlayerMachine = ({ onVideoEnd }: PlayerMachineProps) => {
  const player = useVideoPlayer(
    require("../assets/video/pixelvideo.mp4"),
    (player) => {
      player.loop = false;
    },
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    player.play();
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    const subscription = player.addListener("playToEnd", () => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onVideoEnd?.();
      });
    });
    return () => {
      subscription.remove();
    };
  }, [player, onVideoEnd, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.video, { opacity: fadeAnim }]}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="contain"
          nativeControls={false}
          allowsFullscreen={true}
          allowsPictureInPicture={false}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
