import * as THREE from 'three';
import BorderFadeShader from '@/components/shaders/borderFadeShader/BorderFadeShader';
import { Mesh } from 'three';
import { usePaperSound } from '@/hooks/useButtonSound';

type FrontViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onValidate: () => void;
  onOpenAverageResult: () => void;
  onNavigateToBottomView: () => void;
  canShowAverage: boolean;
};

export const FrontView = ({ cubeRef, onOpenAverageResult, onNavigateToBottomView, canShowAverage }: FrontViewProps) => {

  const playPaperSound = usePaperSound();
  
  const handleAverageResultClick = async () => {
    await playPaperSound();
    onOpenAverageResult();
  };

  const handlePlateSceneClick = () => {
    onNavigateToBottomView();
  };

  return (
    <>
      {/* Cube invisible pour la caméra */}
      <mesh ref={cubeRef} position={[0, 7, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={false} />
      </mesh>

      {/* Zone Plate Scene */}
      <mesh
        position={[0, 3, 0]}
        rotation={[0, 0, 0]}
        onClick={handlePlateSceneClick}
      >
        <boxGeometry args={[4, 4, 4]} />
        <meshBasicMaterial 
          color="blue" 
          visible={false}
        />
      </mesh>

      {canShowAverage && (
        <>
          <BorderFadeShader
            position={[-10.97, 0.51, 1.6]}
            rotation={[Math.PI / 2, 0, Math.PI / 2.9]}
            planeSize={[3.6, 1.7]}
          />

          {/* Zone Ticket de Caisse */}
          <mesh
            position={[-10.95, 0.6, 1.6]}
            rotation={[Math.PI / 2, 0, Math.PI / 2.9]}
            onClick={handleAverageResultClick}
          >
            <planeGeometry args={[3.6, 1.7]} />
            <meshBasicMaterial 
              color="blue" 
              side={THREE.DoubleSide} 
              transparent={true}
              opacity={0.0000001}
            />
          </mesh>
        </>
      )}
    </>
  );
};