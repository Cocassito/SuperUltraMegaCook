import { useFonts } from "expo-font";
import SceneContent from "./SceneContent";
import { SceneLoader } from "./SceneLoader";
import { useState } from "react";

type SceneProps = {
  onSceneReady?: () => void;
};

export default function Scene({ onSceneReady }: SceneProps) {
  return (
    <SceneLoader>
      <SceneContent onSceneReady={onSceneReady} />
    </SceneLoader>
  );
}
