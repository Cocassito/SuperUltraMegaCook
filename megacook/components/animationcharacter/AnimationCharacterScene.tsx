import AnimationCharacterLoad from "./AnimationCharacterLoad"

export const AnimationCharacterScene = () => {
  return (
    <>
      <AnimationCharacterLoad
        position={[4, -11, -58]}
        rotation={[0, 0, 0]}
        scale={15}
      />
      <AnimationCharacterLoad
        position={[-75, -12, -15]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={15}
      />

      <AnimationCharacterLoad
        position={[-22, -10, -41]}
        rotation={[0, Math.PI, 0]}
        scale={15}
        model="customer"
      />
      <AnimationCharacterLoad
        position={[-71, -10, -58]}
        rotation={[0, 0, 0]}
        scale={15}
        model="customer"
      />

      <AnimationCharacterLoad
        position={[-28, -17, 18]}
        rotation={[0, Math.PI / 2, 0]}
        scale={17}
        model="walking"
      />
    </>
  )
}