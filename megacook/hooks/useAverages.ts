// import { useMemo } from "react";
// import modelsData, { ModelType } from "../data/modelsData";
// import basesData, { BaseType } from "../data/basesData";
// import autresData, { AutreType } from "../data/autresData";
// import chefsData, { ChefType } from "../data/chefsData";

// export const useGaugeAverage = (selectedModel: ModelType | null, selectedBase: BaseType | null, selectedAutre: AutreType | null) => {
//   return useMemo(() => {
//     const a = selectedModel ? modelsData[selectedModel].nutritional : null;
//     const b = selectedBase ? basesData[selectedBase].nutritional : null;
//     const c = selectedAutre ? autresData[selectedAutre].nutritional : null;
//     const selected = [a, b, c].filter(Boolean);
//     if (selected.length > 0) {
//       const count = selected.length;
//       return {
//         sweet: selected.reduce((sum, item) => sum + item!.sweet, 0) / count,
//         salty: selected.reduce((sum, item) => sum + item!.salty, 0) / count,
//         acidity: selected.reduce((sum, item) => sum + item!.acidity, 0) / count,
//         protein: selected.reduce((sum, item) => sum + item!.protein, 0) / count,
//         fat: selected.reduce((sum, item) => sum + item!.fat, 0) / count,
//       };
//     }
//     return { sweet: 0, salty: 0, acidity: 0, protein: 0, fat: 0 };
//   }, [selectedModel, selectedBase, selectedAutre]);
// };

// export const useResultAverages = (selectedChefs: ChefType[]) => {
//   return useMemo(() => {
//     if (selectedChefs.length === 0) return null;
//     const selected = selectedChefs.map((key) => chefsData[key]);
//     const count = selected.length;
//     return {
//       sweet: selected.reduce((sum, item) => sum + item.nutritional.sweet, 0) / count,
//       salty: selected.reduce((sum, item) => sum + item.nutritional.salty, 0) / count,
//       acidity: selected.reduce((sum, item) => sum + item.nutritional.acidity, 0) / count,
//       protein: selected.reduce((sum, item) => sum + item.nutritional.protein, 0) / count,
//       fat: selected.reduce((sum, item) => sum + item.nutritional.fat, 0) / count,
//       price: selected.reduce((sum, item) => sum + item.price, 0) / count,
//     };
//   }, [selectedChefs]);
// };
