import { useState, Suspense } from 'react';
import saucesData, { SauceType } from '@/data/saucesData';
import Model from '@/components/Model';

type SauceProps = {
  onSauceClick: (sauceType: SauceType) => void;
};

export const Sauce = ({ onSauceClick }: SauceProps) => {
  const [broccoliScale, setBroccoliScale] = useState(1);
  const [monkeyScale, setMonkeyScale] = useState(1);
  const [pimentScale, setPimentScale] = useState(1);

  return (
    <Suspense fallback={null}>

      <group>
        {/* Broccoli */}
        <group
          position={[18, 1, 13]}
          scale={broccoliScale}
          onPointerDown={() => {
            setBroccoliScale(0.8);
            onSauceClick('broccoli');
          }}
          onPointerUp={() => setBroccoliScale(1)}
        >
          <Model src={saucesData.broccoli.model} scale={1.5} />
        </group>

        {/* Monkey */}
        <group
          position={[18, 1, 18]}
          scale={monkeyScale}
          onPointerDown={() => {
            setMonkeyScale(0.8);
            onSauceClick('monkey');
          }}
          onPointerUp={() => setMonkeyScale(1)}
        >
          <Model src={saucesData.monkey.model} scale={1.5} />
        </group>

        {/* Piment */}
        <group
          position={[18, 0.65, 23]}
          scale={pimentScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setPimentScale(0.8);
            onSauceClick('piment');
          }}
          onPointerUp={() => setPimentScale(1)}
        >
          <Model src={saucesData.piment.model} scale={1.5} />
        </group>
      </group>
    </Suspense>
  );
};
