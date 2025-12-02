export const RightView = () => {
  return (
    <>
        <group>
            <mesh position={[10, 0, 10]}>
                <boxGeometry args={[1, 1, 1]} />   
                <meshBasicMaterial color="red" />
            </mesh>
        </group>
    </>
  );
}