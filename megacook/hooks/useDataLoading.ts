import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import modelsData, { ModelType } from "../data/modelsData";
import basesData, { BaseType } from "../data/basesData";
import autresData, { AutreType } from "../data/autresData";

export const useDataLoading = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [modelUris, setModelUris] = useState<Record<string, string>>({});
  const assietteModel = require("../assets/models/assiette.glb");

  useEffect(() => {
    async function loadAssets() {
      try {
        const alimentEntries = Object.entries(modelsData) as [ModelType, any][];
        const alimentModules = alimentEntries.map(([, data]) => data.model);
        const baseEntries = Object.entries(basesData) as [BaseType, any][];
        const baseModules = baseEntries.map(([, data]) => data.model);
        const autreEntries = Object.entries(autresData) as [AutreType, any][];
        const autreModules = autreEntries.map(([, data]) => data.model);

        const tousLesModeles = [...alimentModules, ...baseModules, ...autreModules, assietteModel];
        const assets = await Asset.loadAsync(tousLesModeles);

        const uris: Record<string, string> = {};
        alimentEntries.forEach(([key], index) => {
          uris[key] = assets[index].localUri || assets[index].uri;
        });

        const baseStartIndex = alimentModules.length;
        baseEntries.forEach(([key], index) => {
          const asset = assets[baseStartIndex + index];
          uris[key] = asset.localUri || asset.uri;
        });

        const autreStartIndex = alimentModules.length + baseModules.length;
        autreEntries.forEach(([key], index) => {
          const asset = assets[autreStartIndex + index];
          uris[key] = asset.localUri || asset.uri;
        });

        const assietteIndex = alimentModules.length + baseModules.length + autreModules.length;
        uris["assiette"] = assets[assietteIndex].localUri || assets[assietteIndex].uri;

        setModelUris(uris);
        setAssetsLoaded(true);
      } catch (error) {
        console.error("Erreur lors du chargement des assets:", error);
      }
    }
    loadAssets();
  }, []);

  return { assetsLoaded, modelUris };
};
