import { useCallback } from "react";
import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

export const useSound = (soundPath: any) => {
  const playSound = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(soundPath);
      await sound.playAsync();

      // Décharger le son après qu'il ait fini de jouer
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log("Erreur lors de la lecture du son:", error);
    }
  }, [soundPath]);

  return playSound;
};

export const useButtonSound = () => {
  return useSound(require("@/assets/sounds/bouton.mp3"));
};

export const usePaperSound = () => {
  return useSound(require("@/assets/sounds/papier.mp3"));
};

export const useSelectedFoodSound = () => {
  return useSound(require("@/assets/sounds/selectedfood.mp3"));
};

export const useConfirmButtonSound = () => {
  return useSound(require("@/assets/sounds/confirmbutton.mp3"));
};

export const useTicketSound = () => {
  return useSound(require("@/assets/sounds/ticket.mp3"));
};

export const useSwipeSound = () => {
  return useSound(require("@/assets/sounds/swipe.mp3"));
};

export const useWarningSound = () => {
  return useSound(require("@/assets/sounds/warning.mp3"));
};  

export function useMusicSound() {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playMusic = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/music.mp3"),
        {
          isLooping: true, // ⭐ BOUCLE ICI
          volume: 0.5,
        }
      );
      soundRef.current = sound;
    }

    await soundRef.current.playAsync();
  };

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return playMusic;
}
