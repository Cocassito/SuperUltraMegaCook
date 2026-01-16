import React, { forwardRef, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Model from "../../Model";
import { FinalPlateParticles } from "./FinalPlateParticles";
import { Group } from "three";
import PixelatedPass from "@/components/postProd/PixelComposer";

interface FinalPlateViewProps {
  onTimeout?: () => void;
}

// Composant interne pour animer le modèle (doit vivre à l'intérieur du Canvas pour utiliser useFrame)
const FinalPlateModel = ({ src }: { src: any }) => {
  const plateRef = useRef<Group>(null);
  const animationStart = useRef<number | null>(null);

  // Animation d'entrée : monte depuis le bas et commence à tourner
  useFrame((state, delta) => {
    if (!plateRef.current) return;

    if (animationStart.current === null) {
      animationStart.current = state.clock.getElapsedTime();
    }

    const elapsed = state.clock.getElapsedTime() - (animationStart.current ?? 0);
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

export const FinalPlateView = forwardRef<View, FinalPlateViewProps>(
  ({ onTimeout }, ref) => {
    const finalPlate = require("../../../assets/models/ingredients/finalplate.glb");

    useEffect(() => {
      const timer = setTimeout(() => {
        onTimeout?.();
      }, 5000);

      return () => clearTimeout(timer);
    }, [onTimeout]);

    return (
      <View style={styles.container} ref={ref}>
        <Canvas>
          {/* Caméra avec position initiale */}
          <PerspectiveCamera
            makeDefault
            position={[0, 5, -6]}
            fov={50}
          />

          {/* Lumières */}
          <ambientLight intensity={5} />
          <directionalLight position={[5, 25, 5]} intensity={4} />
          <directionalLight position={[5, -25, 5]} intensity={4} />

          {/* Particules décoratives */}
          <FinalPlateParticles />

          {/* Modèle finalPlate.glb */}
          <FinalPlateModel src={finalPlate} />

          {/* OrbitControls pour tourner le modèle */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
          />

          <PixelatedPass pixelSize={3} />
        </Canvas>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
