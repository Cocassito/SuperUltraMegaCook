import { ImageSourcePropType } from "react-native";

export type BaseType = 'paille' | 'pistolet' | 'monkey';

export interface BaseData {
  name: string;
  model: any;
  image: ImageSourcePropType;
  description: string;
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

const pailleModel = require("../assets/models/paille.glb");
const pistoletModel = require("../assets/models/pistolet.glb");
const monkeyModel = require("../assets/models/monkey.glb");

const basesData: Record<BaseType, BaseData> = {
  paille: {
    name: 'Paille',
    model: pailleModel,
    image: require('../assets/images/cuberose.png'),
    description: "Paille croustillante pour une touche aérienne",
    price: 2,
    nutritional: { sweet: 1, salty: 2, fat: 1, bitter: 3, acidity: 0, spicy: 3, protein: 1 },
},
pistolet: {
    name: 'Pistolet',
    model: pistoletModel,
    image: require('../assets/images/capsule.png'),
    description: "Pistolet farceur, touche surprenante",
    price: 3,
    nutritional: { sweet: 4, salty: 2, fat: 3, bitter: 2, acidity: 4, spicy: 3, protein: 1 },
},
monkey: {
    name: 'Monkey',
    model: monkeyModel,
    image: require('../assets/images/champi.png'),
    description: "Singe espiègle pour une touche ludique",
    price: 5,
    nutritional: { sweet: 2, salty: 1, fat: 5, bitter: 1, acidity: 2, spicy: 3, protein: 4 },
  },
};

export default basesData;
