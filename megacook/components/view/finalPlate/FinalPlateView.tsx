import React, { forwardRef, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { FinalPlateParticles } from "./FinalPlateParticles";
import PixelatedPass from "@/components/postProd/PixelComposer";
import { FinalPlateModel } from "./FinalPlateAnim";

interface FinalPlateViewProps {
  onTimeout?: () => void;
}

// Composant interne pour animer le modèle (doit vivre à l'intérieur du Canvas pour utiliser useFrame)

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
          <PerspectiveCamera makeDefault position={[0, 5, -6]} fov={50} />

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
