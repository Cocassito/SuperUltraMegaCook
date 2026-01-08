import { Mesh } from 'three';

export const BottomRightView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[28, -3, -18]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="purple" visible={true} />
      </mesh>
    </group>
  );
};
 