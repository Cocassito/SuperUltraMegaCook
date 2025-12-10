import Model from "./Model";
import scene from "../assets/models/environment/scene.glb";

export const Environment = () => {
  return (
    <group position={[-28, -11.6, -21]} rotation={[0, -Math.PI / 2, 0]}>
      <Model src={scene} scale={8} />
    </group>
  );
};
