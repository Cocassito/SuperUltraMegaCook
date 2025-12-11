import { Mesh } from 'three';

type FrontViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onValidate: () => void;
};

export const FrontView = ({ cubeRef }: FrontViewProps) => {
  return (
    <group>
      {/* Cube invisible pour la caméra */}
      <mesh ref={cubeRef} position={[0, 7, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={false} />
      </mesh>
    </group>
  );
};