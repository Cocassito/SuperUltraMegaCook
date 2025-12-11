import { Mesh } from 'three';

type BottomViewProps = {
  cubeRef: React.RefObject<Mesh>;
};

export const BottomView = ({ cubeRef }: BottomViewProps) => {
  return (
    <group>
      <mesh ref={cubeRef} position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" visible={false} />
      </mesh>
    </group>
  );
};
