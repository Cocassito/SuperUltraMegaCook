import { Mesh } from 'three';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { vertexShader, fragmentShader } from '../../shaders';

type LeftViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onOpenOrder: () => void;
};

export const LeftView = ({ cubeRef, onOpenOrder }: LeftViewProps) => {

  const planeRef = useRef<Mesh>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <>
      <mesh ref={cubeRef} position={[-10, 8, 18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" visible={true} />
      </mesh>

      {/* Ticket de caisse */}

        <mesh
          position={[-16.5, 0.7, 8]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
          onClick={onOpenOrder}
        >
          <planeGeometry args={[3, 2]}/>
          <meshBasicMaterial color="white" side={THREE.DoubleSide} />
        </mesh>
      
        <mesh 
          position={[-16.5, 0.65, 8]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        >
          <planeGeometry args={[3.7, 2.7]}/>
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            side={THREE.DoubleSide}
            transparent={true}
            uniforms={{
              time: { value: 0 }
            }}
          />
        </mesh>
    </>
  );
};
