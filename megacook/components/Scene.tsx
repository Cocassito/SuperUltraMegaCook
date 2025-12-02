import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useState, useRef } from "react";
import PlateScene from "./PlateScene";
import { useDataLoading } from "@/hooks/useDataLoading";
import Floor from "./Floor";
import { OrbitControls } from "@react-three/drei";
import { NavigationButtons } from "./ui/button/NavigationButtons";
import CameraControls from "./CameraControls";
import { Mesh } from "three";
import { FrontView } from "./view/FrontView";
import { RightView } from "./view/RightView";
import { LeftView } from "./view/LeftView";

export default function Scene() {
  const { assetsLoaded, modelUris } = useDataLoading();

  // Référence au cube pour la caméra
  const cubeRef = useRef<Mesh>(null!);
  const [currentView, setCurrentView] = useState(0);
  
  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % 3);
  };
  
  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <Canvas
          style={styles.canvas}
        >
          <Floor />
          <PlateScene assietteModel={modelUris.assiette} />
          <CameraControls cubeRef={cubeRef}/>
          {currentView === 0 && <FrontView cubeRef={cubeRef} />}
          {currentView === 1 && <RightView cubeRef={cubeRef} />}
          {currentView === 2 && <LeftView cubeRef={cubeRef} />}
          {/* <OrbitControls /> */}
        </Canvas>

        <NavigationButtons prevView={prevView} nextView={nextView} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  canvasWrapper: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});
