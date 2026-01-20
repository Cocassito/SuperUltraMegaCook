
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./index";
import { useEffect, useRef } from "react";

type SmokeShaderProps = {
  position?: THREE.Vector3 | [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  planeSize?: [number, number];
  resetKey?: string | number;
  visible?: boolean;
  isDark?: boolean;
};

export default function SmokeShader({ position = [0, 0, 0], rotation = [0, 0, 0], planeSize = [0, 0], resetKey, visible = true, isDark = false }: SmokeShaderProps) {

  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const localTimeRef = useRef(0);
  const lastElapsedRef = useRef<number | null>(null);

  useEffect(() => {
    localTimeRef.current = 0;
    lastElapsedRef.current = null;
  }, [resetKey]);
  
  useFrame(({ clock }) => {
    if (!shaderRef.current) return;
    const elapsed = clock.getElapsedTime();
    if (lastElapsedRef.current == null) {
      lastElapsedRef.current = elapsed;
    }
    const delta = elapsed - lastElapsedRef.current;
    lastElapsedRef.current = elapsed;
    localTimeRef.current += delta;
    shaderRef.current.uniforms.uTime.value = localTimeRef.current;
  });

  return <>
    <mesh position={position} rotation={rotation} visible={visible}>
      <planeGeometry args={planeSize}/>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uIsDark: { value: isDark ? 1.0 : 0.0 }
        }}
      />
    </mesh>
  </>;
}