import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PlayerBD } from "@/components/PlayerBD";
import { LoadingScreen } from "@/components/loadingScreen/LoadingScreen";
import SceneContent from "@/components/scene/SceneContent";

import customer from "/assets/models/character/customer.glb";
import sitdown from "/assets/models/character/sitdown.glb";
import walking from "/assets/models/character/walking.glb";
import scene from "/assets/models/environment/scene.glb";

import { Asset } from "expo-asset";
import { preloadModel } from "@/utils/PreloadModel";

export default function App() {
  const [ready, setReady] = useState(false);

  const [videoFinished, setVideoFinished] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    async function preloadAssets() {
      await Promise.all([
        Asset.fromModule(scene).downloadAsync(),
        preloadModel(scene),

        Asset.fromModule(customer).downloadAsync(),
        preloadModel(customer),

        Asset.fromModule(sitdown).downloadAsync(),
        preloadModel(sitdown),

        Asset.fromModule(walking).downloadAsync(),
        preloadModel(walking),

        Asset.fromModule(
          require("../assets/images/logo/Logo_MC_CompletOmbrage2.webp"),
        ).downloadAsync(),

        Asset.fromModule(
          require("../assets/video/VideoBDmegacook.mp4"),
        ).downloadAsync(),
      ]);

      setReady(true);
    }

    preloadAssets();
  }, []);

  if (!ready) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* PlayerBD visible tant que la vidéo n'est pas terminée */}
      {!videoFinished && <PlayerBD onVideoEnd={() => setVideoFinished(true)} />}

      {/* LoadingScreen visible après fin vidéo et avant que la scene soit prête */}
      {videoFinished && !sceneReady && <LoadingScreen />}

      {/* Scene visible uniquement quand elle est prête */}
      <SceneContent onSceneReady={() => setSceneReady(true)} />
    </View>
  );
}
