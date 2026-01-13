import React, { useState } from "react";
import { View } from "react-native";
import { PlayerBD } from "@/components/PlayerBD";
import { LoadingScreen } from "@/components/loadingScreen/LoadingScreen";
import Scene from "@/components/Scene";

export default function App() {
  const [videoFinished, setVideoFinished] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* PlayerBD visible tant que la vidéo n'est pas terminée */}
      {!videoFinished && <PlayerBD onVideoEnd={() => setVideoFinished(true)} />}

      {/* LoadingScreen visible après fin vidéo et avant que la scene soit prête */}
      {videoFinished && !sceneReady && <LoadingScreen />}

      {/* Scene visible uniquement quand elle est prête */}
      <Scene onSceneReady={() => setSceneReady(true)} />
    </View>
  );
}
