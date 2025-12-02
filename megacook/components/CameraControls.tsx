import { useThree, useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import { Mesh } from 'three';

type CameraControlsProps = {
  cubeRef: React.RefObject<Mesh>;
};

export default function CameraControls({ cubeRef }: CameraControlsProps) {
  const { camera } = useThree();

  // Position initiale de la caméra
  useEffect(() => {
    camera.position.set(0, 10, 15);
  }, [camera]);

  // À chaque frame, la caméra regarde le cube
  useFrame(() => {
    if (cubeRef.current) {
      camera.lookAt(cubeRef.current.position);
    }
  });

  return null;
}
