import { Mesh } from 'three';
import * as THREE from 'three';
import ShaderEffect from '@/components/ShaderEffect';
import { usePaperSound } from '@/hooks/useButtonSound';


type LeftViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onOpenOrder: () => void;
};

export const LeftView = ({ cubeRef, onOpenOrder }: LeftViewProps) => {
  const playPaperSound = usePaperSound();

  const handleOrderClick = async () => {
    await playPaperSound();
    onOpenOrder();
  };

  // const planeRef = useRef<Mesh>(null);

  return (
    <>
      <mesh ref={cubeRef} position={[-10, 8, 18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" visible={false} />
      </mesh>
  
      <ShaderEffect 
        position={[-18.4, 0.49, 17.4]} 
        rotation={[Math.PI / 2, 0, Math.PI / 6]} 
        planeSize={[3.4, 3.1]}
      />

      <mesh
        position={[-18.4, 0.58, 17.4]}
        rotation={[Math.PI / 2, 0, Math.PI / 6]}
        onClick={handleOrderClick}
      >
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial 
          color="blue" 
          side={THREE.DoubleSide} 
          transparent={true} 
          opacity={0.0001} 
        />
      </mesh>
    </>
  );
}; 
