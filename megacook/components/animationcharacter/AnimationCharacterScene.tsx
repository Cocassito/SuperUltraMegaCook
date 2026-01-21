import AnimationCharacterLoad from "./AnimationCharacterLoad";

interface AnimationCharacterSceneProps {
  showDanceAnimations?: boolean;
}

export const AnimationCharacterScene = ({
  showDanceAnimations = false,
}: AnimationCharacterSceneProps) => {
  return (
    <>
      <AnimationCharacterLoad
        position={[4, -11, -58]}
        rotation={[0, 0, 0]}
        scale={15}
      />
      <AnimationCharacterLoad
        position={[-80, -12, -15]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={15}
        model="sitdown3"
      />

      <AnimationCharacterLoad
        position={[-22, -12, -43]}
        rotation={[0, Math.PI, 0]}
        scale={15}
        model="sitdown3"
      />
      <AnimationCharacterLoad
        position={[-71, -10, -66]}
        rotation={[0, 0, 0]}
        scale={15}
        model="sitdown2"
      />

      <AnimationCharacterLoad
        position={[-28, -17, 18]}
        rotation={[0, Math.PI / 2, 0]}
        scale={12}
        model="customer"
      />

      {showDanceAnimations && (
        <>
          <AnimationCharacterLoad
            position={[0, -15, -10]}
            rotation={[0, 0, 0]}
            scale={15}
            model="dance1"
          />
          <AnimationCharacterLoad
            position={[-10, -15, -10]}
            rotation={[0, 0, 0]}
            scale={15}
            model="dance2"
          />
          <AnimationCharacterLoad
            position={[10, -15, -10]}
            rotation={[0, 0, 0]}
            scale={15}
            model="dance3"
          />
        </>
      )}
    </>
  );
};
