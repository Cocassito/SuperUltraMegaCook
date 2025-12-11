import { Mesh } from 'three';

export const BottomLeftView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[-10, 0, 10]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" visible={false} />
      </mesh>
    </group>
  );
};
