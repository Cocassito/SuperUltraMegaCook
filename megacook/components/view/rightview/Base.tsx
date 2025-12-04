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
  const [broccoliScale, setBroccoliScale] = useState(1);
  const [pommeScale, setPommeScale] = useState(1);
  const [pimentScale, setPimentScale] = useState(1);

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={3}/>

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
