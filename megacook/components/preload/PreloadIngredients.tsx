import { useEffect } from "react";
import { Asset } from "expo-asset";
import { preloadModel } from "@/utils/PreloadModel";
import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";

export function PreloadIngredients() {
  useEffect(() => {
    // Précharger les modèles de bases
    preloadModel(basesData.frites.model);
    preloadModel(basesData.riz.model);
    preloadModel(basesData.pâtes.model);

    // Précharger les modèles de fruits
    preloadModel(fruitsData.broccoli.model);
    preloadModel(fruitsData.pomme.model);
    preloadModel(fruitsData.tomate.model);

    // Précharger les modèles de sauces
    preloadModel(saucesData.citron.model);
    preloadModel(saucesData.confiture.model);
    preloadModel(saucesData.sauce.model);

    // Précharger les modèles d'autres
    preloadModel(autresData.chocolat.model);
    preloadModel(autresData.poulet.model);
    preloadModel(autresData.saumon.model);

    // Précharger le model final
    // preloadModel(require("../../data/assets/models/ingredients/final.glb"));
  }, []);

  return null;
}
