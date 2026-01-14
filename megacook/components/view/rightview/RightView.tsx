import { Mesh } from 'three';
import * as THREE from 'three';
import { Base } from './ingredients/Base';
import { Fruit } from './ingredients/Fruit';
import { Sauce } from './ingredients/Sauce';
import { Autres } from './ingredients/Autres';
import { Chef } from './ingredients/Chef';

import { BaseType } from '@/data/basesData';
import { FruitType } from '@/data/fruitsData';
import { SauceType } from '@/data/saucesData';
import { AutreType } from '@/data/autresData';
import { ChefType } from '@/data/chefsData';

import BorderFadeShader from '@/components/shaders/borderFadeShader/BorderFadeShader';

type RightViewProps = {
  cubeRef: React.RefObject<Mesh>;
  hasValidatedBase: boolean;
  hasValidatedFruit: boolean;
  hasValidatedSauce: boolean;
  hasValidatedAutre: boolean;
  hasValidatedChef: boolean;
  onBaseClick: (baseType: BaseType) => void;
  onFruitClick: (fruitType: FruitType) => void;
  onSauceClick: (sauceType: SauceType) => void;
  onAutreClick: (autreType: AutreType) => void;
  onChefClick?: (chefType: ChefType) => void;
  validatedModel?: string | null;
  validatedFruitModel?: string | null;
  validatedSauceModel?: string | null;
  validatedAutreModel?: string | null;
  validatedChefModel?: string | null;
  hasOpenedOrder?: boolean;
};

export const RightView = ({ 
  cubeRef, 
  hasValidatedBase, 
  hasValidatedFruit, 
  hasValidatedSauce,
  hasValidatedAutre, 
  hasValidatedChef,
  onBaseClick, 
  onFruitClick, 
  onSauceClick, 
  onAutreClick,
  onChefClick,
  hasOpenedOrder = false,
}: RightViewProps) => {

  return (
    <>
      {/* Cube invisible pour la caméra */}
      <mesh ref={cubeRef} position={[10, 8, 18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={false} />
      </mesh>

      <BorderFadeShader
        position={[18, 3, 2]} 
        rotation={[-Math.PI / 8, -Math.PI / 7, -Math.PI / 20]}
        planeSize={[9.0, 7.5]}
      />

      {/* Base */}
      {hasOpenedOrder && !hasValidatedBase && (
        <group position={[0, 1, 0]}>
          <Base onBaseClick={onBaseClick} />
        </group>
      )}

      {/* Fruit */}
      {hasValidatedBase && !hasValidatedFruit && (
        <group position={[0, 1, 0]}>
          <Fruit onFruitClick={onFruitClick} />
        </group>
      )}

      {/* Sauce */}
      {hasValidatedBase && hasValidatedFruit && !hasValidatedSauce && (
        <group position={[0, 1, 0]}>
          <Sauce onSauceClick={onSauceClick} />
        </group>
      )}

      {/* Autre */}
      {hasValidatedBase && hasValidatedFruit && hasValidatedSauce && (
        <group position={[0, 1, 0]}>
          <Autres onAutreClick={onAutreClick} hasValidatedAutre={hasValidatedAutre} />
        </group>
      )}

      {hasValidatedBase && hasValidatedFruit && hasValidatedSauce && hasValidatedAutre && (
        <group position={[0, 1, 0]}>
          {onChefClick && <Chef onChefClick={onChefClick} hasValidatedChef={hasValidatedChef} />}
        </group>
      )}
    </>
  );
};