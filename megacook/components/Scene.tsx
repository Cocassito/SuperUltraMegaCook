"use dom";

import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BaseType } from "@/data/basesData";
import Floor from "./Floor";
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
import ScreenAverage from "./view/backview/ScreenAverage";

import PixelatedPass from "./postProd/PixelComposer";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { SyncedCamera } from "./camera/SyncedCamera";
import Screen from "./view/rightview/Screen";

import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import { OrbitControls } from "@react-three/drei";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";

import { SceneLights } from "./sceneLights/SceneLights";

import Model from "./Model";
import { Order } from "./view/leftview/Order";
import PlateScene from "./view/frontview/PlateScene";

export default function Scene() {
  const window = useWindowDimensions();
  const navigation = useViewNavigation();
  // Référence au cube pour la caméra
  const cubeRef = useRef<Mesh>(null!);
  const cameraRef = useRef<any>(null);

  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<FruitType | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<SauceType | null>(null);
  const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);
  const [hasValidatedBase, setHasValidatedBase] = useState(false);
  const [hasValidatedFruit, setHasValidatedFruit] = useState(false);
  const [hasValidatedSauce, setHasValidatedSauce] = useState(false);

  const [validatedModel, setValidatedModel] = useState<string | null>(null);
  const [validatedFruitModel, setValidatedFruitModel] = useState<string | null>(null);
  const [validatedSauceModel, setValidatedSauceModel] = useState<string | null>(null);
  const [validatedAutreModel, setValidatedAutreModel] = useState<string | null>(null);
  const [showOrder, setShowOrder] = useState(false);

  return (
    <View
      style={[styles.container, { width: window.width, height: window.height }]}
    >
      <View style={styles.canvasWrapper}>
        {/* Canvas principal avec le post-processing */}
        <Canvas style={styles.canvas}>
          {/* <Floor /> */}

          <CameraControls
            cubeRef={cubeRef}
            currentView={navigation.currentView}
            cameraRef={cameraRef}
          />

          {/* PlateScene global - rendu une seule fois */}
          <PlateScene
            validatedModel={validatedModel}
            validatedFruitModel={validatedFruitModel}
            validatedSauceModel={validatedSauceModel}
            validatedAutreModel={validatedAutreModel}
          />

          {navigation.currentView === 0 && (
            <FrontView
              cubeRef={cubeRef}
              onValidate={() => {
                navigation.setCurrentView(0);
              }}
            />
          )}

          {navigation.currentView === 1 && (
            <RightView
              cubeRef={cubeRef}
              hasValidatedBase={hasValidatedBase}
              hasValidatedFruit={hasValidatedFruit}
              hasValidatedSauce={hasValidatedSauce}
              onBaseClick={setSelectedBase}
              onFruitClick={setSelectedFruit}
              onSauceClick={setSelectedSauce}
              onAutreClick={setSelectedAutre}
            />
          )}
          {navigation.currentView === 2 && (
            <LeftView
              cubeRef={cubeRef}
              onOpenOrder={() => setShowOrder(true)}
            />
          )}
          {navigation.currentView === 3 && <BottomView cubeRef={cubeRef} />}
          {navigation.currentView === 4 && (
            <BottomRightView cubeRef={cubeRef} />
          )}
          {navigation.currentView === 5 && <BottomLeftView cubeRef={cubeRef} />}
          {navigation.currentView === 6 && <BackView cubeRef={cubeRef} />}

          <PixelatedPass pixelSize={4} />
          <SceneLights />

          <group position={[-28, -11.6, -18]} rotation={[0, -Math.PI / 2, 0]}>
            <Model
              src={require("../assets/models/environment/scene.glb")}
              scale={8}
            />
          </group>

          <OrbitControls />
        </Canvas>

        {/* Canvas sans le post Processing dans la Right View*/}
        <Canvas style={styles.canvasOverlay}>
          <SyncedCamera cameraRef={cameraRef} />

          <Screen
            selectedBase={selectedBase}
            selectedFruit={selectedFruit}
            selectedSauce={selectedSauce}
            selectedAutre={selectedAutre}
            hasValidatedBase={hasValidatedBase}
            hasValidatedFruit={hasValidatedFruit}
            hasValidatedSauce={hasValidatedSauce}
            onValidate={() => {
              if (!hasValidatedBase && selectedBase) {
                setValidatedModel(basesData[selectedBase].model);
                setHasValidatedBase(true);
                navigation.setCurrentView(0);
              } else if (
                hasValidatedBase &&
                !hasValidatedFruit &&
                selectedFruit
              ) {
                setValidatedFruitModel(fruitsData[selectedFruit].model);
                setHasValidatedFruit(true);
                navigation.setCurrentView(0);
              } else if (
                hasValidatedBase &&
                hasValidatedFruit &&
                !hasValidatedSauce &&
                selectedSauce
              ) {
                setValidatedSauceModel(saucesData[selectedSauce].model);
                setHasValidatedSauce(true);
                navigation.setCurrentView(0);
              } else if (
                hasValidatedBase &&
                hasValidatedFruit &&
                hasValidatedSauce &&
                selectedAutre
              ) {
                setValidatedAutreModel(autresData[selectedAutre].model);
                navigation.setCurrentView(0);
              }
            }}
          />

          <ScreenAverage
            validatedBase={selectedBase}
            validatedFruit={selectedFruit}
            validatedSauce={selectedSauce}
            validatedAutre={selectedAutre}
            hasValidatedBase={hasValidatedBase}
            hasValidatedFruit={hasValidatedFruit}
            hasValidatedSauce={hasValidatedSauce}
          />

        </Canvas>

        <NavigationButtons {...navigation} />

        {/* Order Left View */}
        {showOrder && 
          <Order onClose={() => setShowOrder(false)} />
        }
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
    zIndex: 1,
  },
});
