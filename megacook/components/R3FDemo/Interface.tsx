import { Canvas } from "./lib/fiber";
import Box from "./FoodScene";
import { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Asset } from 'expo-asset';
import modelsData, { ModelType } from "../data/modelsData";
import basesData, { BaseType } from "../data/basesData";
import autresData, { AutreType } from "../data/autresData";
import chefsData, { ChefType } from "../data/chefsData";
import SelectionModal from "./SelectionModal";
import GaugeSummary from "../ui/GaugeSummary";
import ResultPage from "./ResultPage";
import Entypo from '@expo/vector-icons/Entypo';

// 3 éléments aléatoires parmi 4
const getRandomItems = <T,>(items: T[], count: number = 3): T[] => {
  const copie = [...items];
  const melange = copie.sort(() => Math.random() - 0.5);
  // Prend les 3 premiers éléments
  return melange.slice(0, count);
};

export default function ThreeDemo() {
  const [showAlimentModal, setShowAlimentModal] = useState(false);
  const [showBaseModal, setShowBaseModal] = useState(false);
  const [showAutreModal, setShowAutreModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [selectedBase, setSelectedBase] = useState<BaseType | null>(null);
  const [selectedAutre, setSelectedAutre] = useState<AutreType | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [modelUris, setModelUris] = useState<Record<string, string>>({});
  const assietteModel = require("../../assets/models/assiette.glb");
  const [showGauge, setShowGauge] = useState(false);
  const [randomAliments, setRandomAliments] = useState<Array<[string, any]>>([]);
  const [randomBases, setRandomBases] = useState<Array<[string, any]>>([]);
  const [randomAutres, setRandomAutres] = useState<Array<[string, any]>>([]);

  const [showChefModal, setShowChefModal] = useState(false);
  const [selectedChefs, setSelectedChefs] = useState<ChefType[]>([]);
  const [randomChefs, setRandomChefs] = useState<Array<[string, any]>>([]);
  const [showResultPage, setShowResultPage] = useState(false);

  const handleTirage = () => {
    if (!selectedModel) {
      const allAliments = Object.entries(modelsData);
      setRandomAliments(getRandomItems(allAliments, 3));
      setShowAlimentModal(true);
      return;
    }
    if (!selectedBase) {
      const allBases = Object.entries(basesData);
      setRandomBases(getRandomItems(allBases, 3));
      setShowBaseModal(true);
      return;
    }
    if (!selectedAutre) {
      const allAutres = Object.entries(autresData);
      setRandomAutres(getRandomItems(allAutres, 3));
      setShowAutreModal(true);
      return;
    }
    const allChefs = Object.entries(chefsData);
    setRandomChefs(getRandomItems(allChefs, 3));
    setShowChefModal(true);
  };
  // Calcul moyenne jauges et prix pour Résultat
  const resultAverages = useMemo(() => {
    if (selectedChefs.length === 0) return null;
    const selected = selectedChefs.map((key) => chefsData[key]);
    const count = selected.length;
    const avg = {
      sweet: selected.reduce((sum, item) => sum + item.nutritional.sweet, 0) / count,
      salty: selected.reduce((sum, item) => sum + item.nutritional.salty, 0) / count,
      acidity: selected.reduce((sum, item) => sum + item.nutritional.acidity, 0) / count,
      protein: selected.reduce((sum, item) => sum + item.nutritional.protein, 0) / count,
      fat: selected.reduce((sum, item) => sum + item.nutritional.fat, 0) / count,
      price: selected.reduce((sum, item) => sum + item.price, 0) / count,
    };
    return avg;
  }, [selectedChefs]);

  useEffect(() => {
    async function loadAssets() {
      try {
        // Récupère tous les modèles d'aliments
        const alimentEntries = Object.entries(modelsData) as [ModelType, any][];
        const alimentModules = alimentEntries.map(([, data]) => data.model);
        
        // Récupère tous les modèles de bases
        const baseEntries = Object.entries(basesData) as [BaseType, any][];
        const baseModules = baseEntries.map(([, data]) => data.model);
      
        // Récupère tous les modèles d'autres
        const autreEntries = Object.entries(autresData) as [AutreType, any][];
        const autreModules = autreEntries.map(([, data]) => data.model);
        
        // Charge tous les modèles 3D en une fois
        const tousLesModeles = [...alimentModules, ...baseModules, ...autreModules, assietteModel];
        const assets = await Asset.loadAsync(tousLesModeles);
        
        // Crée un objet avec les chemins des modèles chargés
        const uris: Record<string, string> = {};
        
        // Associe chaque aliment à son chemin
        alimentEntries.forEach(([key], index) => {
          uris[key] = assets[index].localUri || assets[index].uri;
        });
        
        // Associe chaque base à son chemin
        const baseStartIndex = alimentModules.length;
        baseEntries.forEach(([key], index) => {
          const asset = assets[baseStartIndex + index];
          uris[key] = asset.localUri || asset.uri;
        });

        // Associe chaque autre à son chemin (en dehors de la boucle des bases)
        const autreStartIndex = alimentModules.length + baseModules.length;
        autreEntries.forEach(([key], index) => {
          const asset = assets[autreStartIndex + index];
          uris[key] = asset.localUri || asset.uri;
        });
        
        const assietteIndex = alimentModules.length + baseModules.length + autreModules.length;
        uris['assiette'] = assets[assietteIndex].localUri || assets[assietteIndex].uri;
        
        setModelUris(uris);
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des assets:', error);
      }
    }
    loadAssets();
  }, []);

  const gaugeAverage = useMemo(() => {
    const a = selectedModel ? modelsData[selectedModel].nutritional : null;
    const b = selectedBase ? basesData[selectedBase].nutritional : null;
    const c = selectedAutre ? autresData[selectedAutre].nutritional : null;
    
    // Moyenne de tous les éléments sélectionnés
    const selected = [a, b, c].filter(Boolean);
    if (selected.length > 0) {
      const count = selected.length;
      const avg = {
        sweet: selected.reduce((sum, item) => sum + item!.sweet, 0) / count,
        salty: selected.reduce((sum, item) => sum + item!.salty, 0) / count,
        acidity: selected.reduce((sum, item) => sum + item!.acidity, 0) / count,
        protein: selected.reduce((sum, item) => sum + item!.protein, 0) / count,
        fat: selected.reduce((sum, item) => sum + item!.fat, 0) / count,
      };
      return avg;
    }
    return { sweet: 0, salty: 0, acidity: 0, protein: 0, fat: 0 };
  }, [selectedModel, selectedBase, selectedAutre]);

  if (!assetsLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#55256D" />
        <Text style={styles.loadingText}>Chargement des modèles 3D...</Text>
      </View>
    );
  }

  if (showResultPage) {
    return (
      <ResultPage
        selectedChefs={selectedChefs}
        selectedModel={selectedModel}
        selectedBase={selectedBase}
        selectedAutre={selectedAutre}
        onBack={() => {
          setShowResultPage(false);
          setSelectedChefs([]);
          setSelectedModel(null);
          setSelectedBase(null);
          setSelectedAutre(null);
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <Entypo style={styles.gaugeButton} onPress={() => setShowGauge((s) => !s)} name="gauge"/>
      </View>
      <View style={styles.canvasWrapper}>
        <Canvas style={styles.canvas} camera={{ position: [2, 5, 5], fov: 70 }}>
          <color attach="background" args={[0xFFF2DD]} />
          <ambientLight color={0xFFFFFF} intensity={1} />
          <directionalLight intensity={0.8} position={[0, 2, 0]} />
          {modelUris.assiette && (
            <Box
              alimentSrc={selectedModel && modelUris[selectedModel] ? modelUris[selectedModel] : ''}
              baseSrc={selectedBase && modelUris[selectedBase] ? modelUris[selectedBase] : null}
              autreSrc={selectedAutre && modelUris[selectedAutre] ? modelUris[selectedAutre] : null}
              assietteModel={modelUris.assiette}
            />
          )}
        </Canvas>
      </View>
      {showGauge && (
        <View style={styles.gaugePanel}>
          <GaugeSummary title="Moyenne des jauges" nutritional={gaugeAverage} />
        </View>
      )}
      <View style={styles.bottomBar}>
        <Text style={styles.tirageButton} onPress={handleTirage}>Tirage</Text>
      </View>
      <SelectionModal
        visible={showAlimentModal}
        title="À toi de choisir !"
        items={randomAliments.map(([key, data]) => ({ key, name: data.name, image: data.image, description: data.description, price: data.price }))}
        selectedKey={selectedModel}
        onSelect={(key) => setSelectedModel(key as ModelType)}
        onValidate={() => {
          if (!selectedModel) return;
          setShowAlimentModal(false);
        }}
      />
      <SelectionModal
        visible={showBaseModal}
        title="Ajoute une base !"
        items={randomBases.map(([key, data]) => ({ key, name: data.name, image: data.image, description: data.description, price: data.price }))}
        selectedKey={selectedBase}
        onSelect={(key) => setSelectedBase(key as BaseType)}
        onValidate={() => {
          if (!selectedBase) return;
          setShowBaseModal(false);
        }}
      />
      <SelectionModal
        visible={showAutreModal}
        title="Ajoute un autre !"
        items={randomAutres.map(([key, data]) => ({ key, name: data.name, image: data.image, description: data.description, price: data.price }))}
        selectedKey={selectedAutre}
        onSelect={(key) => setSelectedAutre(key as AutreType)}
        onValidate={() => {
          if (!selectedAutre) return;
          setShowAutreModal(false);
        }}
      />
      {/* Modale chefs */}
      <SelectionModal
        visible={showChefModal}
        title="Choisis ton chef !"
        items={randomChefs.map(([key, data]) => ({ key, name: data.name, image: data.image, description: data.description, price: data.price, nutritional: data.nutritional }))}
        selectedKey={selectedChefs.length > 0 ? selectedChefs[0] : null}
        onSelect={(key) => {
          setSelectedChefs([key as ChefType]);
        }}
        onValidate={() => {
          if (selectedChefs.length === 0) return;
          setShowChefModal(false);
          setShowResultPage(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topRight: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 20,
  },
  gaugeButton: {
    backgroundColor: '#C8A2DA', 
    color: '#55256D',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 32,
    fontWeight: 'bold',
    fontSize: 20,
    zIndex: 1,
  },
  canvasWrapper: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  gaugePanel: {
    position: 'absolute',
    top: 52,
    right: 12,
    zIndex: 19,
  },
  infoPanel: {
    backgroundColor: '#fff',
    padding: 16,
    maxHeight: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    marginBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  vegetarianBadge: {
    backgroundColor: '#A8E6CF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vegetarianText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D5016',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
    marginRight: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  modelImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  nutritionalSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bottomBar: {
    backgroundColor: '#FFF2DD',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
  },
  tirageButton: {
    backgroundColor: '#C8A2DA',
    color: '#55256D',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 18,
    overflow: 'hidden',
    textAlign: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
