import { Mesh } from 'three';

export const BottomRightView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[32, -9.9, -26]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="purple" visible={true} />
      </mesh>
    </group>
  );
};
 