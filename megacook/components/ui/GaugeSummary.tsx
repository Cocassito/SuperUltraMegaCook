import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadarChart } from '@salmonco/react-native-radar-chart';

export type Nutritional = {
  sweet: number;
  salty: number;
  acidity: number;
  bitter: number;
  spicy: number;
  protein: number;
  fat: number;
};

interface GaugeSummaryProps {
  nutritional: Nutritional;
}

export default function GaugeSummary({ nutritional }: GaugeSummaryProps) {
  const data = [
    { label: 'Sucré', value: nutritional.sweet },
    { label: 'Salé', value: nutritional.salty },
    { label: 'Acide', value: nutritional.acidity },
    { label: 'Épicé', value: nutritional.spicy },
    { label: 'Protéines', value: nutritional.protein },
    { label: 'Amer', value: nutritional.bitter },
    { label: 'Gras', value: nutritional.fat },
  ];

  return (
    <View style={styles.container}>
      <RadarChart
        data={data}
        maxValue={5}
        fillColor="#55256D"
        fillOpacity={0.35}
        labelColor="#333"
        labelSize={11}
        labelDistance={1.2}
        labelFontFamily=''
        dataFillColor="#FFF2DD"
        dataFillOpacity={0.6}
        size={180}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowOpacity: 0.2,
  },
});
