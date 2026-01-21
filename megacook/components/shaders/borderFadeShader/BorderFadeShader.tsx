import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./index";
import { useMemo, useRef } from "react";

type BorderFadeShaderProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  planeSize?: [number, number];
};

export default function BorderFadeShader({ position = [0, 0, 0], rotation = [0, 0, 0], planeSize = [0.0, 0.0] }: BorderFadeShaderProps) {

  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  // Garder la référence des uniforms stable pour éviter les resets lors des re-renders
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  
  useFrame((_, delta) => {
    if (shaderRef.current) {
      uniforms.uTime.value += delta; // incrémenter avec le delta pour une animation continue
    }
  });

  return <>
    <mesh position={position} rotation={rotation} frustumCulled={false}>
      <planeGeometry args={planeSize}/>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent={true}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  </>;
}