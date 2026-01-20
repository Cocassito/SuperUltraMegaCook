import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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

  useEffect(() => {
    player.play();
    const subscription = player.addListener("playToEnd", () => {
      onVideoEnd?.();
    });
    return () => {
      subscription.remove();
    };
  }, [player, onVideoEnd]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={true}
        allowsPictureInPicture={false}
      />
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
