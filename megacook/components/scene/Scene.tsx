import SceneContent from "./SceneContent";
import { SceneLoader } from "./SceneLoader";

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
