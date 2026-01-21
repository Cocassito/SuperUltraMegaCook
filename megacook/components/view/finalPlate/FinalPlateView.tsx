import React, { forwardRef, useRef, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { FinalPlateParticles } from "./FinalPlateParticles";
import PixelatedPass from "@/components/postProd/PixelComposer";
import PixelButton from "@/components/ui/button/PixelButtonComponent";
import { OrbitControls } from "@react-three/drei";
import { FinalPlateModel } from "./FinalPlateAnim";

interface FinalPlateViewProps {
  onTimeout?: () => void;
  onPlayTadam?: () => void;
}

export const FinalPlateView = forwardRef<View, FinalPlateViewProps>(
  ({ onTimeout, onPlayTadam }, ref) => {
    const finalPlate = require("../../../assets/models/ingredients/finalplate.glb");
    const backgroundResult = require("../../../assets/images/background/backgroundresult.png");

    useEffect(() => {
      onPlayTadam?.();
    }, [onPlayTadam]);

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
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 5, -5]} intensity={2} />
          <directionalLight position={[0, 5, 5]} intensity={2} />
          <directionalLight position={[5, -25, 5]} intensity={2} />

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
