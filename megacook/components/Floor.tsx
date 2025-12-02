import { View, StyleSheet } from "react-native";

export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[50, 50, 50]} />
      <meshBasicMaterial color="lightgrey" />
    </mesh>
  );
}
