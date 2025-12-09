import Model from "./Model";
import scene6 from "../assets/models/environment/scene6.glb";

export const Environment = () => {
  return (
    <group position={[-28, -11.6, -18]} rotation={[0, -Math.PI / 2, 0]}>
      <Model src={scene6} scale={8} />
    </group>
  );
};
