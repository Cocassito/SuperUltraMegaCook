import { useMemo } from "react";
import { preloadModel } from "@/utils/PreloadModel";
import basesData from "@/data/basesData";
import fruitsData from "@/data/fruitsData";
import saucesData from "@/data/saucesData";
import autresData from "@/data/autresData";

export function PreloadIngredients() {
  // useMemo pour ne faire le preload qu'une seule fois
  useMemo(() => {
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
  }, []); // Dépendances vides = exécuté une seule fois

  return null;
}
