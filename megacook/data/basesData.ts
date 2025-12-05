import { ImageSourcePropType } from "react-native";

export type BaseType = 'broccoli' | 'pomme' | 'piment';

export interface BaseData {
  name: string;
  model: any;
  image: ImageSourcePropType;
  price: number;
  nutritional: {
    sweet: number;
    salty: number;
    fat: number;
    bitter: number;
    acidity: number;
    spicy: number;
    protein: number;
  };
}

const broccoliModel = require("../assets/models/broccoli.glb");
const pommeModel = require("../assets/models/pomme.glb");
const pimentModel = require("../assets/models/piment.glb");

const basesData: Record<BaseType, BaseData> = {
  broccoli: {
    name: 'Broccoli',
    model: broccoliModel,
    image: require('../assets/images/broccoli.webp'),
    price: 2,
    nutritional: { sweet: 1, salty: 2, fat: 1, bitter: 3, acidity: 0, spicy: 3, protein: 1 },
},
pomme: {
    name: 'Pomme',
    model: pommeModel,
    image: require('../assets/images/pomme.png'),
    price: 3,
    nutritional: { sweet: 4, salty: 2, fat: 3, bitter: 2, acidity: 4, spicy: 3, protein: 1 },
},
piment: {
    name: 'Piment',
    model: pimentModel,
    image: require('../assets/images/piment.png'),
    price: 5,
    nutritional: { sweet: 2, salty: 1, fat: 5, bitter: 1, acidity: 2, spicy: 3, protein: 4 },
  },
};

export default basesData;
