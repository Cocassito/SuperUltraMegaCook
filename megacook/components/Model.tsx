import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { GLTF } from "three-stdlib";

export default function Model({ src, scale = 1 }: { src: string; scale?: number }) {
  const gltf = useLoader(GLTFLoader, src) as GLTF;
  return <primitive object={gltf.scene} scale={scale} />;
}
