export type ChefType = 'lola' | 'leo' | 'philippeetchebest';

export interface ChefData {
  name: string;
  description: string;
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
}

const chefsData: Record<ChefType, ChefData> = {
  lola: {
    name: 'Lola',
    description: 'Créative et audacieuse, Lola revisite les classiques avec une touche sucrée.',
    price: 4,
    image: require('../assets/images/chefs/lola.jpg'),
    nutritional: { 
        sweet: 4, 
        salty: 2, 
        acidity: 3, 
        protein: 2, 
        fat: 2,
        bitter: 1,
        spicy: 1
    },
  },
  leo: {
    name: 'Léo',
    description: 'Léo privilégie les saveurs salées et les associations inattendues.',
    price: 3,
    image: require('../assets/images/chefs/leo.jpg'),
    nutritional: { 
        sweet: 2, 
        salty: 5, 
        acidity: 2, 
        protein: 3, 
        fat: 2,
        bitter: 2,
        spicy: 3
    },
  },
  philippeetchebest: {
    name: 'Philippe Etchebest',
    description: 'Un chef exigeant, ses plats sont puissants et riches en protéines.',
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
  }
};

export default chefsData;
