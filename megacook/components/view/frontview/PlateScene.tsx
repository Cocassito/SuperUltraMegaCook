import { Suspense, useRef } from "react";
import { Group } from "three";
import Model from "@/components/Model";
import SmokeShader from "@/components/shaders/smokeShader/SmokeShader";

type PlateSceneProps = {
  validatedModel?: string | null;
  validatedFruitModel?: string | null;
  validatedSauceModel?: string | null;
  validatedAutreModel?: string | null;
  isCuireBase?: boolean;
  isCuireFruit?: boolean;
  isCuireAutre?: boolean;
  resetKey?: string | number;
};

export default function PlateScene({
  validatedModel,
  validatedFruitModel,
  validatedSauceModel,
  validatedAutreModel,
  isCuireBase = false,
  isCuireFruit = false,
  isCuireAutre = false,
  resetKey,
}: PlateSceneProps) {
  const assiette = require("../../../assets/models/objets/assiette.glb");
  const plateRef = useRef<Group>(null);

  return (
    <Suspense fallback={null}>
      <group ref={plateRef} position={[0, 2, 0]}>
        {/* Assiette fixe en bas */}
        <group position={[0, -1, 0]}>
          {/* Base */}
          <group position={[1.5, 0.5, 0]}>
            {validatedModel && <Model src={validatedModel} scale={1} />}
            {validatedModel && isCuireBase && (
              <SmokeShader 
                key={`smoke-base-${resetKey}-${validatedModel}`}
                resetKey={resetKey ? `${resetKey}-base` : undefined}
                position={[0, 2.5, 0]} 
                rotation={[0, 0, 0]} 
                planeSize={[2.5, 3.5]} 
              />
            )}
          </group>

          {/* Fruits & Légumes */}
          <group position={[0, 0.5, 1.5]}>
            {validatedFruitModel && (
              <Model src={validatedFruitModel} scale={1} />
            )}
            {validatedFruitModel && isCuireFruit && (
              <SmokeShader 
                key={`smoke-fruit-${resetKey}-${validatedFruitModel}`}
                resetKey={resetKey ? `${resetKey}-fruit` : undefined}
                position={[0, 2.5, 0]} 
                rotation={[0, 0, 0]} 
                planeSize={[2.5, 3.5]} 
              />
            )}
          </group>

          {/* Sauces & Épices */}
          <group position={[0, 0.5, -1.5]}>
            {validatedSauceModel && (
              <Model src={validatedSauceModel} scale={1} />
            )}
          </group>

          {/* Autres */}
          <group position={[-1.5, 0.5, 0]}>
            {validatedAutreModel && (
              <Model src={validatedAutreModel} scale={1} />
            )}
            {validatedAutreModel && isCuireAutre && (
              <SmokeShader 
                key={`smoke-autre-${resetKey}-${validatedAutreModel}`}
                resetKey={resetKey ? `${resetKey}-autre` : undefined}
                position={[0, 2.5, 0]} 
                rotation={[0, 0, 0]} 
                planeSize={[2.5, 3.5]} 
              />
            )}
          </group>

          {/* Assiette */}
          {/* <Model src={assiette} scale={1}/> */}
        </group>
      </group>
    </Suspense>
  );
}
