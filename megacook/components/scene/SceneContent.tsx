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
import { OrderType } from "@/data/ordersData";
import { ChefType } from "@/data/chefsData";

import { NavigationButtons } from "../ui/button/NavigationButtons";
import { DialogueDisplay } from "../ui/DialogueDisplay";
import CameraControls from "../camera/CameraControls";
import { useViewNavigation } from "@/hooks/useViewNavigation";
import { SyncedCamera } from "../camera/SyncedCamera";
import { PreloadIngredients } from "../preload/PreloadIngredients";

import { Environment } from "../Environment";
import PlateScene from "../view/frontview/PlateScene";
import { AnimationCharacterScene } from "../animationcharacter/AnimationCharacterScene";

import { FrontView } from "../view/frontview/FrontView";
import { RightView } from "../view/rightview/RightView";
import { LeftView } from "../view/leftview/LeftView";
import { BottomView } from "../view/frontview/BottomView";
import { BottomRightView } from "../view/rightview/BottomRightView";
import { BottomLeftView } from "../view/leftview/BottomLeftView";
import { BackView } from "../view/backview/BackView";

import Screen from "../view/rightview/Screen";
import ScreenAverage from "../view/backview/ScreenAverage";
import { AverageResult } from "../view/frontview/AverageResult";
import { Order } from "../view/leftview/Order";
import { ChefCard } from "../view/rightview/ingredients/ChefCard";
import { BurnedSalmonAlert } from "../view/rightview/BurnedSalmonAlert";
import { PlayerMachine } from "../PlayerMachine";
import { FinalPlateView } from "../view/finalPlate/FinalPlateView";

import PixelatedPass from "../postProd/PixelComposer";
import { SceneLights } from "../sceneLights/SceneLights";

import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import chefsData from "@/data/chefsData";

import { OrbitControls } from "@react-three/drei";

import {
  useTicketSound,
  useSwipeSound,
  useMusicSound,
} from "@/hooks/useButtonSound";
import Stepper from "../svg/gauge/Stepper";

import { useSceneUI } from "@/hooks/useSceneUI";
import { useSceneSelection } from "@/hooks/useSceneSelection";
import { useSceneValidation } from "@/hooks/useSceneValidation";
import { useSceneActions } from "@/hooks/useSceneAction";

type SceneProps = {
  onSceneReady?: () => void;
};

function SceneReady({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, []);
  return null;
}

export default function SceneContent({ onSceneReady }: SceneProps) {
  /* ---------------- HOOKS ---------------- */

  const window = useWindowDimensions();
  const navigation = useViewNavigation();

  const playTicketSound = useTicketSound();
  const playSwipeSound = useSwipeSound();
  const playMusic = useMusicSound();

  const cubeRef = useRef<Mesh>(null!);
  const cameraRef = useRef<any>(null);

  /* ---------------- STATE ---------------- */

  const [validatedModel, setValidatedModel] = useState<string | null>(null);
  const [validatedFruitModel, setValidatedFruitModel] = useState<string | null>(null);
  const [validatedSauceModel, setValidatedSauceModel] = useState<string | null>(null);
  const [validatedAutreModel, setValidatedAutreModel] = useState<string | null>(null);
  const [validatedChefModel, setValidatedChefModel] = useState<string | null>(null);

  const [currentOrder, setCurrentOrder] = useState<OrderType>(0);
  const [hasOpenedOrder, setHasOpenedOrder] = useState(false);

  const chefOrder: ChefType[] = ["sylvain", "merecotte", "philippeetchebest"];

  const getNextChef = (type: ChefType) =>
    chefOrder[(chefOrder.indexOf(type) + 1) % chefOrder.length];

  const getPrevChef = (type: ChefType) =>
    chefOrder[
      (chefOrder.indexOf(type) - 1 + chefOrder.length) % chefOrder.length
    ];

  /* ---------------- GESTURE ---------------- */
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    if (Math.abs(event.translationX) > 50) {
      playSwipeSound();
      event.translationX > 0 ? navigation.prevView() : navigation.nextView();
    }
  });

  const ui = useSceneUI();
  const selection = useSceneSelection();
  const validation = useSceneValidation();
  const actions = useSceneActions(playTicketSound);

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
                  isCuireBase={actions.isCuireBase}
                  isCuireFruit={actions.isCuireFruit}
                  isCuireAutre={actions.isCuireAutre}
                  resetKey={navigation.currentView}
                  hasValidatedChef={validation.hasValidatedChef}
                  selectedAutre={selection.selectedAutre}
                />

                <AnimationCharacterScene />

                {navigation.currentView === 0 && (
                  <FrontView
                    cubeRef={cubeRef}
                    onValidate={() => {
                      navigation.setCurrentView(0);
                    }}
                    onOpenAverageResult={() => ui.setShowAverageResult(true)}
                    onNavigateToBottomView={() => navigation.setCurrentView(3)}
                    canShowAverage={validation.allValidated}
                  />
                )}

                {navigation.currentView === 1 && (
                  <RightView
                    cubeRef={cubeRef}
                    hasValidatedBase={validation.hasValidatedBase}
                    hasValidatedFruit={validation.hasValidatedFruit}
                    hasValidatedSauce={validation.hasValidatedSauce}
                    hasValidatedAutre={validation.hasValidatedAutre}
                    hasValidatedChef={validation.hasValidatedChef}
                    onBaseClick={selection.setSelectedBase}
                    onFruitClick={selection.setSelectedFruit}
                    onSauceClick={selection.setSelectedSauce}
                    onAutreClick={selection.setSelectedAutre}
                    onChefClick={(chef) => {
                      selection.setSelectedChef(chef);
                      ui.setShowChefCard(true);
                    }}
                    validatedModel={validatedModel}
                    validatedFruitModel={validatedFruitModel}
                    validatedSauceModel={validatedSauceModel}
                    validatedAutreModel={validatedAutreModel}
                    validatedChefModel={validatedChefModel}
                    hasOpenedOrder={hasOpenedOrder}
                  />
                )}

                {navigation.currentView === 2 && (
                  <LeftView
                    cubeRef={cubeRef}
                    onOpenOrder={() => {
                      ui.setShowOrder(true);
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

              <PixelatedPass pixelSize={1} />
              <SceneLights />
              <OrbitControls />
            </Canvas>

            {/* ======================= OVERLAY CANVAS ======================= */}
            <Canvas style={styles.canvasOverlay}>
              <SyncedCamera cameraRef={cameraRef} />

              <Screen
                selectedBase={selection.selectedBase}
                selectedFruit={selection.selectedFruit}
                selectedSauce={selection.selectedSauce}
                selectedAutre={selection.selectedAutre}
                selectedChef={selection.selectedChef}
                hasValidatedBase={validation.hasValidatedBase}
                hasValidatedFruit={validation.hasValidatedFruit}
                hasValidatedSauce={validation.hasValidatedSauce}
                hasValidatedAutre={validation.hasValidatedAutre}
                hasValidatedChef={validation.hasValidatedChef}
                allValidated={validation.allValidated}
                isBottomRightView={navigation.currentView === 4}
                currentView={navigation.currentView}
                onScreenClick={() => navigation.setCurrentView(4)}
                onRestart={() => {
                  selection.setSelectedBase(null);
                  selection.setSelectedFruit(null);
                  selection.setSelectedSauce(null);
                  selection.setSelectedAutre(null);
                  selection.setSelectedChef(null);
                  validation.resetValidation();
                  validation.setHasValidatedFruit(false);
                  validation.setHasValidatedSauce(false);
                  validation.setHasValidatedAutre(false);
                  validation.setHasValidatedChef(false);
                  setValidatedModel(null);
                  setValidatedFruitModel(null);
                  setValidatedSauceModel(null);
                  setValidatedAutreModel(null);
                  setValidatedChefModel(null);
                  actions.setIsCuireBase(false);
                  actions.setIsCuireFruit(false);
                  actions.setIsCuireAutre(false);
                  ui.setShowAverageResult(false);
                  ui.setShowBurnedSalmon(false);
                  setCurrentOrder(0);
                  setHasOpenedOrder(false);
                  navigation.setCurrentView(0);
                }}
                onCuireChange={(isCuire) => {
                  if (!validation.hasValidatedBase) actions.setIsCuireBase(isCuire);
                  else if (!validation.hasValidatedFruit) actions.setIsCuireFruit(isCuire);
                  else actions.setIsCuireAutre(isCuire);
                }}
                onValidate={() => {
                  if (!validation.hasValidatedBase && selection.selectedBase) {
                    setValidatedModel(basesData[selection.selectedBase].model);
                    validation.setHasValidatedBase(true);
                  } else if (
                    !validation.hasValidatedFruit &&
                    selection.selectedFruit
                  ) {
                    setValidatedFruitModel(
                      fruitsData[selection.selectedFruit].model
                    );
                    validation.setHasValidatedFruit(true);
                  } else if (
                    !validation.hasValidatedSauce &&
                    selection.selectedSauce
                  ) {
                    setValidatedSauceModel(
                      saucesData[selection.selectedSauce].model
                    );
                    validation.setHasValidatedSauce(true);
                  } else if (selection.selectedAutre) {
                    setValidatedAutreModel(
                      autresData[selection.selectedAutre].model
                    );
                    validation.setHasValidatedAutre(true);

                    // Si saumon + cuisson, afficher l'alerte cramé
                    if (
                      selection.selectedAutre === "saumon" &&
                      actions.isCuireAutre
                    ) {
                      ui.setShowBurnedSalmon(true);
                      return; // Ne pas changer de vue
                    }
                  } else if (
                    selection.selectedChef &&
                    !validation.hasValidatedChef
                  ) {
                    setValidatedChefModel(
                      chefsData[selection.selectedChef].name
                    );
                    validation.setHasValidatedChef(true);
                    playTicketSound();
                  }
                  navigation.setCurrentView(0);
                }}
              />

              <ScreenAverage
                validatedBase={selection.selectedBase}
                validatedFruit={selection.selectedFruit}
                validatedSauce={selection.selectedSauce}
                validatedAutre={selection.selectedAutre}
                hasValidatedBase={validation.hasValidatedBase}
                hasValidatedFruit={validation.hasValidatedFruit}
                hasValidatedSauce={validation.hasValidatedSauce}
              />
            </Canvas>

            {/* 🟣 STEPPER */}
            {hasOpenedOrder && !ui.showPlayerMachine && !ui.showFinalPlate && (
              <Stepper
                totalSteps={5}
                currentStep={validation.currentStep}
                stepTitles={[
                  "Étape 1 : La base",
                  "Étape 2 : Fruits & légumes",
                  "Étape 3 : Sauces & condiments",
                  "Étape 4 : Autres",
                  "Étape 5 : Préparateur",
                ]}
              />
            )}

            {!ui.showOrder &&
              !ui.showAverageResult &&
              !ui.showChefCard &&
              !ui.showBurnedSalmon &&
              !ui.showPlayerMachine &&
              !ui.showFinalPlate && (
                <>
                  <NavigationButtons
                    {...navigation}
                    hasOpenedOrder={hasOpenedOrder}
                    allValidated={validation.allValidated}
                  />
                  <DialogueDisplay
                    text={
                      !hasOpenedOrder && navigation.currentView === 2
                        ? "Bonjour, que puis-je pour vous ?"
                        : hasOpenedOrder && !selection.selectedBase
                        ? "Très précis comme demande..."
                        : validation.currentStep === 0
                        ? selection.selectedBase && basesData[selection.selectedBase]
                          ? basesData[selection.selectedBase].dialogue : null
                        : validation.currentStep === 1
                        ? selection.selectedFruit && fruitsData[selection.selectedFruit]
                          ? fruitsData[selection.selectedFruit].dialogue : null
                        : validation.currentStep === 2
                        ? selection.selectedSauce && saucesData[selection.selectedSauce]
                          ? saucesData[selection.selectedSauce].dialogue : null
                        : validation.currentStep === 3
                        ? selection.selectedAutre && autresData[selection.selectedAutre]
                          ? autresData[selection.selectedAutre].dialogue : null
                        : null
                    }
                  />
                </>
              )}
            {ui.showAverageResult && (
              <AverageResult
                onClose={() => ui.setShowAverageResult(false)}
                validatedBase={selection.selectedBase}
                validatedFruit={selection.selectedFruit}
                validatedSauce={selection.selectedSauce}
                validatedAutre={selection.selectedAutre}
                orderType={currentOrder}
              />
            )}

            {ui.showOrder && (
              <Order
                onClose={() => ui.setShowOrder(false)}
                orderType={currentOrder}
              />
            )}

            {ui.showBurnedSalmon && (
              <BurnedSalmonAlert
                onClose={() => {
                  ui.setShowBurnedSalmon(false);
                  navigation.setCurrentView(0);
                }}
              />
            )}

            {ui.showChefCard && (
              <ChefCard
                chefType={selection.selectedChef}
                onClose={() => ui.setShowChefCard(false)}
                onPrev={() =>
                  selection.selectedChef &&
                  selection.setSelectedChef(getPrevChef(selection.selectedChef))
                }
                onNext={() =>
                  selection.selectedChef &&
                  selection.setSelectedChef(getNextChef(selection.selectedChef))
                }
                onValidate={() => {
                  ui.setShowChefCard(false);
                  setValidatedChefModel(selection.selectedChef);
                  validation.setHasValidatedChef(true);
                  ui.setShowPlayerMachine(true);
                }}
              />
            )}

            {ui.showPlayerMachine && (
              <View style={styles.playerMachineOverlay}>
                <PlayerMachine
                  onVideoEnd={() => {
                    ui.setShowPlayerMachine(false);
                    ui.setShowFinalPlate(true);
                  }}
                />
              </View>
            )}

            {ui.showFinalPlate && (
              <View style={styles.playerMachineOverlay}>
                <FinalPlateView
                  onTimeout={() => {
                    ui.setShowFinalPlate(false);
                    playTicketSound();
                    navigation.setCurrentView(0);
                  }}
                />
              </View>
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
  playerMachineOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "#000",
  },
});
