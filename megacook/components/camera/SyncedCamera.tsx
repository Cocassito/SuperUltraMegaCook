import { useThree, useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

type SyncedCameraProps = {
  cameraRef: React.MutableRefObject<any>;
};

export const SyncedCamera = ({ cameraRef }: SyncedCameraProps) => {
  const { camera } = useThree();

  useEffect(() => {
    if (cameraRef.current) {
      // Synchronise la position et rotation
      camera.position.copy(cameraRef.current.position);
      camera.rotation.copy(cameraRef.current.rotation);
      camera.updateProjectionMatrix();
    }
  }, [camera, cameraRef]);

  useFrame(() => {
    if (cameraRef.current) {
      camera.position.copy(cameraRef.current.position);
      camera.rotation.copy(cameraRef.current.rotation);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
