import React, { forwardRef, useRef } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useHelper } from "@react-three/drei";
import { FinalPlateParticles } from "./FinalPlateParticles";
import { Group, Vector2, DirectionalLight, DirectionalLightHelper } from "three";
import PixelatedPass from "@/components/postProd/PixelComposer";
import { FinalPlateModel } from "./FinalPlateAnim";
import PixelButton from "@/components/ui/button/PixelButtonComponent";
import { OrbitControls } from "@react-three/drei";

interface FinalPlateViewProps {
  onTimeout?: () => void;
}

// Composant interne pour animer le modèle (doit vivre à l'intérieur du Canvas pour utiliser useFrame)
const FinalPlateModel = ({ src }: { src: any }) => {
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
        rotationX.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX.current));
        
        lastPointer.current.set(e.clientX, e.clientY);
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [gl, size]);

  // Animation d'entrée : monte depuis le bas
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
      <Model src={src} scale={0.5} />
    </group>
  );
};

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
