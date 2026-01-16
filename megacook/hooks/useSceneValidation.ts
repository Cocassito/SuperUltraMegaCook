import { useMemo, useState } from "react";

export function useSceneValidation() {
  const [hasValidatedBase, setHasValidatedBase] = useState(false);
  const [hasValidatedFruit, setHasValidatedFruit] = useState(false);
  const [hasValidatedSauce, setHasValidatedSauce] = useState(false);
  const [hasValidatedAutre, setHasValidatedAutre] = useState(false);
  const [hasValidatedChef, setHasValidatedChef] = useState(false);

  const allValidated = useMemo(
    () =>
      hasValidatedBase &&
      hasValidatedFruit &&
      hasValidatedSauce &&
      hasValidatedAutre &&
      hasValidatedChef,
    [
      hasValidatedBase,
      hasValidatedFruit,
      hasValidatedSauce,
      hasValidatedAutre,
      hasValidatedChef,
    ]
  );

  const currentStep = useMemo(
    () =>
      [
        hasValidatedBase,
        hasValidatedFruit,
        hasValidatedSauce,
        hasValidatedAutre,
        hasValidatedChef,
      ].filter(Boolean).length,
    [
      hasValidatedBase,
      hasValidatedFruit,
      hasValidatedSauce,
      hasValidatedAutre,
      hasValidatedChef,
    ]
  );

  const resetValidation = () => {
    setHasValidatedBase(false);
    setHasValidatedFruit(false);
    setHasValidatedSauce(false);
    setHasValidatedAutre(false);
    setHasValidatedChef(false);
  };

  return {
    hasValidatedBase,
    hasValidatedFruit,
    hasValidatedSauce,
    hasValidatedAutre,
    hasValidatedChef,
    setHasValidatedBase,
    setHasValidatedFruit,
    setHasValidatedSauce,
    setHasValidatedAutre,
    setHasValidatedChef,
    allValidated,
    currentStep,
    resetValidation,
  };
}
