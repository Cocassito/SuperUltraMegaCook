import Model from "@/components/Model";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

export const FinalPlateModel = ({ src }: { src: any }) => {
  const plateRef = useRef<Group>(null);
  const animationStart = useRef<number | null>(null);

  useFrame((state, delta) => {
    if (!plateRef.current) return;

    if (animationStart.current === null) {
      animationStart.current = state.clock.getElapsedTime();
    }

    const elapsed =
      state.clock.getElapsedTime() - (animationStart.current ?? 0);
    const duration = 1.5;
    const t = Math.min(elapsed / duration, 1);
    // easeInOut
    const eased = t * t * (3 - 2 * t);

    const startY = -30;
    const targetY = 0;
    const currentY = startY + (targetY - startY) * eased;
    plateRef.current.position.y = currentY;

    // Rotation continue
    plateRef.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={plateRef} position={[0, 0, 0]}>
      <Model src={src} scale={0.5} />
    </group>
  );
};
