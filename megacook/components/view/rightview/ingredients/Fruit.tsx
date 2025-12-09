import { useState, Suspense } from 'react';
import basesData, { BaseType } from '@/data/basesData';
import fruitsData, { FruitType } from '@/data/fruitsData';
import Model from '@/components/Model';

type FruitProps = {
  onFruitClick: (fruitType: FruitType) => void;
};

export const Fruit = ({ onFruitClick }: FruitProps) => {
  const [pouletScale, setPouletScale] = useState(1);
  const [champignonScale, setChampignonScale] = useState(1);
  const [dinosaureScale, setDinosaureScale] = useState(1);

  return (
    <Suspense fallback={null}>

      <group>
        {/* Poulet */}
        <group
          position={[18, 1, 13]}
          scale={pouletScale}
          onPointerDown={() => {
            setPouletScale(0.8);
            onFruitClick('poulet');
          }}
          onPointerUp={() => setPouletScale(1)}
        >
          <Model src={fruitsData.poulet.model} scale={1} />
        </group>

        {/* Champignon */}
        <group
          position={[18, 1, 18]}
          scale={champignonScale}
          onPointerDown={() => {
            setChampignonScale(0.8);
            onFruitClick('champignon');
          }}
          onPointerUp={() => setChampignonScale(1)}
        >
          <Model src={fruitsData.champignon.model} scale={1} />
        </group>

        {/* Dinosaure */}
        <group
          position={[18, 1, 23]}
          scale={dinosaureScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setDinosaureScale(0.8);
            onFruitClick('dinosaure');
          }}
          onPointerUp={() => setDinosaureScale(1)}
        >
          <Model src={fruitsData.dinosaure.model} scale={1} />
        </group>
      </group>
    </Suspense>
  );
};
