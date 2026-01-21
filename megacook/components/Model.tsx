import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { configureGLTFLoader } from "@/three/gltfLoader";
import { GLTF } from "three-stdlib";

export default function Model({
  src,
  scale = 1,
}: {
  src: string;
  scale?: number;
}) {
  const gltf = useLoader(GLTFLoader, src, configureGLTFLoader) as GLTF;

  return <primitive object={gltf.scene} scale={scale} />;
}
