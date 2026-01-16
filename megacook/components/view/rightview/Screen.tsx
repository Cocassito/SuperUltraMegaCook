import { Html } from "../../lib/drei/index";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Checkbox } from "expo-checkbox";
import { useConfirmButtonSound } from "@/hooks/useButtonSound";
import PixelButton from "@/components/ui/button/PixelButtonComponent";

import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import chefsData from "@/data/chefsData";

import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import { ChefType } from "@/data/chefsData";

import GaugeSummary from "@/components/ui/GaugeSummary";

type ScreenProps = {
  selectedBase: BaseType | null;
  selectedFruit: FruitType | null;
  selectedSauce: SauceType | null;
  selectedAutre: AutreType | null;
  selectedChef: ChefType | null;
  hasValidatedBase: boolean;
  hasValidatedFruit: boolean;
  hasValidatedSauce: boolean;
  hasValidatedAutre: boolean;
  hasValidatedChef?: boolean;
  allValidated?: boolean;
  isBottomRightView?: boolean;
  currentView?: number;
  onValidate?: () => void;
  onScreenClick?: () => void;
  onRestart?: () => void;
  onCuireChange?: (isCuire: boolean) => void;
};

export default function Screen({
  selectedBase,
  selectedFruit,
  selectedSauce,
  selectedAutre,
  selectedChef,
  hasValidatedBase,
  hasValidatedFruit,
  hasValidatedSauce,
  hasValidatedAutre,
  hasValidatedChef = false,
  allValidated = false,
  isBottomRightView = false,
  currentView = 0,
  onValidate,
  onScreenClick,
  onRestart,
  onCuireChange,
}: ScreenProps) {
  const [isCuire, setIsCuire] = useState(false);
  const playConfirmSound = useConfirmButtonSound();

  // Déterminer quelle phase nous sommes
  const isBasePhase = !hasValidatedBase;
  const isFruitPhase = hasValidatedBase && !hasValidatedFruit;
  const isSaucePhase =
    hasValidatedBase && hasValidatedFruit && !hasValidatedSauce;
  const isAutrePhase =
    hasValidatedBase &&
    hasValidatedFruit &&
    hasValidatedSauce &&
    !hasValidatedAutre;
  const isChefPhase =
    hasValidatedBase &&
    hasValidatedFruit &&
    hasValidatedSauce &&
    hasValidatedAutre &&
    !hasValidatedChef;

  // Réinitialiser isCuire quand on change de phase
  useEffect(() => {
    setIsCuire(false);
  }, [isBasePhase, isFruitPhase, isSaucePhase, isAutrePhase, isChefPhase]);

  const handleCuireChange = (value: boolean) => {
    setIsCuire(value);
    onCuireChange?.(value);
  };

  const selectedItem = isBasePhase
    ? selectedBase
    : isFruitPhase
    ? selectedFruit
    : isSaucePhase
    ? selectedSauce
    : isAutrePhase
    ? selectedAutre
    : isChefPhase
    ? selectedChef
    : null;
  const data = isBasePhase
    ? selectedBase
      ? basesData[selectedBase]
      : null
    : isFruitPhase
    ? selectedFruit
      ? fruitsData[selectedFruit]
      : null
    : isSaucePhase
    ? selectedSauce
      ? saucesData[selectedSauce]
      : null
    : isAutrePhase
    ? selectedAutre
      ? autresData[selectedAutre]
      : null
    : isChefPhase
    ? selectedChef
      ? chefsData[selectedChef]
      : null
    : null;

  return (
    <>
      <group
        position={[18, 3, 2]}
        rotation={[-Math.PI / 8, -Math.PI / 7, -Math.PI / 20]}
      >
        <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
          {allValidated && currentView === 0 ? (
            <View style={styles.container}>
              <View style={styles.finishedWrapper}>
                <Text style={styles.finishedText}>MEGACOOK</Text>
                <View style={styles.restartButtonWrapper}>
                  <PixelButton
                    title="Restart"
                    colorPrimary="#C8A2DA"
                    colorSecondary="#773B94"
                    colorBorder="#55256D"
                    colorInnerShadow="#E9DAF0"
                    onPress={onRestart}
                  />
                </View>
              </View>
            </View>
          ) : isChefPhase && !selectedItem ? (
            <View style={styles.container} onTouchStart={onScreenClick}>
              <View style={styles.chefPhaseWrapper}>
                <Text style={styles.finishedText}>MEGACOOK</Text>
                <Text style={styles.selectChefText}>Sélectionne un chef</Text>
              </View>
            </View>
          ) : !selectedItem ? (
            <View style={styles.container} onTouchStart={onScreenClick}>
              <Text style={styles.title}>Megacook</Text>
              <Text style={styles.subtitle}>
                {isBasePhase
                  ? "Sélectionne une base"
                  : isFruitPhase
                  ? "Sélectionne un fruit"
                  : isSaucePhase
                  ? "Sélectionne une sauce"
                  : isAutrePhase
                  ? "Sélectionne un autre"
                  : "Sélectionne un chef"}
              </Text>
            </View>
          ) : (
            data && (
              <View style={styles.container} onTouchStart={onScreenClick}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.subtitle}>Détails des goûts</Text>
                    <View style={styles.gaugeWrapper}>
                      <GaugeSummary
                        nutritional={
                          isSaucePhase
                            ? {
                                sweet: 0,
                                salty: 0,
                                acidity: 0,
                                bitter: 0,
                                spicy: 0,
                                protein: 0,
                                fat: 0,
                              }
                            : data?.nutritional || {
                                sweet: 0,
                                salty: 0,
                                acidity: 0,
                                bitter: 0,
                                spicy: 0,
                                protein: 0,
                                fat: 0,
                              }
                        }
                        labelSize={9} 
                      />
                      {isSaucePhase && (
                        <View style={styles.questionMarkOverlay}>
                          <Text style={styles.questionMark}>???</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.rightSection}>
                    <Image
                      source={data.image}
                      alt={data.name}
                      style={styles.image}
                    />
                    {!isSaucePhase && !isChefPhase && (
                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          style={styles.checkbox}
                          color={isCuire ? "#55256D" : undefined}
                          value={isCuire}
                          onValueChange={handleCuireChange}
                        />
                        <Text style={styles.text}>Cuire</Text>
                      </View>
                    )}
                    <View style={styles.validateButtonWrapper}>
                      <PixelButton
                        title={isChefPhase ? "Terminer" : "Valider"}
                        colorPrimary="#C8A2DA"
                        colorSecondary="#773B94"
                        colorBorder="#55256D"
                        colorInnerShadow="#E9DAF0"
                        onPress={() => {
                          playConfirmSound();
                          onValidate?.();
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )
          )}
        </Html>
      </group>
    </>
  );
}

const htmlStyle = {
  width: "300px",
  height: "225px",
  pointerEvents: "auto",
  border: "10px solid #000",
} as const;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF2DD",
    color: "#000000",
  },
  finishedWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  finishedText: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownboldm",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownboldxl",
    textTransform: "uppercase",
  },
  description: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownbolds",
    marginBottom: 5,
  },
  gauges: {
    flexDirection: "column",
    gap: 8,
  },
  rightSection: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    marginLeft: 8,
    fontFamily: "pixelgridtrial-linedownboldm",
  },
  checkbox: {
    marginVertical: 8,
  },
  gaugeWrapper: {
    position: "relative",
    width: 180,
    height: 180,
  },
  questionMarkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 242, 221, 0.5)",
    borderRadius: 90,
  },
  questionMark: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#55256D",
  },
  restartButtonWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
  validateButtonWrapper: {
    marginTop: 6,
    alignItems: "center",
    transform: [{ scale: 0.5 }],
  },
  chefPhaseWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  megacookText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownboldxl",
    textTransform: "uppercase",
    color: "#000000",
  },
  selectChefText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "pixelgridtrial-linedownbolds",
    color: "#000000",
  },
});
