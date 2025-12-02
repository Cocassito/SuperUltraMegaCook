export const FrontView = () => {
  return (
    <>
        <group>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />   
                <meshBasicMaterial color="yellow" />
            </mesh>
        </group>
    </>

  );
}