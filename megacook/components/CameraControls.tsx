import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

type CameraControlsProps = {
  view: number;
};

export default function CameraControls({ view }: CameraControlsProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 10, 15);

    // Cibles à regarder selon la vue
    const targets: [number, number, number][] = [
      [0, 0, 0],   
      [15, 0, 0],   
      [-15, 0, 0],
    ];
    const t = targets[view % targets.length];
    camera.lookAt(t[0], t[1], t[2]);
  }, [camera, view]);

  return null;
}