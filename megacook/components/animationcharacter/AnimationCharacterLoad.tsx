import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader, DRACOLoader, SkeletonUtils } from "three-stdlib";
import { AnimationMixer, LoopRepeat } from "three";
import * as THREE from "three";

export default function AnimationCharacterLoad({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  model = "sitdown",
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  model?: "sitdown" | "customer" | "walking" | "dance1" | "dance2" | "dance3";
}) {
  const dracoRef = useRef<DRACOLoader | null>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);

  const getModelPath = () => {
    switch (model) {
      case "customer":
        return require("@/assets/models/character/customer.glb");
      case "walking":
        return require("@/assets/models/character/walking.glb");
      case "dance1":
        return require("@/assets/models/character/dance1.glb");
      case "dance2":
        return require("@/assets/models/character/dance2.glb");
      case "dance3":
        return require("@/assets/models/character/dance3.glb");
      case "sitdown":
      default:
        return require("@/assets/models/character/sitdown.glb");
    }
  };
  
  const gltf = useLoader(
    GLTFLoader,
    getModelPath(),
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
      );
      loader.setDRACOLoader(dracoLoader as any);
      dracoRef.current = dracoLoader;
    }
  );

  // Clone the loaded scene so multiple instances can render independently
  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(gltf.scene) as THREE.Object3D;
  }, [gltf.scene]);

  useEffect(() => {
    if (gltf.animations && gltf.animations.length > 0 && clonedScene) {
      const mixer = new AnimationMixer(clonedScene);
      mixerRef.current = mixer;

      // Jouer toutes les animations
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.setLoop(LoopRepeat, Infinity);
        action.play();
      });
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
      if (dracoRef.current) {
        dracoRef.current.dispose();
        dracoRef.current = null;
      }
    };
  }, [gltf, clonedScene]);

  // Mettre à jour l'animation à chaque frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <primitive object={clonedScene} position={position} rotation={rotation} scale={scale} />
  );
}
