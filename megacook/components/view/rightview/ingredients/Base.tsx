import { useState, Suspense } from 'react';
import basesData, { BaseType } from '@/data/basesData';
import Model from '@/components/Model';

type BaseProps = {
  onBaseClick: (baseType: BaseType) => void;
};

export const Base = ({ onBaseClick }: BaseProps) => {
  const [broccoliScale, setBroccoliScale] = useState(1);
  const [pommeScale, setPommeScale] = useState(1);
  const [pimentScale, setPimentScale] = useState(1);

  return (
    <Suspense fallback={null}>

      <group>
        {/* Broccoli */}
        <group
          position={[10, 0, 8]}
          scale={broccoliScale}
          onPointerDown={() => {
            setBroccoliScale(0.8);
            onBaseClick('broccoli');
          }}
          onPointerUp={() => setBroccoliScale(1)}
        >
          <Model src={basesData.broccoli.model} scale={1} />
        </group>

        {/* Pomme */}
        <group
          position={[10, 0, 10]}
          scale={pommeScale}
          onPointerDown={() => {
            setPommeScale(0.8);
            onBaseClick('pomme');
          }}
          onPointerUp={() => setPommeScale(1)}
        >
          <Model src={basesData.pomme.model} scale={1} />
        </group>

        {/* Piment */}
        <group
          position={[10, 0, 12]}
          scale={pimentScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setPimentScale(0.8);
            onBaseClick('piment');
          }}
          onPointerUp={() => setPimentScale(1)}
        >
          <Model src={basesData.piment.model} scale={1} />
        </group>
      </group>
    </Suspense>
  );
};
