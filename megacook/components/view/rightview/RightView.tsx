import { Mesh } from 'three';
import { BaseType } from '@/data/basesData';
import { Base } from './ingredients/Base';
import { Fruit } from './ingredients/Fruit';
import { Sauce } from './ingredients/Sauce';
import { Autres } from './ingredients/Autres';
import { FruitType } from '@/data/fruitsData';
import { SauceType } from '@/data/saucesData';
import { AutreType } from '@/data/autresData';

type RightViewProps = {
  cubeRef: React.RefObject<Mesh>;
  hasValidatedBase: boolean;
  hasValidatedFruit: boolean;
  hasValidatedSauce: boolean;
  onBaseClick: (baseType: BaseType) => void;
  onFruitClick: (fruitType: FruitType) => void;
  onSauceClick: (sauceType: SauceType) => void;
  onAutreClick: (autreType: AutreType) => void;
};

export const RightView = ({ cubeRef, hasValidatedBase, hasValidatedFruit, hasValidatedSauce, onBaseClick, onFruitClick, onSauceClick, onAutreClick }: RightViewProps) => {

  return (
    <>
      {/* Cube invisible pour la caméra */}
      <mesh ref={cubeRef} position={[10, 8, 18]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="yellow" visible={true} />
      </mesh>

      {/* Base */}
      {!hasValidatedBase && (
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
          <Autres onAutreClick={onAutreClick} />
        </group>
      )}
    </>
  );
};