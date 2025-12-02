// // Interface.tsx
// import { Canvas } from "./lib/fiber";
// import { useCameraControls } from "../controls/CameraControls";
// import { useState, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
// import { Asset } from "expo-asset";
// import modelsData, { ModelType } from "../data/modelsData";
// import basesData, { BaseType } from "../data/basesData";
// import autresData, { AutreType } from "../data/autresData";
// import chefsData, { ChefType } from "../data/chefsData";
// import { AlimentModal } from "./modals/AlimentModal";
// import { BaseModal } from "./modals/BaseModal";
// import { AutreModal } from "./modals/AutreModal";
// import { ChefModal } from "./modals/ChefModal";
// import ResultPage from "../pages/ResultPage";
// import PlateScene from "./PlateScene";
// import { SceneLights } from "./sceneLights/SceneLights";
// import { NavigationButtons } from "./ui/button/NavigationButtons";
// import { LoadingScreen } from "./loadingScreen/LoadingScreen";
// import { useDataLoading } from "../hooks/useDataLoading";
// import { useGaugeAverage, useResultAverages } from "../hooks/useAverages";

// // Fonction utilitaire pour obtenir des éléments aléatoires
// const getRandomItems = <T,>(items: T[], count: number = 3): T[] => {
//   const copie = [...items];
//   return copie.sort(() => Math.random() - 0.5).slice(0, count);
// };

// export default function ThreeDemo() {
//   // États
//   const [showAlimentModal, setShowAlimentModal] = useState(false);
//   const [showBaseModal, setShowBaseModal] = useState(false);
//   const [showAutreModal, setShowAutreModal] = useState(false);
//   const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
//   const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
//   const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);
//   const [randomAliments, setRandomAliments] = useState<Array<[string, any]>>(
//     []
//   );
//   const [randomBases, setRandomBases] = useState<Array<[string, any]>>([]);
//   const [randomAutres, setRandomAutres] = useState<Array<[string, any]>>([]);
//   const [showChefModal, setShowChefModal] = useState(false);
//   const [selectedChefs, setSelectedChefs] = useState<ChefType[]>([]);
//   const [randomChefs, setRandomChefs] = useState<Array<[string, any]>>([]);
//   const [showResultPage, setShowResultPage] = useState(false);

//   // Chargement des assets
//   const { assetsLoaded, modelUris } = useDataLoading();

//   // Contrôles de la caméra
//   const {
//     controlsRef,
//     meshFitCamera1,
//     meshFitCamera2,
//     meshFitCamera3,
//     meshFitCamera4,
//     meshFitCamera5,
//     nextView,
//     prevView,
//   } = useCameraControls(assetsLoaded);

//   // Calcul des moyennes
//   const gaugeAverage = useGaugeAverage(
//     selectedModel,
//     selectedBase,
//     selectedAutre
//   );
//   const resultAverages = useResultAverages(selectedChefs);

//   // Affichage pendant le chargement
//   if (!assetsLoaded) {
//     return <LoadingScreen />;
//   }

//   // Affichage de la page de résultats
//   if (showResultPage) {
//     return (
//       <ResultPage
//         selectedChefs={selectedChefs}
//         selectedModel={selectedModel}
//         selectedBase={selectedBase}
//         selectedAutre={selectedAutre}
//         onBack={() => {
//           setShowResultPage(false);
//           setSelectedChefs([]);
//           setSelectedModel(null);
//           setSelectedBase(null);
//           setSelectedAutre(null);
//         }}
//       />
//     );
//   }

//   // Rendu principal
//   return (
//     <View style={styles.container}>
//       <View style={styles.canvasWrapper}>
//         <Canvas
//           style={styles.canvas}
//           camera={{
//             position: [1, 10, 15],
//             fov: 55,
//             near: 0.1,
//             far: 500,
//           }}
//         >
//           <SceneLights />
//           {modelUris.assiette && (
//             <PlateScene
//               alimentSrc={
//                 selectedModel && modelUris[selectedModel]
//                   ? modelUris[selectedModel]
//                   : ""
//               }
//               baseSrc={
//                 selectedBase && modelUris[selectedBase]
//                   ? modelUris[selectedBase]
//                   : null
//               }
//               autreSrc={
//                 selectedAutre && modelUris[selectedAutre]
//                   ? modelUris[selectedAutre]
//                   : null
//               }
//               assietteModel={modelUris.assiette}
//             />
//           )}
//         </Canvas>
//       </View>
//       <NavigationButtons prevView={prevView} nextView={nextView} />
//       {/* Modales */}
//       <AlimentModal
//         visible={showAlimentModal}
//         items={randomAliments.map(([key, data]) => ({
//           key,
//           name: data.name,
//           image: data.image,
//           description: data.description,
//           price: data.price,
//         }))}
//         selectedKey={selectedModel}
//         onSelect={(key) => setSelectedModel(key as ModelType)}
//         onValidate={() => {
//           if (!selectedModel) return;
//           setShowAlimentModal(false);
//         }}
//       />
//       <BaseModal
//         visible={showBaseModal}
//         items={randomBases.map(([key, data]) => ({
//           key,
//           name: data.name,
//           image: data.image,
//           description: data.description,
//           price: data.price,
//         }))}
//         selectedKey={selectedBase}
//         onSelect={(key) => setSelectedBase(key as BaseType)}
//         onValidate={() => {
//           if (!selectedBase) return;
//           setShowBaseModal(false);
//         }}
//       />
//       <AutreModal
//         visible={showAutreModal}
//         items={randomAutres.map(([key, data]) => ({
//           key,
//           name: data.name,
//           image: data.image,
//           description: data.description,
//           price: data.price,
//         }))}
//         selectedKey={selectedAutre}
//         onSelect={(key) => setSelectedAutre(key as AutreType)}
//         onValidate={() => {
//           if (!selectedAutre) return;
//           setShowAutreModal(false);
//         }}
//       />
//       <ChefModal
//         visible={showChefModal}
//         items={randomChefs.map(([key, data]) => ({
//           key,
//           name: data.name,
//           image: data.image,
//           description: data.description,
//           price: data.price,
//           nutritional: data.nutritional,
//         }))}
//         selectedKey={selectedChefs.length > 0 ? selectedChefs[0] : null}
//         onSelect={(key) => {
//           setSelectedChefs([key as ChefType]);
//         }}
//         onValidate={() => {
//           if (selectedChefs.length === 0) return;
//           setShowChefModal(false);
//           setShowResultPage(true);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   canvasWrapper: {
//     flex: 1,
//   },
//   canvas: {
//     flex: 1,
//   },
// });
