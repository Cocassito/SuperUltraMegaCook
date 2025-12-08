import { Suspense, useRef } from "react";
import { Group } from "three";
import Model from "@/components/Model";

type PlateSceneProps = {
  validatedModel?: string | null;
  validatedFruitModel?: string | null;
  validatedSauceModel?: string | null;
  validatedAutreModel?: string | null;
}

export default function PlateScene({ validatedModel, validatedFruitModel, validatedSauceModel, validatedAutreModel }: PlateSceneProps) {
  
  const assiette = require("../../../assets/models/assiette.glb");
  const plateRef = useRef<Group>(null);

  return (
    <Suspense fallback={null}>
      <group ref={plateRef} position={[0, 2, 0]}>
        {/* Assiette fixe en bas */}
        <group position={[0, -1, 0]}>

          {/* Base */}
          <group position={[1.5, 0.5, 0]}>
            {validatedModel && (
              <Model src={validatedModel} scale={1} />
            )}
          </group>

          {/* Fruits & Légumes */}
          <group position={[0, 0.5, 1.5]}>
            {validatedFruitModel && (
              <Model src={validatedFruitModel} scale={1} />
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
          </group>

          {/* Assiette */}
          <Model src={assiette} scale={1}/>
          
        </group>
      </group>
    
    </Suspense>
  );
}