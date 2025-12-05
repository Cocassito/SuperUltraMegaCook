import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { useState } from "react";
import { Checkbox } from "expo-checkbox";

import basesData, { BaseType } from "@/data/basesData";
import GaugeSummary from "@/components/ui/GaugeSummary";

type DOMComponentProps = {
  selectedBase: BaseType | null;
  onValidate?: () => void;
};

export default function ScreenContent({
  selectedBase,
  onValidate,
}: DOMComponentProps) {
  const [isCuire, setIsCuire] = useState(false);
  if (!selectedBase) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Megacook</Text>
      </View>
    );
  }

  const baseData = basesData[selectedBase];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{baseData.name}</Text>
          <Text style={styles.subtitle}>Détails des goûts</Text>
          <View>
            <GaugeSummary nutritional={baseData.nutritional} />
          </View>
        </View>
        <View style={styles.rightSection}>
          <Image
            source={baseData.image}
            alt={baseData.name}
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
  );
}

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
