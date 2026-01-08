import { ImageSourcePropType } from "react-native";

export type FruitType = "broccoli" | "pomme" | "tomate";

export interface FruitData {
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

const broccoliModel = require("../assets/models/ingredients/broccoli.glb");
const pommeModel = require("../assets/models/ingredients/pomme.glb");
const tomateModel = require("../assets/models/ingredients/tomate.glb");

const fruitsData: Record<FruitType, FruitData> = {
  broccoli: {
    name: "Broccoli",
    model: broccoliModel,
    image: require("../assets/images/ingredients/broccoli.png"),
    price: 4,
    nutritional: {
      sweet: 3,
      salty: 1,
      fat: 5,
      bitter: 2,
      acidity: 1,
      spicy: 5,
      protein: 3,
    },
  },
  pomme: {
    name: "Pomme",
    model: pommeModel,
    image: require("../assets/images/ingredients/pomme.png"),
    price: 1,
    nutritional: {
      sweet: 2,
      salty: 5,
      fat: 1,
      bitter: 4,
      acidity: 5,
      spicy: 1,
      protein: 3,
    },
  },
  tomate: {
    name: "Tomate",
    model: tomateModel,
    image: require("../assets/images/ingredients/tomate.png"),
    price: 5,
    nutritional: {
      sweet: 1,
      salty: 1,
      fat: 5,
      bitter: 2,
      acidity: 3,
      spicy: 5,
      protein: 4,
    },
  },
};

export default fruitsData;
