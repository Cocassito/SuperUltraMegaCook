import { useFrame, useLoader } from "./lib/fiber";
import { useRef, Suspense } from "react";
import { Group } from "three";
import { GLTFLoader } from "three-stdlib";
import { Base } from "./view/rightview/Base";
import { BaseType } from "@/data/basesData";

interface PlateSceneProps {
  assietteModel: string;
  cubeVisible?: boolean;
  cubeColor?: string;
  onBaseClick: (baseType: BaseType) => void;
}

function Model({
  src,
  scale = [1, 1, 1],
}: {
  src: string;
  scale?: [number, number, number];
}) {
  const gltf = useLoader(GLTFLoader, src);
  return <primitive object={gltf.scene.clone()} scale={scale} />;
}

export default function PlateScene({
  assietteModel,
  cubeVisible = false,
  cubeColor = '#ff0000',
  onBaseClick,
}: PlateSceneProps) {
  const plateRef = useRef<Group>(null);

  return (
    <Suspense fallback={null}>
      <group ref={plateRef} position={[0, 2, 0]}>

        <Base onBaseClick={onBaseClick} />

        {/* Assiette fixe en bas */}
        <group position={[0, -1, 0]}>

            {/* Base */}
            <mesh position={[1.5, 0.5, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color={cubeColor} visible={cubeVisible} />
            </mesh>

            {/* Fruits & Légumes */}
            <mesh position={[0, 0.5, 1.5]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="green" visible={false} />
            </mesh>

            {/* Sauces & Épices */}
            <mesh position={[0, 0.5, -1.5]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="brown" visible={false} />
            </mesh>

            {/* Autres */}
            <mesh position={[-1.5, 0.5, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="blue" visible={false} />
            </mesh>


          <Model src={assietteModel} />
        </group>
      </group>
    </Suspense>
  );
}
