export const SceneLights = () => {
  return (
    <>
      <ambientLight color={0xffffff} intensity={2} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        color={0xffffff}
        castShadow
      />
      <directionalLight
        position={[-5, 5, 5]}
        intensity={1}
        color={0xffffff}
      />
    </>
  );
};
