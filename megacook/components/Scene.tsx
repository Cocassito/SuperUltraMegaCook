"use dom";

import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BaseType } from "@/data/basesData";
import PlateScene from "./PlateScene";
import { useDataLoading } from "@/hooks/useDataLoading";
import Floor from "./Floor";
import { OrbitControls } from "@react-three/drei";
import { NavigationButtons } from "./ui/button/NavigationButtons";
import CameraControls from "./camera/CameraControls";
import { Mesh } from "three";
import { FrontView } from "./view/frontview/FrontView";
import { RightView } from "./view/rightview/RightView";
import { LeftView } from "./view/leftview/LeftView";
import { BottomView } from "./view/frontview/BottomView";
import { BottomRightView } from "./view/rightview/BottomRightView";
import { BottomLeftView } from "./view/leftview/BottomLeftView";
import { BackView } from "./view/backview/BackView";
import PixelatedPass from "./postProd/PixelComposer";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { SyncedCamera } from "./camera/SyncedCamera";
import Screen from "./screen/Screen";

export default function Scene() {
  const window = useWindowDimensions();
  const { assetsLoaded, modelUris } = useDataLoading();
  const navigation = useViewNavigation();

  // Référence au cube pour la caméra
  const cubeRef = useRef<Mesh>(null!);
  const cameraRef = useRef<any>(null);
  
  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);

  return (
    <View
      style={[styles.container, { width: window.width, height: window.height }]}
    >
      <View style={styles.canvasWrapper}>
        <Canvas style={styles.canvas}>
          <Floor />
          <PlateScene 
            assietteModel={modelUris.assiette} 
            onBaseClick={(baseType) => setSelectedBase(baseType)}
          />
          <CameraControls
            cubeRef={cubeRef}
            currentView={navigation.currentView}
            cameraRef={cameraRef}
          />

          {navigation.currentView === 0 && <FrontView cubeRef={cubeRef} />}
          {navigation.currentView === 1 && <RightView cubeRef={cubeRef} />}
          {navigation.currentView === 2 && <LeftView cubeRef={cubeRef} />}
          {navigation.currentView === 3 && <BottomView cubeRef={cubeRef} />}
          {navigation.currentView === 4 && (
            <BottomRightView cubeRef={cubeRef} />
          )}
          {navigation.currentView === 5 && <BottomLeftView cubeRef={cubeRef} />}
          {navigation.currentView === 6 && <BackView cubeRef={cubeRef} />}
          {/* <OrbitControls /> */}
          <PixelatedPass pixelSize={8} />
        </Canvas>

        {/* Canvas sans le post Processing */}
        <Canvas style={styles.canvasOverlay}>
          <SyncedCamera cameraRef={cameraRef} />
          <Screen selectedBase={selectedBase} />
        </Canvas>

        <NavigationButtons {...navigation} />
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
  canvasOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
});
