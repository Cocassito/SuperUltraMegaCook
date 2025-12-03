import { View, StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import PlateScene from "./PlateScene";
import { useDataLoading } from "@/hooks/useDataLoading";
import Floor from "./Floor";
import { OrbitControls } from "@react-three/drei";
import { NavigationButtons } from "./ui/button/NavigationButtons";
import CameraControls from "./CameraControls";
import { Mesh } from "three";
import { FrontView } from "./view/frontview/FrontView";
import { RightView } from "./view/rightview/RightView";
import { LeftView } from "./view/leftview/LeftView";
import { BottomView } from "./view/frontview/BottomView";
import { BottomRightView } from "./view/rightview/BottomRightView";
import { BottomLeftView } from "./view/leftview/BottomLeftView";
import { BackView } from "./view/backview/BackView";
import PixelatedPass from "./PixelComposer";
import { useViewNavigation } from "@/hooks/useViewNavigation";

export default function Scene() {
  const { assetsLoaded, modelUris } = useDataLoading();
  const navigation = useViewNavigation();

  // Référence au cube pour la caméra
  const cubeRef = useRef<Mesh>(null!);

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <Canvas
          style={styles.canvas}
        >
          <Floor />
          <PlateScene assietteModel={modelUris.assiette} />
          <CameraControls cubeRef={cubeRef} currentView={navigation.currentView} />

          {navigation.currentView === 0 && <FrontView cubeRef={cubeRef} />}
          {navigation.currentView === 1 && <RightView cubeRef={cubeRef} />}
          {navigation.currentView === 2 && <LeftView cubeRef={cubeRef} />}
          {navigation.currentView === 3 && <BottomView cubeRef={cubeRef} />}
          {navigation.currentView === 4 && <BottomRightView cubeRef={cubeRef} />}
          {navigation.currentView === 5 && <BottomLeftView cubeRef={cubeRef} />}
          {navigation.currentView === 6 && <BackView cubeRef={cubeRef} />}
          {/* <OrbitControls /> */}
          {/* <PixelatedPass pixelSize={3} /> */}
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
});
