import { ImageSourcePropType } from "react-native";

export type BaseType = "frites" | "riz" | "pâtes";

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
  dialogue: string;
}

const fritesModel = require("../assets/models/ingredients/frites.glb");
const rizModel = require("../assets/models/ingredients/riz.glb");
const pâtesModel = require("../assets/models/ingredients/pâtes.glb");

const basesData: Record<BaseType, BaseData> = {
  frites: {
    name: "Frites",
    model: fritesModel,
    image: require("../assets/images/ingredients/frites.png"),
    price: 2,
    nutritional: {
      sweet: 1,
      salty: 2,
      fat: 1,
      bitter: 3,
      acidity: 0,
      spicy: 3,
      protein: 1,
    },
    dialogue: "LE GRAS ! DU GRAS !",
  },
  riz: {
    name: "Riz",
    model: rizModel,
    image: require("../assets/images/ingredients/riz.png"),
    price: 3,
    nutritional: {
      sweet: 4,
      salty: 2,
      fat: 3,
      bitter: 2,
      acidity: 4,
      spicy: 3,
      protein: 1,
    },
    dialogue: "Okay TiboInshape, manque plus que la dinde.",
  },
  pâtes: {
    name: "Pâtes",
    model: pâtesModel,
    image: require("../assets/images/ingredients/pates.png"),
    price: 5,
    nutritional: {
      sweet: 2,
      salty: 1,
      fat: 5,
      bitter: 1,
      acidity: 2,
      spicy: 3,
      protein: 4,
    },
    dialogue: "L\'aliment universel. Se marie avec tout, surtout la flemme.",
  },
};

export default basesData;
