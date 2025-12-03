import { Mesh } from 'three';

export const BottomView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" visible={true} />
      </mesh>
    </group>
  );
};
