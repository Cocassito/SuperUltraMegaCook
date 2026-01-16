import React, { forwardRef, useRef } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { FinalPlateParticles } from "./FinalPlateParticles";
import { Group, Vector2, DirectionalLight, DirectionalLightHelper } from "three";
import PixelatedPass from "@/components/postProd/PixelComposer";
import PixelButton from "@/components/ui/button/PixelButtonComponent";
import { OrbitControls } from "@react-three/drei";
import { FinalPlateModel } from "./FinalPlateAnim";

interface FinalPlateViewProps {
  onTimeout?: () => void;
}

const LightWithHelper = ({ position, intensity }: { position: [number, number, number]; intensity: number }) => {
  const lightRef = useRef<DirectionalLight>(null!);
  useHelper(lightRef, DirectionalLightHelper, 5, 'red');
  
  return <directionalLight ref={lightRef} position={position} intensity={intensity} />;
};

export const FinalPlateView = forwardRef<View, FinalPlateViewProps>(
  ({ onTimeout }, ref) => {
    const finalPlate = require("../../../assets/models/ingredients/finalplate.glb");
    const backgroundResult = require("../../../assets/images/background/backgroundresult.png");

    return (
      <ImageBackground source={backgroundResult} style={styles.container} ref={ref}>
        <Canvas>
          {/* Caméra avec position initiale */}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 8]}
            fov={50}
          />

          <OrbitControls 
            enablePan={false} 
            enableZoom={false}
            minDistance={5}
            maxDistance={15}
          />

          {/* Lumières */}
          <ambientLight intensity={5} />
          <LightWithHelper position={[5, 5, 5]} intensity={2} />
          <LightWithHelper position={[-5, 5, -5]} intensity={2} />
          <LightWithHelper position={[0, 5, 5]} intensity={2} />
          <LightWithHelper position={[5, -25, 5]} intensity={2} />

          {/* Particules décoratives */}
          <FinalPlateParticles />

          {/* Modèle finalPlate.glb avec rotation interactive */}
          <FinalPlateModel src={finalPlate} />

          <PixelatedPass pixelSize={3} />
        </Canvas>
        
        <View style={styles.buttonWrapper}>
          <PixelButton
            title="Valider"
            colorPrimary="#C8A2DA"
            colorSecondary="#773B94"
            colorBorder="#55256D"
            colorInnerShadow="#E9DAF0"
            onPress={onTimeout}
          />
        </View>
      </ImageBackground>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    transform: [{ scale: 0.8 }],
    zIndex: 10,
  },
});
