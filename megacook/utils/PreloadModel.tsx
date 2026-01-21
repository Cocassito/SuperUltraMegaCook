import { GLTFLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { configureGLTFLoader } from "@/three/gltfLoader";

// Utilise le DRACOLoader singleton depuis gltfLoader.ts
export const preloadModel = (src: string) => {
  useLoader.preload(GLTFLoader, src, configureGLTFLoader);
};
