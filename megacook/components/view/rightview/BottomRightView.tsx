import { Mesh } from 'three';

export const BottomRightView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[28, -3, -18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="purple" visible={false} />
      </mesh>
    </group>
  );
};
 