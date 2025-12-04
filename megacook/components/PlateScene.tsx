import { useFrame, useLoader } from "./lib/fiber";
import { useRef, Suspense } from "react";
import { Group } from "three";
import { GLTFLoader } from "three-stdlib";
import { Base } from "./view/rightview/Base";
import { BaseType } from "@/data/basesData";

interface PlateSceneProps {
  assietteModel: string;
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
  onBaseClick,
}: PlateSceneProps) {
  const plateRef = useRef<Group>(null);

  return (
    <Suspense fallback={null}>
      <group ref={plateRef} position={[0, 2, 0]}>

        <Base onBaseClick={onBaseClick} />

        {/* Assiette fixe en bas */}
        <group position={[0, -1, 0]}>
          <Model src={assietteModel} />
        </group>
      </group>
    </Suspense>
  );
}
