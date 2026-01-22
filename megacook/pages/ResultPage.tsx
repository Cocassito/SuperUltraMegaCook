import React from "react";
import { View, Text, StyleSheet } from "react-native";
import chefsData, { ChefType } from "../data/chefsData";
import modelsData, { ModelType } from "../data/modelsData";
import basesData, { BaseType } from "../data/basesData";
import autresData, { AutreType } from "../data/autresData";

interface ResultPageProps {
  selectedChefs: ChefType[];
  selectedModel: ModelType | null;
  selectedBase: BaseType | null;
  selectedAutre: AutreType | null;
  onBack: () => void;
}

export default function ResultPage({
  selectedChefs,
  selectedModel,
  selectedBase,
  selectedAutre,
  onBack,
}: ResultPageProps) {
  if (selectedChefs.length === 0) return null;

  // Récupère toutes les données nutritionnelles sélectionnées
  const allNutritional = [];
  const allPrices = [];

  // Chef
  selectedChefs.forEach((key) => {
    const chef = chefsData[key];
    allNutritional.push(chef.nutritional);
    allPrices.push(chef.price);
  });

  // Aliment
  if (selectedModel) {
    allNutritional.push(modelsData[selectedModel].nutritional);
    allPrices.push(modelsData[selectedModel].price);
  }

  // Base
  if (selectedBase) {
    allNutritional.push(basesData[selectedBase].nutritional);
    allPrices.push(basesData[selectedBase].price);
  }

  // Autre
  if (selectedAutre) {
    allNutritional.push(autresData[selectedAutre].nutritional);
    allPrices.push(autresData[selectedAutre].price);
  }

  const count = allNutritional.length;
  const avg = {
    sweet: allNutritional.reduce((sum, item) => sum + item.sweet, 0) / count,
    salty: allNutritional.reduce((sum, item) => sum + item.salty, 0) / count,
    acidity:
      allNutritional.reduce((sum, item) => sum + item.acidity, 0) / count,
    protein:
      allNutritional.reduce((sum, item) => sum + item.protein, 0) / count,
    fat: allNutritional.reduce((sum, item) => sum + item.fat, 0) / count,
    price: allPrices.reduce((sum, item) => sum + item, 0) / allPrices.length,
  };

  return (
    <View style={styles.background}>
      <View style={styles.receiptCard}>
        <Text style={styles.title}>Résultats</Text>

        <Text style={styles.subtitle}>Goûts :</Text>
        <View style={styles.gauges}>
          <Text style={styles.gaugeText}>Sucré : {avg.sweet.toFixed(2)}/5</Text>
          <Text style={styles.gaugeText}>Salé : {avg.salty.toFixed(2)}/5</Text>
          <Text style={styles.gaugeText}>
            Acidité : {avg.acidity.toFixed(2)}/5
          </Text>
          <Text style={styles.gaugeText}>
            Protéine : {avg.protein.toFixed(2)}/5
          </Text>
          <Text style={styles.gaugeText}>Gras : {avg.fat.toFixed(2)}/5</Text>
        </View>

        <Text style={styles.price}>Prix moyen : ${avg.price.toFixed(2)}</Text>

        <Text style={styles.selected}>
          Chef : {selectedChefs.map((key) => chefsData[key].name).join(", ")}
        </Text>

        <Text style={styles.backButton} onPress={onBack}>
          Suivant
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  receiptCard: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#260100",
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: 1,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: "#260100",
    borderBottomColor: "#260100",
    paddingVertical: 14,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#260100",
    marginBottom: 8,
  },
  gauges: {
    marginBottom: 16,
  },
  gaugeText: {
    fontSize: 16,
    marginVertical: 3,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  selected: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
  },
  backButton: {
    marginTop: 24,
    backgroundColor: "#C8A2DA",
    color: "#55256D",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 16,
    overflow: "hidden",
    textAlign: "center",
  },
});
