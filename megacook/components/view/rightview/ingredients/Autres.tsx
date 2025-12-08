import { useState, Suspense } from 'react';
import autresData, { AutreType } from '@/data/autresData';
import Model from '@/components/Model';

type AutresProps = {
  onAutreClick: (autreType: AutreType) => void;
};

export const Autres = ({ onAutreClick }: AutresProps) => {
  const [pistoletScale, setPistoletScale] = useState(1);
  const [cuberoseScale, setCuberoseScale] = useState(1);
  const [coneScale, setConeScale] = useState(1);

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={3}/>

      <group>
        {/* Pistolet */}
        <group
          position={[10, 0, 8]}
          scale={pistoletScale}
          onPointerDown={() => {
            setPistoletScale(0.8);
            onAutreClick('pistolet');
          }}
          onPointerUp={() => setPistoletScale(1)}
        >
          <Model src={autresData.pistolet.model} scale={1} />
        </group>

        {/* Cube Rose */}
        <group
          position={[10, 0, 10]}
          scale={cuberoseScale}
          onPointerDown={() => {
            setCuberoseScale(0.8);
            onAutreClick('cuberose');
          }}
          onPointerUp={() => setCuberoseScale(1)}
        >
          <Model src={autresData.cuberose.model} scale={1} />
        </group>

        {/* Cône */}
        <group
          position={[10, 0, 12]}
          scale={coneScale}
          rotation={[0, -Math.PI / 2, 0]}
          onPointerDown={() => {
            setConeScale(0.8);
            onAutreClick('cone');
          }}
          onPointerUp={() => setConeScale(1)}
        >
          <Model src={autresData.cone.model} scale={1} />
        </group>
      </group>
    </Suspense>
  );
};
