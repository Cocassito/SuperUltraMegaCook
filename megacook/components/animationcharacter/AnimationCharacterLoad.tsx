import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader, SkeletonUtils } from "three-stdlib";
import { AnimationMixer, LoopRepeat, Object3D } from "three";
import { configureGLTFLoader } from "@/three/gltfLoader";

// ⚡ Imports statiques des modèles
import sitdown1 from "@/assets/models/character/sitdown1.glb";
import sitdown2 from "@/assets/models/character/sitdown2.glb";
import sitdown3 from "@/assets/models/character/sitdown3.glb";
import customer from "@/assets/models/character/customer.glb";
import dance1 from "@/assets/models/character/dance1.glb";
import dance2 from "@/assets/models/character/dance2.glb";
import dance3 from "@/assets/models/character/dance3.glb";

// Map des modèles
const MODELS = {
  sitdown1,
  sitdown2,
  sitdown3,
  customer,
  dance1,
  dance2,
  dance3,
};

// ⚡ PRELOAD (hors composant, s’exécute une fois)
Object.values(MODELS).forEach((src) => {
  useLoader.preload(GLTFLoader, src, configureGLTFLoader);
});

interface AnimationCharacterLoadProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  model?: keyof typeof MODELS;
}

export default function AnimationCharacterLoad({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  model = "sitdown1",
}: AnimationCharacterLoadProps) {
  const mixerRef = useRef<AnimationMixer | null>(null);

  // ⚡ Charge le modèle via loader global
  const gltf = useLoader(GLTFLoader, MODELS[model], configureGLTFLoader);

  // Clone la scène pour permettre plusieurs instances
  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(gltf.scene) as Object3D;
  }, [gltf.scene]);

  useEffect(() => {
    if (gltf.animations.length > 0 && clonedScene) {
      const mixer = new AnimationMixer(clonedScene);
      mixerRef.current = mixer;

      // Jouer toutes les animations en boucle
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.setLoop(LoopRepeat, Infinity);
        action.play();
      });
    }

    return () => {
      // Stop mixer à la destruction
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
    };
  }, [gltf, clonedScene]);

  // Met à jour l’animation à chaque frame
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
