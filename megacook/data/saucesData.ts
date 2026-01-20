import { ImageSourcePropType } from "react-native";

export type SauceType = "citron" | "confiture" | "sauce";

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
  dialogue: string;
}

const citronModel = require("../assets/models/ingredients/citron.glb");
const confitureModel = require("../assets/models/ingredients/confiture.glb");
const sauceModel = require("../assets/models/ingredients/sauce.glb");

const saucesData: Record<SauceType, SauceData> = {
  citron: {
    name: "Citron",
    model: citronModel,
    image: require("../assets/images/ingredients/citron.png"),
    price: 2,
    nutritional: {
      sweet: 1,
      salty: 4,
      fat: 1,
      bitter: 3,
      acidity: 0,
      spicy: 1,
      protein: 4,
    },
    dialogue: "C\'est un mal pour un bien, je suppose.",
  },
  confiture: {
    name: "Confiture",
    model: confitureModel,
    image: require("../assets/images/ingredients/confiture.png"),
    price: 3,
    nutritional: {
      sweet: 1,
      salty: 2,
      fat: 4,
      bitter: 2,
      acidity: 1,
      spicy: 3,
      protein: 1,
    },
    dialogue: "Celle que me préparait grand-mère, *snif*.",
  },
  sauce: {
    name: "Sauce",
    model: sauceModel,
    image: require("../assets/images/ingredients/sauce.png"),
    price: 5,
    nutritional: {
      sweet: 4,
      salty: 1,
      fat: 1,
      bitter: 5,
      acidity: 2,
      spicy: 3,
      protein: 4,
    },
    dialogue: "La sauce du chef ? Il faut être courageux.",
  },
};

export default saucesData;
