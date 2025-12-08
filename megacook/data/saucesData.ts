import { ImageSourcePropType } from "react-native";

export type SauceType = 'broccoli' | 'monkey' | 'piment';

export interface SauceData {
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
const monkeyModel = require("../assets/models/monkey.glb");
const pimentModel = require("../assets/models/piment.glb");

const saucesData: Record<SauceType, SauceData> = {
  broccoli: {
    name: 'Broccoli',
    model: broccoliModel,
    image: require('../assets/images/broccoli.webp'),
    price: 2,
    nutritional: { sweet: 1, salty: 4, fat: 1, bitter: 3, acidity: 0, spicy: 1, protein: 4 },
  },
  monkey: {
      name: 'Monkey',
      model: monkeyModel,
      image: require('../assets/images/singe.png'),
      price: 3,
      nutritional: { sweet: 1, salty: 2, fat: 4, bitter: 2, acidity: 1, spicy: 3, protein: 1 },
  },
  piment: {
    name: 'Piment',
    model: pimentModel,
    image: require('../assets/images/piment.png'),
    price: 5,
    nutritional: { sweet: 4, salty: 1, fat: 1, bitter: 5, acidity: 2, spicy: 3, protein: 4 },
  },
};

export default saucesData;
