export default function Screen () {
    return (
    <>
    <group position={[10, 3, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh>
            <planeGeometry args={[8, 6]} /> 
            <meshStandardMaterial color="#1a1a1a" /> 
        </mesh>
    </group>
    </>
    )
}