import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

import basesData, { BaseType } from '@/data/basesData';

type DOMComponentProps = {
  selectedBase: BaseType | null;
};

export default function DOMComponent({ selectedBase }: DOMComponentProps) {
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
      <Text style={styles.title}>{baseData.name}</Text>
      <Text style={styles.description}>{baseData.description}</Text> 
      
      <Text style={styles.subtitle}>Détails des goûts</Text>
  
      <View style={styles.content}>
        <View style={styles.nutritionalInfo}>
          <View style={styles.gauges}>
            <Gauge label="Sucré" value={baseData.nutritional.sweet} />
            <Gauge label="Salé" value={baseData.nutritional.salty} />
            <Gauge label="Gras" value={baseData.nutritional.fat} />
            <Gauge label="Amer" value={baseData.nutritional.bitter} />
            <Gauge label="Acide" value={baseData.nutritional.acidity} />
            <Gauge label="Épicé" value={baseData.nutritional.spicy} />
            <Gauge label="Protéiné" value={baseData.nutritional.protein} />
          </View>
        </View>

        <Image
          source={baseData.image} 
          alt={baseData.name}
          style={styles.image}
        />
      </View>
    </View>
  );
}

function Gauge({ label, value }: { label: string; value: number }) {
  const maxValue = 5;
  const percentage = (value / maxValue) * 100;
  
  return (
    <View style={gaugeStyles.container}>
      <Text style={gaugeStyles.label}>{label}</Text>
      <View style={gaugeStyles.barContainer}>
        <View style={{...gaugeStyles.bar, width: `${percentage}%`}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#FFF2DD',
    color: '#000000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    gap: 20,
  },
  nutritionalInfo: {
    flex: 1,
  },
  gauges: {
    flexDirection: 'column',
    gap: 8,
  },
  image: {
    width: 130,
    height: 130,
  },
});

const gaugeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    width: 50,
    color: '#000000',
  },
  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#ffffffff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: 10,
    backgroundColor: '#773B74',
  },
});
