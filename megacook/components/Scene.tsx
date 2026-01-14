"use dom";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import { OrderType } from "@/data/ordersData";

import { NavigationButtons } from "./ui/button/NavigationButtons";
import CameraControls from "./camera/CameraControls";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { SyncedCamera } from "./camera/SyncedCamera";
import { PreloadIngredients } from "./preload/PreloadIngredients";

import { Environment } from "./Environment";
import PlateScene from "./view/frontview/PlateScene";
import WalkingCharacter from "./animationcharacter/WalkingCharacter";

import { FrontView } from "./view/frontview/FrontView";
import { RightView } from "./view/rightview/RightView";
import { LeftView } from "./view/leftview/LeftView";
import { BottomView } from "./view/frontview/BottomView";
import { BottomRightView } from "./view/rightview/BottomRightView";
import { BottomLeftView } from "./view/leftview/BottomLeftView";
import { BackView } from "./view/backview/BackView";

import Screen from "./view/rightview/Screen";
import ScreenAverage from "./view/backview/ScreenAverage";
import { AverageResult } from "./view/frontview/AverageResult";
import { Order } from "./view/leftview/Order";

import PixelatedPass from "./postProd/PixelComposer";
import { SceneLights } from "./sceneLights/SceneLights";

import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";

import {
  useTicketSound,
  useSwipeSound,
  useMusicSound,
} from "@/hooks/useButtonSound";

type SceneProps = {
  onSceneReady?: () => void;
};

/* -------------------------------------------------- */
/*  ⭐ Déclenché UNIQUEMENT quand tous les GLTF sont chargés */
/* -------------------------------------------------- */
function SceneReady({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, []);
  return null;
}

export default function Scene({ onSceneReady }: SceneProps) {
  const window = useWindowDimensions();
  const navigation = useViewNavigation();

  const playTicketSound = useTicketSound();
  const playSwipeSound = useSwipeSound();
  const playMusic = useMusicSound();

  const cubeRef = useRef<Mesh>(null!);
  const cameraRef = useRef<any>(null);

  /* ------------------------ STATE ------------------------ */

  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<FruitType | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<SauceType | null>(null);
  const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);

  const [hasValidatedBase, setHasValidatedBase] = useState(false);
  const [hasValidatedFruit, setHasValidatedFruit] = useState(false);
  const [hasValidatedSauce, setHasValidatedSauce] = useState(false);
  const [hasValidatedAutre, setHasValidatedAutre] = useState(false);

  const [validatedModel, setValidatedModel] = useState<string | null>(null);
  const [validatedFruitModel, setValidatedFruitModel] = useState<string | null>(
    null
  );
  const [validatedSauceModel, setValidatedSauceModel] = useState<string | null>(
    null
  );
  const [validatedAutreModel, setValidatedAutreModel] = useState<string | null>(
    null
  );

  const [isCuireBase, setIsCuireBase] = useState(false);
  const [isCuireFruit, setIsCuireFruit] = useState(false);
  const [isCuireAutre, setIsCuireAutre] = useState(false);

  const [showOrder, setShowOrder] = useState(false);
  const [showAverageResult, setShowAverageResult] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderType>(0);
  const [hasOpenedOrder, setHasOpenedOrder] = useState(false);

  const allValidated =
    hasValidatedBase &&
    hasValidatedFruit &&
    hasValidatedSauce &&
    !!validatedAutreModel;

  /* ------------------------ GESTURES ------------------------ */

  const swipeGesture = Gesture.Pan().onEnd((event) => {
    if (Math.abs(event.translationX) > 50) {
      playSwipeSound();
      event.translationX > 0 ? navigation.prevView() : navigation.nextView();
    }
  });

  /* ------------------------ RENDER ------------------------ */

  return (
    <View
      style={[styles.container, { width: window.width, height: window.height }]}
    >
      <PreloadIngredients />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={swipeGesture}>
          <View style={styles.canvasWrapper}>
            {/* ======================= MAIN CANVAS ======================= */}
            <Canvas style={styles.canvas}>
              <Suspense fallback={null}>
                <Environment />

                <CameraControls
                  cubeRef={cubeRef}
                  currentView={navigation.currentView}
                  cameraRef={cameraRef}
                />

                <PlateScene
                  validatedModel={validatedModel}
                  validatedFruitModel={validatedFruitModel}
                  validatedSauceModel={validatedSauceModel}
                  validatedAutreModel={validatedAutreModel}
                  isCuireBase={isCuireBase}
                  isCuireFruit={isCuireFruit}
                  isCuireAutre={isCuireAutre}
                  resetKey={navigation.currentView}
                />

                {/* Perso qui marche */}
                <WalkingCharacter
                  position={[-5, 0, -7]}
                  rotation={[0, Math.PI / 2, 0]}
                  scale={5}
                />
                <WalkingCharacter
                  position={[-25, 1, 23]}
                  rotation={[0, Math.PI, 0]}
                  scale={5}
                />

                {navigation.currentView === 0 && (
                  <FrontView
                    cubeRef={cubeRef}
                    onValidate={() => {
                      navigation.setCurrentView(0);
                    }}
                    onOpenAverageResult={() => setShowAverageResult(true)}
                    onNavigateToBottomView={() => navigation.setCurrentView(3)}
                    canShowAverage={allValidated}
                  />
                )}

                {navigation.currentView === 1 && (
                  <RightView
                    cubeRef={cubeRef}
                    hasValidatedBase={hasValidatedBase}
                    hasValidatedFruit={hasValidatedFruit}
                    hasValidatedSauce={hasValidatedSauce}
                    hasValidatedAutre={hasValidatedAutre}
                    onBaseClick={setSelectedBase}
                    onFruitClick={setSelectedFruit}
                    onSauceClick={setSelectedSauce}
                    onAutreClick={setSelectedAutre}
                    hasOpenedOrder={hasOpenedOrder}
                  />
                )}

                {navigation.currentView === 2 && (
                  <LeftView
                    cubeRef={cubeRef}
                    onOpenOrder={() => {
                      setShowOrder(true);
                      setHasOpenedOrder(true);
                    }}
                  />
                )}

                {navigation.currentView === 3 && (
                  <BottomView
                    cubeRef={cubeRef}
                    onNavigateToFront={() => navigation.setCurrentView(0)}
                  />
                )}
                {navigation.currentView === 4 && (
                  <BottomRightView cubeRef={cubeRef} />
                )}
                {navigation.currentView === 5 && (
                  <BottomLeftView cubeRef={cubeRef} />
                )}
                {navigation.currentView === 6 && <BackView cubeRef={cubeRef} />}

                {/* ⭐ FIN DU LOADING */}
                <SceneReady
                  onReady={() => {
                    onSceneReady?.();
                  }}
                />
              </Suspense>

              <PixelatedPass pixelSize={2} />
              <SceneLights />
            </Canvas>

            {/* ======================= OVERLAY CANVAS ======================= */}
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
                allValidated={allValidated}
                isBottomRightView={navigation.currentView === 4}
                onScreenClick={() => navigation.setCurrentView(4)}
                onCuireChange={(isCuire) => {
                  if (!hasValidatedBase) setIsCuireBase(isCuire);
                  else if (!hasValidatedFruit) setIsCuireFruit(isCuire);
                  else setIsCuireAutre(isCuire);
                }}
                onValidate={() => {
                  if (!hasValidatedBase && selectedBase) {
                    setValidatedModel(basesData[selectedBase].model);
                    setHasValidatedBase(true);
                  } else if (!hasValidatedFruit && selectedFruit) {
                    setValidatedFruitModel(fruitsData[selectedFruit].model);
                    setHasValidatedFruit(true);
                  } else if (!hasValidatedSauce && selectedSauce) {
                    setValidatedSauceModel(saucesData[selectedSauce].model);
                    setHasValidatedSauce(true);
                  } else if (selectedAutre) {
                    setValidatedAutreModel(autresData[selectedAutre].model);
                    setHasValidatedAutre(true);
                    playTicketSound();
                  }
                  navigation.setCurrentView(0);
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

            {!showOrder && !showAverageResult && (
              <NavigationButtons
                {...navigation}
                hasOpenedOrder={hasOpenedOrder}
                allValidated={allValidated}
              />
            )}
            {showAverageResult && (
              <AverageResult
                onClose={() => setShowAverageResult(false)}
                validatedBase={selectedBase}
                validatedFruit={selectedFruit}
                validatedSauce={selectedSauce}
                validatedAutre={selectedAutre}
                orderType={currentOrder}
              />
            )}

            {showOrder && (
              <Order
                onClose={() => setShowOrder(false)}
                orderType={currentOrder}
              />
            )}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

/* ------------------------ STYLES ------------------------ */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  canvasWrapper: { flex: 1 },
  canvas: { flex: 1 },
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
