import { Mesh } from 'three';

type BottomViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onNavigateToFront: () => void;
};

export const BottomView = ({ cubeRef, onNavigateToFront }: BottomViewProps) => {
  return (
    <group>
      {/* Plan invisible qui couvre toute la zone et redirige vers FrontView au clic */}
      <mesh 
        position={[0, 2, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={onNavigateToFront}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial 
          transparent={true}
          visible={false}
          opacity={0.1}
        />
      </mesh>

      {/* Cube invisible de référence caméra */}
      <mesh ref={cubeRef} position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" visible={false} />
      </mesh>
    </group>
  );
};
