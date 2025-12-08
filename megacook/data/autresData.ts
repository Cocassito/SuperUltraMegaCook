import { ImageSourcePropType } from "react-native";

export type AutreType = 'pistolet' | 'cuberose' | 'cone';

export interface AutreData {
  name: string;
  model: any;
  image: ImageSourcePropType;
  price: number;
  nutritional: {
    sweet: number;
    salty: number;
    acidity: number;
    protein: number;
    fat: number;
    bitter: number;
    spicy: number;
  };
}

const pistoletModel = require("../assets/models/pistolet.glb");
const cuberoseModel = require("../assets/models/cuberose.glb");
const coneModel = require("../assets/models/cone.glb");

const autresData: Record<AutreType, AutreData> = {
  pistolet: {
    name: 'Pistolet',
    model: pistoletModel,
    image: require('../assets/images/pistolet.webp'),
    price: 3,
    nutritional: { sweet: 2, salty: 1, acidity: 0, protein: 2, fat: 1, bitter: 0, spicy: 1 },
  },
  cuberose: {
    name: 'Cube Rose',
    model: cuberoseModel,
    image: require('../assets/images/cuberose.png'),
    price: 4,
    nutritional: { sweet: 4, salty: 0, acidity: 1, protein: 1, fat: 2, bitter: 1, spicy: 0 },
  },
  cone: {
    name: 'Cône',
    model: coneModel,
    image: require('../assets/images/cone.png'),
    price: 2,
    nutritional: { sweet: 3, salty: 1, acidity: 0, protein: 1, fat: 1, bitter: 0, spicy: 0 },
  },
};

export default autresData;
