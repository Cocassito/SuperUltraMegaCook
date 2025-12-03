import { Mesh } from 'three';

export const RightView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[10, 4, 10]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={true} />
      </mesh>
    </group>
  );
};
