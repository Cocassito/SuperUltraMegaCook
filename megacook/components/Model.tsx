import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { configureGLTFLoader } from "@/three/gltfLoader";
import { GLTF } from "three-stdlib";

interface ModelProps {
  src: string;
  scale?: number;
}

// Utilisation de React.memo pour éviter les re-renders inutiles
const Model = React.memo(function Model({ src, scale = 1 }: ModelProps) {
  const gltf = useLoader(GLTFLoader, src, configureGLTFLoader) as GLTF;

  return <primitive object={gltf.scene} scale={scale} />;
});

export default Model;
