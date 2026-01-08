import { useState, Suspense } from 'react';
import saucesData, { SauceType } from '@/data/saucesData';
import Model from '@/components/Model';
import { useSelectedFoodSound } from '@/hooks/useButtonSound';

type SauceProps = {
  onSauceClick: (sauceType: SauceType) => void;
};

export const Sauce = ({ onSauceClick }: SauceProps) => {
  const [citronScale, setCitronScale] = useState(1);
  const [confitureScale, setConfitureScale] = useState(1);
  const [sauceScale, setSauceScale] = useState(1);
  const playSelectedFoodSound = useSelectedFoodSound();

  const handleSauceClick = async (sauceType: SauceType) => {
    await playSelectedFoodSound();
    onSauceClick(sauceType);
  };

  return (
    <Suspense fallback={null}>

      <group>
        {/* Citron */}
        <group
          position={[18, 1, 13]}
          scale={citronScale}
          onPointerDown={() => {
            setCitronScale(0.8);
            handleSauceClick('citron');
          }}
          onPointerUp={() => setCitronScale(1)}
        >
          <Model src={saucesData.citron.model} scale={1.5} />
        </group>

        {/* Confiture */}
        <group
          position={[18, 1, 18]}
          scale={confitureScale}
          onPointerDown={() => {
            setConfitureScale(0.8);
            handleSauceClick('confiture');
          }}
          onPointerUp={() => setConfitureScale(1)}
        >
          <Model src={saucesData.confiture.model} scale={1.5} />
        </group>

        {/* Sauce */}
        <group
          position={[18, 1.3, 23]}
          scale={sauceScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setSauceScale(0.8);
            handleSauceClick('sauce');
          }}
          onPointerUp={() => setSauceScale(1)}
        >
          <Model src={saucesData.sauce.model} scale={1.5} />
        </group>
      </group>
    </Suspense>
  );
};
