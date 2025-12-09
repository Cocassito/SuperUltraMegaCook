import { Mesh } from 'three';
import * as THREE from 'three';

type LeftViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onOpenOrder: () => void;
};

export const LeftView = ({ cubeRef, onOpenOrder }: LeftViewProps) => {
  return (
    <>
      <mesh ref={cubeRef} position={[-10, 8, 18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" visible={true} />
      </mesh>

      {/* Ticket de caisse */}
      <mesh
        position={[-16.5, 0.5, 8]}
        rotation={[Math.PI / 2, 0, Math.PI / 6]}
        onPointerDown={(e) => {
          e.stopPropagation();
          onOpenOrder();
        }}
      >
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial color="green" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
