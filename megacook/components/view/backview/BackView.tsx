import { Mesh } from 'three';

export const BackView = ({ cubeRef }: { cubeRef: React.RefObject<Mesh> }) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[0, 7, 24]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="pink" visible={true} />
      </mesh>
    </group>
  );
};
