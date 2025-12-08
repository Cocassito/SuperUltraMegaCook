import { Html } from "../../lib/drei/index";
import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { Checkbox } from "expo-checkbox";
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
  onValidate?: () => void;
};


export default function Screen({ selectedBase, selectedFruit, selectedSauce, selectedAutre, hasValidatedBase, hasValidatedFruit, hasValidatedSauce, onValidate }: ScreenProps) {
  const [isCuire, setIsCuire] = useState(false);
  
  // Déterminer quelle phase nous sommes
  const isBasePhase = !hasValidatedBase;
  const isFruitPhase = hasValidatedBase && !hasValidatedFruit;
  const isSaucePhase = hasValidatedBase && hasValidatedFruit && !hasValidatedSauce;
  const isAutrePhase = hasValidatedBase && hasValidatedFruit && hasValidatedSauce;
  
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
      <group position={[10, 3, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
          
          {!selectedItem ? (
            <View style={styles.container}>
              <Text style={styles.title}>Megacook</Text>
              <Text style={styles.subtitle}>{isBasePhase ? "Sélectionne une base" : isFruitPhase ? "Sélectionne un fruit" : isSaucePhase ? "Sélectionne une sauce" : "Sélectionne un autre"}</Text>
            </View>
          ) : (
            data && (
              <View style={styles.container}>
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
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        style={styles.checkbox}
                        color={isCuire ? "#55256D" : undefined}
                        value={isCuire}
                        onValueChange={setIsCuire}
                      />
                      <Text style={{ marginLeft: 8 }}>Cuire</Text>
                    </View>
                    <TouchableOpacity onPress={onValidate}>
                      <Text>Valider</Text>
                    </TouchableOpacity>
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
  width: "400px",
  height: "300px",
  pointerEvents: "auto",
  border: "10px solid #000",
} as const;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: "#FFF2DD",
    color: "#000000",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    width: 130,
    height: 130,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  checkbox: {
    marginVertical: 8,
  },
});