import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh, Vector3, MathUtils } from 'three';

type CameraControlsProps = {
  cubeRef: React.RefObject<Mesh>;
  currentView?: number;
  cameraRef?: React.MutableRefObject<any>;
};

export default function CameraControls({ cubeRef, currentView, cameraRef }: CameraControlsProps) {
  const { camera } = useThree();
  
  // Expose la caméra pour la synchronisation
  useEffect(() => {
    if (cameraRef) {
      cameraRef.current = camera;
    }
  }, [camera, cameraRef]);
  const smoothFactor = 0.08;
  const targetPosition = useRef<Vector3>(new Vector3());
  const isBottomView = currentView === 3 || currentView === 4 || currentView === 5;

  // Position initiale de la caméra
  useEffect(() => {
    camera.position.set(0, 8, 18);
    // Initialise la cible au premier cube
    if (cubeRef.current) {
      targetPosition.current.copy(cubeRef.current.position);
    }
  }, [camera, cubeRef]);

  useFrame(() => {
    if (cubeRef.current) {
      targetPosition.current.lerp(cubeRef.current.position, smoothFactor);
      
      // Déplacer la caméra sur l'axe Z pour zoomer au lieu de changer le FOV
      const targetZ = isBottomView ? 5 : 18;
      camera.position.z = MathUtils.lerp(camera.position.z, targetZ, 0.05);
      
      camera.lookAt(targetPosition.current);
    }
  });

  return null;
}
