import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';

type CameraControlsProps = {
  cubeRef: React.RefObject<Mesh>;
};

export default function CameraControls({ cubeRef }: CameraControlsProps) {
  const { camera } = useThree();
  const smoothFactor = 0.1;
  const targetPosition = useRef(new Vector3());

  // Position initiale de la caméra
  useEffect(() => {
    camera.position.set(0, 10, 15);
    // Initialise la cible au premier cube
    if (cubeRef.current) {
      targetPosition.current.copy(cubeRef.current.position);
    }
  }, [camera, cubeRef]);

  // À chaque frame, la caméra regarde le cube avec interpolation
  useFrame(() => {
    if (cubeRef.current) {
      targetPosition.current.lerp(cubeRef.current.position, smoothFactor);
      camera.lookAt(targetPosition.current);
    }
  });

  return null;
}
