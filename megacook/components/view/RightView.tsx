import { Mesh } from 'three';

export const RightView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[10, 0, 10]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={false} />
      </mesh>
    </group>
  );
};
