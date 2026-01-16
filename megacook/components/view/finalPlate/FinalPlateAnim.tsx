import Model from "@/components/Model";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { Group, Vector2 } from "three";
import finalplate from "@/assets/models/ingredients/finalplate.glb";

export const FinalPlateModel = ({ src }: { src: any }) => {
  const plateRef = useRef<Group>(null);
  const animationStart = useRef<number | null>(null);
  const { size, gl } = useThree();

  const isDragging = useRef(false);
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const lastPointer = useRef(new Vector2());

  React.useEffect(() => {
    const canvas = gl.domElement;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPointer.current.set(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastPointer.current.x;
        const deltaY = e.clientY - lastPointer.current.y;

        rotationY.current += (deltaX / size.width) * Math.PI;
        rotationX.current += (deltaY / size.height) * Math.PI;

        // Limiter la rotation verticale
        rotationX.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, rotationX.current)
        );

        lastPointer.current.set(e.clientX, e.clientY);
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [gl, size]);

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
