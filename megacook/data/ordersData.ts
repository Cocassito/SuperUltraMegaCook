export type OrderType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type OrderData = {
  clientRequest: string;
  price: number;
  nutritional: {
    sweet: number;
    salty: number;
    acidity: number;
    bitter: number;
    spicy: number;
    protein: number;
    fat: number;
  };
};

const ordersData: ReadonlyArray<OrderData> = [
  {
    clientRequest: "Je voudrais un plat qui me court après la nuit.",
    price: 1,
    nutritional: {
      sweet: 3,
      salty: 4,
      acidity: 1,
      bitter: 5,
      spicy: 5,
      protein: 3,
      fat: 2,
    },
  },
  {
    clientRequest: "Je voudrais un plat qui respire l'argent",
    price: 5,
    nutritional: {
      sweet: 0,
      salty: 4,
      acidity: 1,
      bitter: 5,
      spicy: 5,
      protein: 3,
      fat: 2,
    },
  },
  {
    clientRequest: "Un plat qui me fait dire protéines > problèmes",
    price: 1,
    nutritional: {
      sweet: 5,
      salty: 0,
      acidity: 1,
      bitter: 0,
      spicy: 0,
      protein: 1,
      fat: 3,
    },
  },
  {
    clientRequest: "Je veux un plat qui me fera regretter mes choix de vie, mais avec le sourire !",
    price: 1,
    nutritional: {
      sweet: 2,
      salty: 3,
      acidity: 2,
      bitter: 1,
      spicy: 1,
      protein: 5,
      fat: 3,
    },
  },
  {
    clientRequest: "Servez-moi quelque chose de si sucré que mes dents demandent un avocat !",
    price: 1,
    nutritional: {
      sweet: 2,
      salty: 4,
      acidity: 0,
      bitter: 0,
      spicy: 2,
      protein: 3,
      fat: 5,
    },
  },
  {
    clientRequest: "Un repas 100% vegan, 0% culpabilité, 200% air.",
    price: 1,
    nutritional: {
      sweet: 1,
      salty: 3,
      acidity: 4,
      bitter: 3,
      spicy: 5,
      protein: 2,
      fat: 2,
    },
  },
  {
    clientRequest: "Je veux un plat si épicé qu'il rebooste mes vies antérieures !",
    price: 1,
    nutritional: {
      sweet: 3,
      salty: 2,
      acidity: 3,
      bitter: 1,
      spicy: 0,
      protein: 2,
      fat: 2,
    },
  },
  {
    clientRequest: "Servez-moi un truc si esthétique qu'il mérite un photoshoot avant d'être mangé",
    price: 1,
    nutritional: {
      sweet: 3,
      salty: 1,
      acidity: 5,
      bitter: 0,
      spicy: 0,
      protein: 1,
      fat: 0,
    },
  },
  {
    clientRequest: "Je veux un plat épique, genre celui qu'on mange juste avant une quête",
    price: 1,
    nutritional: {
      sweet: 1,
      salty: 3,
      acidity: 1,
      bitter: 2,
      spicy: 5,
      protein: 3,
      fat: 3,
    },
  },
];

export default ordersData;
