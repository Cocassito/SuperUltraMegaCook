import { useState, Suspense } from 'react';
import basesData, { BaseType } from '@/data/basesData';
import fruitsData, { FruitType } from '@/data/fruitsData';
import Model from '@/components/Model';

type FruitProps = {
  onFruitClick: (fruitType: FruitType) => void;
};

export const Fruit = ({ onFruitClick }: FruitProps) => {
  const [broccoliScale, setBroccoliScale] = useState(1);
  const [pommeScale, setPommeScale] = useState(1);
  const [tomateScale, setTomateScale] = useState(1);

  return (
    <Suspense fallback={null}>

      <group>
        {/* Broccoli */}
        <group
          position={[18, 1, 13]}
          scale={broccoliScale}
          onPointerDown={() => {
            setBroccoliScale(0.8);
            onFruitClick('broccoli');
          }}
          onPointerUp={() => setBroccoliScale(1)}
        >
          <Model src={fruitsData.broccoli.model} scale={1.5} />
        </group>

        {/* Pomme */}
        <group
          position={[18, 1, 18]}
          scale={pommeScale}
          onPointerDown={() => {
            setPommeScale(0.8);
            onFruitClick('pomme');
          }}
          onPointerUp={() => setPommeScale(1)}
        >
          <Model src={fruitsData.pomme.model} scale={1.5} />
        </group>

        {/* Tomate */}
        <group
          position={[18, 1, 23]}
          scale={tomateScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setTomateScale(0.8);
            onFruitClick('tomate');
          }}
          onPointerUp={() => setTomateScale(1)}
        >
          <Model src={fruitsData.tomate.model} scale={1.5} />
        </group>
      </group>
    </Suspense>
  );
};
