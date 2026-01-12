import basesData, { BaseType } from "@/data/basesData";
import fruitsData, { FruitType } from "@/data/fruitsData";
import saucesData, { SauceType } from "@/data/saucesData";
import autresData, { AutreType } from "@/data/autresData";

export type Nutritional = {
  sweet: number;
  salty: number;
  fat: number;
  bitter: number;
  acidity: number;
  spicy: number;
  protein: number;
};

const KEYS: Array<keyof Nutritional> = [
  "sweet",
  "salty",
  "fat",
  "bitter",
  "acidity",
  "spicy",
  "protein",
];

export function computeAverageFromArray(items: Array<Nutritional>): Nutritional | null {
  if (!items || items.length === 0) return null;

  const average: Record<string, number> = {};

  KEYS.forEach((key) => {
    const sum = items.reduce((acc, item) => acc + (item[key] || 0), 0);
    average[key] = sum / items.length;
  });

  return average as Nutritional;
}

export function computeIngredientsAverage(
  validatedBase: BaseType | null,
  validatedFruit: FruitType | null,
  validatedSauce: SauceType | null,
  validatedAutre: AutreType | null,
): Nutritional | null {
  const nutritionalArray: Nutritional[] = [];

  if (validatedBase) nutritionalArray.push(basesData[validatedBase].nutritional as Nutritional);
  if (validatedFruit) nutritionalArray.push(fruitsData[validatedFruit].nutritional as Nutritional);
  if (validatedSauce) nutritionalArray.push(saucesData[validatedSauce].nutritional as Nutritional);
  if (validatedAutre) nutritionalArray.push(autresData[validatedAutre].nutritional as Nutritional);

  return computeAverageFromArray(nutritionalArray);
}
