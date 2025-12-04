import { useState, Suspense } from 'react';
import { useLoader } from '../../lib/fiber';
import { GLTFLoader } from 'three-stdlib';
import basesData, { BaseType } from '@/data/basesData';

type BaseProps = {
  onBaseClick: (baseType: BaseType) => void;
};

function Model({ src, scale = 1 }: { src: string; scale?: number }) {
  const gltf = useLoader(GLTFLoader, src);
  return <primitive object={gltf.scene.clone()} scale={scale} />;
}

export const Base = ({ onBaseClick }: BaseProps) => {
  const [pailleScale, setPailleScale] = useState(1);
  const [pistoletScale, setPistoletScale] = useState(1);
  const [monkeyScale, setMonkeyScale] = useState(1);

  return (
    <Suspense fallback={null}>
      <group>
        {/* Paille */}
        <group
          position={[10, 0, 8]}
          scale={pailleScale}
          onPointerDown={() => {
            setPailleScale(0.8);
            onBaseClick('paille');
          }}
          onPointerUp={() => setPailleScale(1)}
        >
          <Model src={basesData.paille.model} scale={1} />
        </group>

        {/* Pistolet */}
        <group
          position={[10, 0, 10]}
          scale={pistoletScale}
          onPointerDown={() => {
            setPistoletScale(0.8);
            onBaseClick('pistolet');
          }}
          onPointerUp={() => setPistoletScale(1)}
        >
          <Model src={basesData.pistolet.model} scale={1} />
        </group>

        {/* Monkey */}
        <group
          position={[10, 0, 12]}
          scale={monkeyScale}
          onPointerDown={() => {
            setMonkeyScale(0.8);
            onBaseClick('monkey');
          }}
          onPointerUp={() => setMonkeyScale(1)}
        >
          <Model src={basesData.monkey.model} scale={1} />
        </group>
      </group>
    </Suspense>
  );
};
