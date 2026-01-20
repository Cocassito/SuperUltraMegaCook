export type ChefType = 'sylvain' | 'merecotte' | 'philippeetchebest';

export interface ChefData {
  name: string;
  price: number;
  image: any;
  nutritional: {
    sweet: number;
    salty: number;
    acidity: number;
    protein: number;
    fat: number;
    bitter: number;
    spicy: number;
  };
  dialogue: string;
  strengths: string[];
  weaknesses: string[];
}

const chefsData: Record<ChefType, ChefData> = {
  sylvain: {
    name: 'Sylvain Duriff',
    price: 1,
    image: require('../assets/images/chefs/sylvain.png'),
    nutritional: { 
        sweet: 4, 
        salty: 2, 
        acidity: 3, 
        protein: 2, 
        fat: 2, 
        bitter: 1,
        spicy: 1
    },
    strengths: ['Christ cosmique'],
    weaknesses: ['Fou'],
    dialogue: "Non ! Pas le Christ Cosmique !",
  },
  merecotte: {
    name: 'Mère Cotte',
    price: 5,
    image: require('../assets/images/chefs/merecotte.png'),
    nutritional: { 
        sweet: 2, 
        salty: 5, 
        acidity: 2, 
        protein: 3, 
        fat: 2,
        bitter: 2,
        spicy: 3
    },
    strengths: ['Salem Aleykoum, les pâtissiers', 'Elle aime le sucre'],
    weaknesses: ['Elle aime le sucre'],
    dialogue: "Salam Aleykoum les pâtissiers !",
  },
  philippeetchebest: {
    name: 'Philippe Etchebest',
    price: 5,
    image: require('../assets/images/chefs/philippeetchebest.jpg'),
    nutritional: { 
        sweet: 2, 
        salty: 4, 
        acidity: 2, 
        protein: 5, 
        fat: 3,
        bitter: 3,
        spicy: 2
    },
    strengths: ['Meilleur ouvrier de France', 'C\'est lui le chef'],
    weaknesses: ['Trop fort', 'C\'est lui le chef'],
    dialogue: "C\'est qui le chef ?",
  }
};

export default chefsData;
