import { useState, Suspense } from 'react';
import basesData, { BaseType } from '@/data/basesData';
import Model from '@/components/Model';

type BaseProps = {
  onBaseClick: (baseType: BaseType) => void;
};

export const Base = ({ onBaseClick }: BaseProps) => {
  const [fritesScale, setFritesScale] = useState(1);
  const [rizScale, setRizScale] = useState(1);
  const [pâtesScale, setPâtesScale] = useState(1);

  return (
    <Suspense fallback={null}>

      <group>
        {/* Frites */}
        <group
          position={[18, 0, 13]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={fritesScale}
          onPointerDown={() => {
            setFritesScale(0.8);
            onBaseClick('frites');
          }}
          onPointerUp={() => setFritesScale(1)}
        >
          <Model src={basesData.frites.model} scale={1} />
        </group>

        {/* Riz */}
        <group
          position={[18, 0, 18]}
          scale={rizScale}
          onPointerDown={() => {
            setRizScale(0.8);
            onBaseClick('riz');
          }}
          onPointerUp={() => setRizScale(1)}
        >
          <Model src={basesData.riz.model} scale={1} />
        </group>

        {/* Pâtes*/}
        <group
          position={[18, 0, 23]}
          scale={pâtesScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setPâtesScale(0.8);
            onBaseClick('pâtes');
          }}
          onPointerUp={() => setPâtesScale(1)}
        >
          <Model src={basesData.pâtes.model} scale={1} />
        </group>
      </group>
    </Suspense>
  );
};
