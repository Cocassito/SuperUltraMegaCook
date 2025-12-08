import { Mesh } from 'three';
import PlateScene from './PlateScene';
import { useState } from 'react';

type FrontViewProps = {
  cubeRef: React.RefObject<Mesh>;
  onValidate: () => void;
  validatedModel?: string | null;
  validatedFruitModel?: string | null;
  validatedSauceModel?: string | null;
  validatedAutreModel?: string | null;
};

export const FrontView = ({ cubeRef, validatedModel, validatedFruitModel, validatedSauceModel, validatedAutreModel }: FrontViewProps) => {
  return (
    <group>
      {/* Cube invisible pour la caméra */}
      <mesh ref={cubeRef} position={[0, 7, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={true} />
      </mesh>
      {/* Scène de l'assiette */}
      <PlateScene validatedModel={validatedModel} validatedFruitModel={validatedFruitModel} validatedSauceModel={validatedSauceModel} validatedAutreModel={validatedAutreModel} />
    </group>
  );
};