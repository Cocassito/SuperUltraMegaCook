import { useFrame, useLoader } from "./lib/fiber";
import { useRef, Suspense } from "react";
import { Group } from "three";
import { GLTFLoader } from "three-stdlib";

interface PlateSceneProps {
  alimentSrc: string;
  baseSrc: string | null;
  autreSrc: string | null;
  assietteModel: string;
}

function Model({ src, scale = [1, 1, 1] }: { src: string; scale?: [number, number, number] }) {
  const gltf = useLoader(GLTFLoader, src);
  return <primitive object={gltf.scene.clone()} scale={scale} />;
}

export default function PlateScene({ alimentSrc, baseSrc, autreSrc, assietteModel }: PlateSceneProps) {
  const plateRef = useRef<Group>(null);

  useFrame(() => {
    if (!plateRef.current) return;
    plateRef.current.rotation.y += 0.005;
  });

  return (
    <Suspense fallback={null}>
      <group ref={plateRef}>
        {/* Autre (au-dessus de tout) */}
        {autreSrc && (
          <group position={[0, 1, 0]}>
            <Model src={autreSrc} scale={[0.5, 0.5, 0.5]} />
          </group>
        )}
        {/* Base (en dessous de l'aliment si sélectionnée) */}
        {baseSrc && (
          <group position={[0, 0, 0]}>
            <Model src={baseSrc} scale={[0.5, 0.5, 0.5]} />
          </group>
        )}
        {/* Aliment (au-dessus de la base) */}
        {alimentSrc && (
          <group position={[0, -1, 0]}>
            <Model src={alimentSrc} scale={[0.5, 0.5, 0.5]} />
          </group>
        )}
      </group>
      {/* Assiette fixe en bas */}
      <group position={[0, -2, 0]}>
        <Model src={assietteModel} />
      </group>
    </Suspense>
  );
}
