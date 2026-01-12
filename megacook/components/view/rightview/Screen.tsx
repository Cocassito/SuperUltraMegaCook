import { Html } from "../../lib/drei/index";
import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Checkbox } from "expo-checkbox";
import { useConfirmButtonSound } from "@/hooks/useButtonSound";
import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import GaugeSummary from "@/components/ui/GaugeSummary";


type ScreenProps = {
  selectedBase: BaseType | null;
  selectedFruit: FruitType | null;
  selectedSauce: SauceType | null;
  selectedAutre: AutreType | null;
  hasValidatedBase: boolean;
  hasValidatedFruit: boolean;
  hasValidatedSauce: boolean;
  allValidated?: boolean;
  isBottomRightView?: boolean;
  onValidate?: () => void;
  onScreenClick?: () => void;
  onCuireChange?: (isCuire: boolean) => void;
};


export default function Screen({ selectedBase, selectedFruit, selectedSauce, selectedAutre, hasValidatedBase, hasValidatedFruit, hasValidatedSauce, allValidated = false, isBottomRightView = false, onValidate, onScreenClick, onCuireChange }: ScreenProps) {
  const [isCuire, setIsCuire] = useState(false);
  const playConfirmSound = useConfirmButtonSound();
  
  // Déterminer quelle phase nous sommes
  const isBasePhase = !hasValidatedBase;
  const isFruitPhase = hasValidatedBase && !hasValidatedFruit;
  const isSaucePhase = hasValidatedBase && hasValidatedFruit && !hasValidatedSauce;
  const isAutrePhase = hasValidatedBase && hasValidatedFruit && hasValidatedSauce;

  // Réinitialiser isCuire quand on change de phase
  useEffect(() => {
    setIsCuire(false);
  }, [isBasePhase, isFruitPhase, isSaucePhase, isAutrePhase]);
  
  const handleCuireChange = (value: boolean) => {
    setIsCuire(value);
    onCuireChange?.(value);
  };
  
  const selectedItem = isBasePhase ? selectedBase : isFruitPhase ? selectedFruit : isSaucePhase ? selectedSauce : selectedAutre;
  const data = isBasePhase 
    ? (selectedBase ? basesData[selectedBase] : null)
    : isFruitPhase
    ? (selectedFruit ? fruitsData[selectedFruit] : null)
    : isSaucePhase
    ? (selectedSauce ? saucesData[selectedSauce] : null)
    : (selectedAutre ? autresData[selectedAutre] : null);
  
  return (
    <>
      <group position={[18, 3, 2]} rotation={[-Math.PI / 8, -Math.PI / 7, -Math.PI / 20]}>
        <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
          {allValidated ? (
            <View style={styles.container} onTouchStart={onScreenClick}>
              <View style={styles.finishedWrapper}>
                <Text style={styles.finishedText}>MEGACOOK</Text>
              </View>
            </View>
          ) : !selectedItem ? (
            <View style={styles.container} onTouchStart={onScreenClick}>
              <Text style={styles.title}>Megacook</Text>
              <Text style={styles.subtitle}>{isBasePhase ? "Sélectionne une base" : isFruitPhase ? "Sélectionne un fruit" : isSaucePhase ? "Sélectionne une sauce" : "Sélectionne un autre"}</Text>
            </View>
          ) : (
            data && (
              <View style={styles.container} onTouchStart={onScreenClick}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.title}>{data.name}</Text>
                    <Text style={styles.subtitle}>Détails des goûts</Text>
                    <View>
                      <GaugeSummary nutritional={data.nutritional} />
                    </View>
                  </View>
                  <View style={styles.rightSection}>
                    <Image
                      source={data.image}
                      alt={data.name}
                      style={styles.image}
                    />
                    {!isSaucePhase && (
                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          style={styles.checkbox}
                          color={isCuire ? "#55256D" : undefined}
                          value={isCuire}
                          onValueChange={handleCuireChange}
                        />
                        <Text style={{ marginLeft: 8 }}>Cuire</Text>
                      </View>
                    )}
                    {/* {isBottomRightView && ( */}
                      <TouchableOpacity onPress={() => {
                        playConfirmSound();
                        onValidate?.();
                      }}>
                        <Text>{isAutrePhase ? "Terminer" : "Valider"}</Text>
                      </TouchableOpacity>
                    {/* )} */}
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
  },
  description: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
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
  checkbox: {
    marginVertical: 8,
  },
});