import { useState, Suspense } from 'react';
import chefsData, { ChefType } from '@/data/chefsData';
import Model from '@/components/Model';
import { useSelectedFoodSound } from '@/hooks/useButtonSound';

type ChefProps = {
  onChefClick: (chefType: ChefType) => void;
  hasValidatedChef?: boolean;
};

export const Chef = ({ onChefClick, hasValidatedChef = false }: ChefProps) => {
  const [lolaScale, setLolaScale] = useState(1);
  const [leoScale, setLeoScale] = useState(1);
  const [philippeScale, setPhilippeScale] = useState(1);
  const playSelectedFoodSound = useSelectedFoodSound();

  const handleChefClick = async (chefType: ChefType) => {
    await playSelectedFoodSound();
    onChefClick(chefType);
  };

  return (
    <Suspense fallback={null}>
      {!hasValidatedChef && (
      <group>
        {/* Lola */}
        <group 
          position={[18, 0, 13]}
          scale={lolaScale}
          onPointerDown={() => {
            setLolaScale(0.8);
            handleChefClick('lola');
          }}
          onPointerUp={() => setLolaScale(1)}
        >
          <mesh 
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 13]}
          >
            <planeGeometry args={[2.8, 2.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Léo */}
        <group 
          position={[18, 0, 18]}
          scale={leoScale}
          onPointerDown={() => {
            setLeoScale(0.8);
            handleChefClick('leo');
          }}
          onPointerUp={() => setLeoScale(1)}
        >
          <mesh 
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 13]}
          >
            <planeGeometry args={[2.8, 2.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Philippe Etchebest */}
        <group 
          position={[18, 0, 23]}
          scale={philippeScale}
          onPointerDown={() => {
            setPhilippeScale(0.8);
            handleChefClick('philippeetchebest');
          }}
          onPointerUp={() => setPhilippeScale(1)}
        >
          <mesh 
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 18]}
          >
            <planeGeometry args={[2.8, 2.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

      </group>
      )}
    </Suspense>
  );
}; 
