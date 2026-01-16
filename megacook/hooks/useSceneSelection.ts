import { useState } from "react";
import { BaseType } from "@/data/basesData";
import { FruitType } from "@/data/fruitsData";
import { SauceType } from "@/data/saucesData";
import { AutreType } from "@/data/autresData";
import { ChefType } from "@/data/chefsData";

export function useSceneSelection() {
  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<FruitType | null>(null);
  const [selectedSauce, setSelectedSauce] = useState<SauceType | null>(null);
  const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);
  const [selectedChef, setSelectedChef] = useState<ChefType | null>(null);

  const resetSelection = () => {
    setSelectedBase(null);
    setSelectedFruit(null);
    setSelectedSauce(null);
    setSelectedAutre(null);
    setSelectedChef(null);
  };

  return {
    selectedBase,
    selectedFruit,
    selectedSauce,
    selectedAutre,
    selectedChef,
    setSelectedBase,
    setSelectedFruit,
    setSelectedSauce,
    setSelectedAutre,
    setSelectedChef,
    resetSelection,
  };
}
