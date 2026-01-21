import { useState } from "react";

export function useSceneUI() {
  const [showOrder, setShowOrder] = useState(false);
  const [showChefCard, setShowChefCard] = useState(false);
  const [showAverageResult, setShowAverageResult] = useState(false);
  const [showPlayerMachine, setShowPlayerMachine] = useState(false);
  const [showFinalPlate, setShowFinalPlate] = useState(false);
  const [showBurnedSalmon, setShowBurnedSalmon] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  return {
    showOrder,
    showChefCard,
    showAverageResult,
    showPlayerMachine,
    showFinalPlate,
    showBurnedSalmon,
    isVictory,
    setShowOrder,
    setShowChefCard,
    setShowAverageResult,
    setShowPlayerMachine,
    setShowFinalPlate,
    setShowBurnedSalmon,
    setIsVictory,
  };
}
