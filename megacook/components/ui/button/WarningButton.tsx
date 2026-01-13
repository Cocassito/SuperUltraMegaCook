import Warning from "@/components/svg/Warning";
import PixelButton from "./PixelButtonComponent";
import { useWarningSound } from "@/hooks/useButtonSound";
import { useEffect } from "react";

// Variable globale pour tracker si le son a déjà été joué
let hasPlayedGlobalSound = false;

export const WarningButton = () => {
  const playWarningSound = useWarningSound();

  // Jouer le son automatiquement quand le WarningButton apparaît, j'ai commenté car chiant quand on modifie autre chose il faut relancer 
  // useEffect(() => {
  //   if (!hasPlayedGlobalSound) {
  //     playWarningSound()?.catch((error: any) => {
  //       console.log("Erreur lors de la lecture du son d'avertissement:", error);
  //     });
  //     hasPlayedGlobalSound = true;
  //   }
  // }, []);

  return (
    <PixelButton
      icon={<Warning />}
      colorPrimary="#E23A3A"
      colorSecondary="#B72A2A"
      colorBorder="#9C1111"
      colorInnerShadow="#f45cbfff"
      onPress={() => {}}
    />
  );
};
