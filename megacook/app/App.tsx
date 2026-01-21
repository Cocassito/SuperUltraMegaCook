import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PlayerBD } from "@/components/PlayerBD";
import { LoadingScreen } from "@/components/loadingScreen/LoadingScreen";
import SceneContent from "@/components/scene/SceneContent";
import { useMusicSound, useTadamSound } from "@/hooks/useButtonSound";

import "../three/preload";

export default function App() {
  const [videoFinished, setVideoFinished] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [showPlayerMachine, setShowPlayerMachine] = useState(false);
  const [showFinalPlate, setShowFinalPlate] = useState(false);
  const [showAverageResult, setShowAverageResult] = useState(false);
  const [showBurnedSalmon, setShowBurnedSalmon] = useState(false);
  const { playMusic, stopMusic } = useMusicSound();
  const { playTadam } = useTadamSound();
  const musicStartedRef = React.useRef(false);

  // Démarrer la musique uniquement quand la scène est prête ET après le LoadingScreen (videoFinished)
  useEffect(() => {
    if (videoFinished && sceneReady && !musicStartedRef.current) {
      musicStartedRef.current = true;
      playMusic();
    }
  }, [videoFinished, sceneReady, playMusic]);

  // Arrêter la musique pendant PlayerMachine, FinalPlate, AverageResult et BurnedSalmon, relancer après
  useEffect(() => {
    if (showPlayerMachine || showFinalPlate || showAverageResult || showBurnedSalmon) {
      stopMusic();
    } else if (sceneReady && musicStartedRef.current) {
      playMusic();
    }
  }, [showPlayerMachine, showFinalPlate, showAverageResult, showBurnedSalmon, sceneReady, playMusic, stopMusic]);

  return (
    <View style={{ flex: 1 }}>
      {/* PlayerBD visible tant que la vidéo n'est pas terminée */}
      {!videoFinished && <PlayerBD onVideoEnd={() => setVideoFinished(true)} />}

      {/* LoadingScreen visible après fin vidéo et avant que la scene soit prête */}
      {videoFinished && !sceneReady && <LoadingScreen />}

      {/* Scene visible uniquement quand elle est prête */}
      <SceneContent 
        onSceneReady={() => setSceneReady(true)}
        onShowPlayerMachine={setShowPlayerMachine}
        onShowFinalPlate={setShowFinalPlate}
        onShowAverageResult={setShowAverageResult}
        onShowBurnedSalmon={setShowBurnedSalmon}
        onPlayTadam={playTadam}
      />
    </View>
  );
}
