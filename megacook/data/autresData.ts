import { ImageSourcePropType } from "react-native";

export type AutreType = "chocolat" | "poulet" | "saumon";

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

const chocolatModel = require("../assets/models/ingredients/chocolat.glb");
const pouletModel = require("../assets/models/ingredients/poulet.glb");
const saumonModel = require("../assets/models/ingredients/saumon.glb");

const autresData: Record<AutreType, AutreData> = {
  chocolat: {
    name: "Chocolat",
    model: chocolatModel,
    image: require("../assets/images/test/pistolet.webp"),
    price: 3,
    nutritional: {
      sweet: 2,
      salty: 1,
      acidity: 0,
      protein: 2,
      fat: 1,
      bitter: 0,
      spicy: 1,
    },
  },
  poulet: {
    name: "Poulet",
    model: pouletModel,
    image: require("../assets/images/test/poulet.png"),
    price: 4,
    nutritional: {
      sweet: 4,
      salty: 0,
      acidity: 1,
      protein: 1,
      fat: 2,
      bitter: 1,
      spicy: 0,
    },
  },
  saumon: {
    name: "Saumon",
    model: saumonModel,
    image: require("../assets/images/test/cone.png"),
    price: 2,
    nutritional: {
      sweet: 3,
      salty: 1,
      acidity: 0,
      protein: 1,
      fat: 1,
      bitter: 0,
      spicy: 0,
    },
  },
};

export default autresData;
