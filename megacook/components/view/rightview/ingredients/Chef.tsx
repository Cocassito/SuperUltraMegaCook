import { useState, Suspense } from 'react';
import chefsData, { ChefType } from '@/data/chefsData';
import Model from '@/components/Model';
import { useSelectedFoodSound } from '@/hooks/useButtonSound';
import BorderFadeShader from '@/components/shaders/borderFadeShader/BorderFadeShader';

type ChefProps = {
  onChefClick: (chefType: ChefType) => void;
  hasValidatedChef?: boolean;
};

export const Chef = ({ onChefClick, hasValidatedChef = false }: ChefProps) => {
  const [sylvainScale, setSylvainScale] = useState(1);
  const [mereCotteScale, setMereCotteScale] = useState(1);
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
        {/* Sylvain */}
        <group 
          position={[18, 0, 13]}
          scale={sylvainScale}
          onPointerDown={() => {
            setSylvainScale(0.8);
            handleChefClick('sylvain');
          }}
          onPointerUp={() => setSylvainScale(1)}
        >
          <mesh 
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 13]}
          >
            <planeGeometry args={[2.8, 2.1]} />
            <meshBasicMaterial color="#FFF" />
          </mesh>
          <BorderFadeShader 
            position={[0, 0, 0.01]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 13]}
            planeSize={[3.1, 2.4]}
          />
        </group>

        {/* Mère Cotte */}
        <group 
          position={[18, 0, 18]}
          scale={mereCotteScale}
          onPointerDown={() => {
            setMereCotteScale(0.8);
            handleChefClick('merecotte');
          }}
          onPointerUp={() => setMereCotteScale(1)}
        >
          <mesh 
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, Math.PI / 13]}
          >
            <planeGeometry args={[2.8, 2.1]} />
            <meshBasicMaterial color="#FFF" />
          </mesh>
          <BorderFadeShader 
            position={[0, 0, 0.01]}
            rotation={[-Math.PI / 2, 0, Math.PI / 13]}
            planeSize={[3.1, 2.4]}
          />
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
            <meshBasicMaterial color="#FFF" />
          </mesh>
          <BorderFadeShader 
            position={[0, 0, 0.01]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 13]}
            planeSize={[3.1, 2.4]}
          />
        </group>

      </group>
      )}
    </Suspense>
  );
}; 
