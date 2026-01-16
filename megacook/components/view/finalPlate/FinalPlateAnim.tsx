import Model from "@/components/Model";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Group } from "three";

export const FinalPlateModel = ({ src }: { src: any }) => {
  const plateRef = useRef<Group>(null);
  const animationStart = useRef<number | null>(null);

  const rotationX = useRef(0);
  const rotationY = useRef(0);

  // Animation d'entrée : monte depuis le bas
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

    const startY = -5;
    const targetY = 0;
    const currentY = startY + (targetY - startY) * eased;
    plateRef.current.position.y = currentY;

    // Appliquer la rotation
    plateRef.current.rotation.x = rotationX.current;
    plateRef.current.rotation.y = rotationY.current;
  });

  return (
    <group ref={plateRef} position={[0, 0, 0]}>
      <Model src={finalplate} scale={0.5} />
    </group>
  );
};
