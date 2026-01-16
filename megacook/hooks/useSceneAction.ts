import { useState } from "react";
import { useSceneSelection } from "./useSceneSelection";
import { useSceneValidation } from "./useSceneValidation";
import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";
import chefsData from "@/data/chefsData";

export function useSceneActions(playTicketSound: () => void) {
  const selection = useSceneSelection();
  const validation = useSceneValidation();

  // Cuisson
  const [isCuireBase, setIsCuireBase] = useState(false);
  const [isCuireFruit, setIsCuireFruit] = useState(false);
  const [isCuireAutre, setIsCuireAutre] = useState(false);

  // Modèles validés
  const [validatedModel, setValidatedModel] = useState<string | null>(null);
  const [validatedFruitModel, setValidatedFruitModel] = useState<string | null>(
    null
  );
  const [validatedSauceModel, setValidatedSauceModel] = useState<string | null>(
    null
  );
  const [validatedAutreModel, setValidatedAutreModel] = useState<string | null>(
    null
  );
  const [validatedChefModel, setValidatedChefModel] = useState<string | null>(
    null
  );

  const resetAll = () => {
    selection.resetSelection();
    validation.resetValidation();
    setIsCuireBase(false);
    setIsCuireFruit(false);
    setIsCuireAutre(false);

    setValidatedModel(null);
    setValidatedFruitModel(null);
    setValidatedSauceModel(null);
    setValidatedAutreModel(null);
    setValidatedChefModel(null);
  };

  const onValidate = () => {
    if (!validation.hasValidatedBase && selection.selectedBase) {
      setValidatedModel(basesData[selection.selectedBase].model);
      validation.setHasValidatedBase(true);
    } else if (!validation.hasValidatedFruit && selection.selectedFruit) {
      setValidatedFruitModel(fruitsData[selection.selectedFruit].model);
      validation.setHasValidatedFruit(true);
    } else if (!validation.hasValidatedSauce && selection.selectedSauce) {
      setValidatedSauceModel(saucesData[selection.selectedSauce].model);
      validation.setHasValidatedSauce(true);
    } else if (!validation.hasValidatedAutre && selection.selectedAutre) {
      setValidatedAutreModel(autresData[selection.selectedAutre].model);
      validation.setHasValidatedAutre(true);
    } else if (!validation.hasValidatedChef && selection.selectedChef) {
      setValidatedChefModel(chefsData[selection.selectedChef].name);
      validation.setHasValidatedChef(true);
      playTicketSound();
    }
  };

  const onCuireChange = (isCuire: boolean) => {
    if (!validation.hasValidatedBase) setIsCuireBase(isCuire);
    else if (!validation.hasValidatedFruit) setIsCuireFruit(isCuire);
    else setIsCuireAutre(isCuire);
  };

  return {
    selection,
    validation,
    isCuireBase,
    isCuireFruit,
    isCuireAutre,
    setIsCuireBase,
    setIsCuireFruit,
    setIsCuireAutre,
    validatedModel,
    validatedFruitModel,
    validatedSauceModel,
    validatedAutreModel,
    validatedChefModel,
    resetAll,
    onValidate,
    onCuireChange,
  };
}
