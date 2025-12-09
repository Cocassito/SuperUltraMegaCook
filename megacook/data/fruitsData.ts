import { ImageSourcePropType } from "react-native";

export type FruitType = "poulet" | "champignon" | "dinosaure";

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

const pouletModel = require("../assets/models/ingredients/poulet.glb");
const champignonModel = require("../assets/models/ingredients/champignon.glb");
const dinosaureModel = require("../assets/models/dinosaure.glb");

const fruitsData: Record<FruitType, FruitData> = {
  poulet: {
    name: "Poulet",
    model: pouletModel,
    image: require("../assets/images/test/poulet.png"),
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
  champignon: {
    name: "Champignon",
    model: champignonModel,
    image: require("../assets/images/test/champignon.png"),
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
  dinosaure: {
    name: "Dinosaure",
    model: dinosaureModel,
    image: require("../assets/images/test/dinosaure.png"),
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
