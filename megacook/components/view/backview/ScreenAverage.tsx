import { Html } from "../../lib/drei/index";
import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import { StyleSheet, View, Text } from "react-native";
import GaugeSummary from "@/components/ui/GaugeSummary";
import { computeIngredientsAverage } from "@/utils/nutrition";

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
}: ScreenAverageProps) {
  const average = computeIngredientsAverage(
    validatedBase,
    validatedFruit,
    validatedSauce,
    validatedAutre,
  );

  if (!average) {
    return (
      <group position={[0, 5, 38]} rotation={[0, Math.PI, 0]}>
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
    <group position={[3, 7, 40]} rotation={[0, Math.PI, 0]}>
      <Html transform occlude position={[0, 0, 0.01]} style={htmlStyle}>
        <View style={styles.container}>
          <Text style={styles.title}>Moyenne de vos ingrédients</Text>
          <View style={styles.gaugeContainer}>
            <GaugeSummary nutritional={average} size={440} labelSize={30} />
          </View>
        </View>
      </Html>
    </group>
  );
}

const htmlStyle = {
  width: "1000px",
  height: "600px",
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
    fontSize: 54,
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
