import { View, StyleSheet } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState } from "react";
import { ChefType } from "@/data/chefsData";
import { AutreType } from "@/data/autresData";
import { BaseType } from "@/data/basesData";
import { ModelType } from "@/data/modelsData";
import PlateScene from "./PlateScene";
import { useDataLoading } from "@/hooks/useDataLoading";
import Floor from "./Floor";
import { OrbitControls } from "@react-three/drei";
import { NavigationButtons } from "./ui/button/NavigationButtons";
import CameraControls from "./CameraControls";

export default function Scene() {
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
  const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);
  [];
  const { assetsLoaded, modelUris } = useDataLoading();
  
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

          {/* <OrbitControls /> */}
          <Floor />
          <PlateScene assietteModel={modelUris.assiette} />

          <CameraControls view={currentView} />
        </Canvas>
        <NavigationButtons
          prevView={prevView}
          nextView={nextView}
        />

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
