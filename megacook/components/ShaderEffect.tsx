
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";
import { useRef } from "react";

type ShaderEffectProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  planeSize?: [number, number];
};

export default function ShaderEffect({ position = [0, 0, 0], rotation = [0, 0, 0], planeSize = [0.0, 0.0] }: ShaderEffectProps) {

  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return <>
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={planeSize}/>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent={true}
        uniforms={{
          time: { value: 0 }
        }}
      />
    </mesh>
  </>;
}