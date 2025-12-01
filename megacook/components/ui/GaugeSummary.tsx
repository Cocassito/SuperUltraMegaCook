import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadarChart } from '@salmonco/react-native-radar-chart';

export type Nutritional = {
  sweet: number;
  salty: number;
  acidity: number;
  protein: number;
  fat: number;
};

interface GaugeSummaryProps {
  title?: string;
  nutritional: Nutritional;
}

export default function GaugeSummary({ title = 'Récapitulatif', nutritional }: GaugeSummaryProps) {
  const data = [
    { label: 'Sucré', value: nutritional.sweet },
    { label: 'Salé', value: nutritional.salty },
    { label: 'Acidité', value: nutritional.acidity },
    { label: 'Protéines', value: nutritional.protein },
    { label: 'Gras', value: nutritional.fat },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RadarChart
        data={data}
        maxValue={5}
        fillColor="#55256D"
        fillOpacity={0.35}
        labelColor="#333"
        labelSize={11}
        dataFillColor="#FFF2DD"
        dataFillOpacity={0.6}
        dataStrokeWidth={2}
        size={220}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF2DD',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },  
});
