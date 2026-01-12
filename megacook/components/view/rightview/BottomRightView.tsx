import { Mesh } from 'three';

export const BottomRightView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[30, -6.5, -22]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial color="purple" visible={true} />
      </mesh>
    </group>
  );
};
 