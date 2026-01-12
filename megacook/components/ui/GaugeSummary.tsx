import React from 'react';
import { View, Text } from 'react-native';
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
  size?: number;
  labelSize?: number;
}

export default function GaugeSummary({ nutritional, size = 180, labelSize = 9 }: GaugeSummaryProps) {
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
    <View>
      <RadarChart
        data={data}
        maxValue={5}
        fillColor="#55256D"
        fillOpacity={0.35}
        labelColor="#333"
        labelSize={labelSize}
        labelDistance={1.23}
        labelFontFamily='pixelgridtrial-linedownboldm'
        dataFillColor="#FFF2DD"
        dataFillOpacity={0.6}
        size={size}
      />
    </View>
  );
}
