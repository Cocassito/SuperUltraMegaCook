export type ChefType = 'lola' | 'leo' | 'alan' | 'philippeetchebest' | 'helenedarroze' | 'jeandurant';

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
  };
}

const chefsData: Record<ChefType, ChefData> = {
  lola: {
    name: 'Lola',
    description: 'Créative et audacieuse, Lola revisite les classiques avec une touche sucrée.',
    price: 4,
    image: require('../assets/images/lola.jpg'),
    nutritional: { 
        sweet: 4, 
        salty: 2, 
        acidity: 3, 
        protein: 2, 
        fat: 2 
    },
  },
  leo: {
    name: 'Léo',
    description: 'Léo privilégie les saveurs salées et les associations inattendues.',
    price: 3,
    image: require('../assets/images/leo.jpg'),
    nutritional: { 
        sweet: 2, 
        salty: 5, 
        acidity: 2, 
        protein: 3, 
        fat: 2 
    },
  },
  alan: {
    name: 'Alan',
    description: 'Alan est le roi de l’équilibre, chaque plat est une harmonie parfaite.',
    price: 5,
    image: require('../assets/images/alan.jpg'),
    nutritional: { 
        sweet: 3, 
        salty: 3, 
        acidity: 3, 
        protein: 4, 
        fat: 3 
    },
  },
  philippeetchebest: {
    name: 'Philippe Etchebest',
    description: 'Un chef exigeant, ses plats sont puissants et riches en protéines.',
    price: 5,
    image: require('../assets/images/philippeetchebest.jpg'),
    nutritional: { 
        sweet: 2, 
        salty: 4, 
        acidity: 2, 
        protein: 5, 
        fat: 3 
    },
  },
  helenedarroze: {
    name: 'Hélène Darroze',
    description: 'Hélène sublime l’acidité et la finesse dans ses créations.',
    price: 4,
    image: require('../assets/images/helenedarroze.jpg'),
    nutritional: { 
        sweet: 3, 
        salty: 2, 
        acidity: 5, 
        protein: 3, 
        fat: 2 
    },
  },
  jeandurant: {
    name: 'Jean Durant',
    description: 'Jean mise sur la gourmandise et la générosité, surtout côté gras.',
    price: 3,
    image: require('../assets/images/jeandurant.jpg'),
    nutritional: { 
        sweet: 3, 
        salty: 3, 
        acidity: 2, 
        protein: 2, 
        fat: 5 
    },
  },
};

export default chefsData;
