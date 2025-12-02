import { ImageSourcePropType } from "react-native";

export type AutreType = 'capsule' | 'cuberose' | 'cone' | 'isosphere';

export interface AutreData {
  name: string;
  model: any;
  image: ImageSourcePropType;
  description: string;
  price: number;
  nutritional: {
    sweet: number;
    salty: number;
    acidity: number;
    protein: number;
    fat: number;
  };
}

const capsuleModel = require("../assets/models/capsule.glb");
const cuberoseModel = require("../assets/models/cuberose.glb");
const coneModel = require("../assets/models/cone.glb");
const isosphereModel = require("../assets/models/isosphere.glb");

const autresData: Record<AutreType, AutreData> = {
  capsule: {
    name: 'Capsule',
    model: capsuleModel,
    image: require('../assets/images/capsule.png'),
    description: "Capsule spatiale pour une touche futuriste",
    price: 3,
    nutritional: { 
        sweet: 2, 
        salty: 1, 
        acidity: 0, 
        protein: 2, 
        fat: 1 
    },
  },
  cuberose: {
    name: 'Cube Rose',
    model: cuberoseModel,
    image: require('../assets/images/cuberose.png'),
    description: "Cube rose délicat, une douceur sucrée",
    price: 4,
    nutritional: { 
        sweet: 4, 
        salty: 0, 
        acidity: 1, 
        protein: 1, 
        fat: 2 
    },
  },
  cone: {
    name: 'Cône',
    model: coneModel,
    image: require('../assets/images/cone.png'),
    description: "Cône croustillant pour parfaire le tout",
    price: 2,
    nutritional: { 
        sweet: 3, 
        salty: 1, 
        acidity: 0, 
        protein: 1, 
        fat: 1 
    },
  },
  isosphere: {
    name: 'Isosphère',
    model: isosphereModel,
    image: require('../assets/images/isosphere.png'),
    description: "Sphère parfaite, équilibre géométrique",
    price: 5,
    nutritional: { 
        sweet: 1, 
        salty: 2, 
        acidity: 2, 
        protein: 3, 
        fat: 2 
    },
  },
};

export default autresData;
