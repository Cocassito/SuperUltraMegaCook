import { useState } from "react";

export function useSceneUI() {
  const [showOrder, setShowOrder] = useState(false);
  const [showChefCard, setShowChefCard] = useState(false);
  const [showAverageResult, setShowAverageResult] = useState(false);
  const [showPlayerMachine, setShowPlayerMachine] = useState(false);
  const [showFinalPlate, setShowFinalPlate] = useState(false);

  return {
    showOrder,
    showChefCard,
    showAverageResult,
    showPlayerMachine,
    showFinalPlate,
    setShowOrder,
    setShowChefCard,
    setShowAverageResult,
    setShowPlayerMachine,
    setShowFinalPlate,
  };
}
