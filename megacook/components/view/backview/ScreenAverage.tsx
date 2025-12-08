import { Html } from "../../lib/drei/index";
import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import { StyleSheet, View, Text } from "react-native";
import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import GaugeSummary from "@/components/ui/GaugeSummary";

type ScreenAverageProps = {
  validatedBase: BaseType | null;
  validatedFruit: FruitType | null;
  validatedSauce: SauceType | null;
  validatedAutre: AutreType | null;
  hasValidatedBase: boolean;
  hasValidatedFruit: boolean;
  hasValidatedSauce: boolean;
};

export default function ScreenAverage({
  validatedBase,
  validatedFruit,
  validatedSauce,
  validatedAutre,
  hasValidatedBase,
  hasValidatedFruit,
  hasValidatedSauce,
}: ScreenAverageProps) {
  // Collecter les données nutritionnelles de tous les ingrédients sélectionnés
  const nutritionalArray: Array<{
    sweet: number;
    salty: number;
    fat: number;
    bitter: number;
    acidity: number;
    spicy: number;
    protein: number;
  }> = [];

  if (validatedBase) {
    nutritionalArray.push(basesData[validatedBase].nutritional);
  }
  if (validatedFruit) {
    nutritionalArray.push(fruitsData[validatedFruit].nutritional);
  }
  if (validatedSauce) {
    nutritionalArray.push(saucesData[validatedSauce].nutritional);
  }
  if (validatedAutre) {
    nutritionalArray.push(autresData[validatedAutre].nutritional);
  }

  // Calculer la moyenne
  const calculateAverage = () => {
    if (nutritionalArray.length === 0) {
      return null;
    }

    const keys = ["sweet", "salty", "fat", "bitter", "acidity", "spicy", "protein"] as const;
    const average: Record<string, number> = {};

    keys.forEach((key) => {
      const sum = nutritionalArray.reduce((acc, item) => acc + (item[key] || 0), 0);
      average[key] = sum / nutritionalArray.length;
    });

    return average as any;
  };

  const average = calculateAverage();

  if (!average) {
    return (
      <group position={[0, 5, 24]} rotation={[0, Math.PI, 0]}>
        <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
          <View style={styles.container}>
            <Text style={styles.title}>Résumé du Plat</Text>
            <Text style={styles.subtitle}>Sélectionne les ingrédients pour voir les statistiques</Text>
          </View>
        </Html>
      </group>
    );
  }

  return (
    <group position={[0, 5, 24]} rotation={[0, Math.PI, 0]}>
      <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
        <View style={styles.container}>
          <Text style={styles.title}>Moyenne de vos ingrédients</Text>
          <View style={styles.gaugeContainer}>
            <GaugeSummary nutritional={average} />
          </View>
        </View>
      </Html>
    </group>
  );
}

const htmlStyle = {
  width: "450px",
  height: "350px",
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
    paddingHorizontal: 20,
    backgroundColor: "#FFF2DD",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  gaugeContainer: {
    marginVertical: 15,
  },
  ingredientsContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    width: "100%",
  },
  ingredientsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 11,
    color: "#333",
    marginBottom: 4,
  },
});
