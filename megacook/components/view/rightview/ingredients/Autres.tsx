import { useState, Suspense } from 'react';
import autresData, { AutreType } from '@/data/autresData';
import Model from '@/components/Model';
import { useSelectedFoodSound } from '@/hooks/useButtonSound';

type AutresProps = {
  onAutreClick: (autreType: AutreType) => void;
};

export const Autres = ({ onAutreClick }: AutresProps) => {
  const [chocolatScale, setChocolatScale] = useState(1);
  const [pouletScale, setPouletScale] = useState(1);
  const [saumonScale, setSaumonScale] = useState(1);
  const playSelectedFoodSound = useSelectedFoodSound();

  const handleAutreClick = async (autreType: AutreType) => {
    await playSelectedFoodSound();
    onAutreClick(autreType);
  };

  return (
    <Suspense fallback={null}>

      <group>
        {/* Chocolat */}
        <group
          position={[18, 0, 13]}
          rotation={[0, Math.PI / 4, 0]}
          scale={chocolatScale}
          onPointerDown={() => {
            setChocolatScale(0.8);
            handleAutreClick('chocolat');
          }}
          onPointerUp={() => setChocolatScale(1)}
        >
          <Model src={autresData.chocolat.model} scale={1} />
        </group>

        {/* Poulet */}
        <group
          position={[18, 0, 18]}
          scale={pouletScale}
          onPointerDown={() => {
            setPouletScale(0.8);
            handleAutreClick('poulet');
          }}
          onPointerUp={() => setPouletScale(1)}
        >
          <Model src={autresData.poulet.model} scale={1.3} />
        </group>

        {/* Saumon */}
        <group
          position={[18, 0.3, 23]}
          scale={saumonScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setSaumonScale(0.8);
            handleAutreClick('saumon');
          }}
          onPointerUp={() => setSaumonScale(1)}
        >
          <Model src={autresData.saumon.model} scale={1} />
        </group>
      </group>
    </Suspense>
  );
};
