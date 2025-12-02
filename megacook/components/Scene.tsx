import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { ChefType } from "@/data/chefsData";
import { AutreType } from "@/data/autresData";
import { BaseType } from "@/data/basesData";
import { ModelType } from "@/data/modelsData";
import PlateScene from "./PlateScene";
import { useDataLoading } from "@/hooks/useDataLoading";
import Floor from "./Floor";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
  const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);
  [];
  const { assetsLoaded, modelUris } = useDataLoading();

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <Canvas
          style={styles.canvas}
          camera={{
            position: [1, 10, 15],
            fov: 55,
            near: 0.1,
            far: 500,
          }}
        >
          <OrbitControls />
          <Floor />
          {modelUris.assiette && (
            <PlateScene
              alimentSrc={
                selectedModel && modelUris[selectedModel]
                  ? modelUris[selectedModel]
                  : ""
              }
              baseSrc={
                selectedBase && modelUris[selectedBase]
                  ? modelUris[selectedBase]
                  : null
              }
              autreSrc={
                selectedAutre && modelUris[selectedAutre]
                  ? modelUris[selectedAutre]
                  : null
              }
              assietteModel={modelUris.assiette}
            />
          )}
        </Canvas>
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
