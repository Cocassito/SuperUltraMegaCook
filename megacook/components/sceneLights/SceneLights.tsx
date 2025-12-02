export const SceneLights = () => {
  return (
    <>
      <color attach="background" args={[0xfff2dd]} />
      <ambientLight color={0xffffff} intensity={1} />
      <directionalLight intensity={0.8} position={[0, 2, 0]} />
    </>
  );
};
