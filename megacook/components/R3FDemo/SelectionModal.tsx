import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export interface SelectionItem {
  key: string;
  name: string;
  image: any;
  description: string;
  price: number;
}

interface SelectionModalProps {
  visible: boolean;
  title: string;
  items: SelectionItem[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onValidate: () => void;
  onClose?: () => void;
}

export default function SelectionModal({ visible, title, items, selectedKey, onSelect, onValidate }: SelectionModalProps) {
  if (!visible) return null;
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <ScrollView contentContainerStyle={styles.cardsFlexContainer}>
          {items.map((it) => (
            <View
              key={it.key}
              style={[styles.card, selectedKey === it.key && styles.cardActive]}
              onTouchEnd={() => onSelect(it.key)}
            >
              <View style={styles.cardTopRow}>
                <Image source={it.image} style={styles.cardImage} resizeMode="contain" />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{it.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Prix : </Text>
                    {[1,2,3,4,5].map((star) => (
                      <Text key={star} style={styles.star}>{star <= it.price ? '★' : '☆'}</Text>
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.cardDescription}>{it.description}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.validateButton} onPress={onValidate}>Valider</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: '#C8A2DA', 
    borderColor: '#55256D',
    borderWidth: 5, 
    borderRadius: 20,
    padding: 24, 
    width: '90%', 
    maxWidth: 400, 
    alignItems: 'center', 
    elevation: 10,
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    color: '#333' 
  },
  cardsFlexContainer: { 
    gap: 12, 
    width: '100%' 
  },
  card: {
    backgroundColor: '#F8F0DD', 
    borderColor: '#A47747', 
    borderRadius: 16, 
    padding: 12,
    borderWidth: 2, 
  },
  cardActive: { 
    borderColor: '#533401', 
    backgroundColor: '#FFD084'
  },
  cardTopRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  cardInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 4, 
    color: '#000' 
  },
  cardImage: { 
    width: 50, 
    height: 50 
  },
  cardDescription: { 
    fontSize: 12, 
    color: '#666',
    marginBottom: 8, 
    textAlign: 'left' 
  },
  priceContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  priceLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#333', 
    marginRight: 4 
  },
  star: { 
    fontSize: 20, 
    color: '#FFD700', 
    marginRight: 2 
  },
  validateButton: {
    marginTop: 16,
    backgroundColor: '#FFD084', 
    color: '#A46602', 
    borderColor: '#533401', 
    borderWidth: 3,
    paddingVertical: 12, 
    paddingHorizontal: 32, 
    borderRadius: 8, 
    fontWeight: 'bold', 
    fontSize: 18, 
    textAlign: 'center'
  },
});
