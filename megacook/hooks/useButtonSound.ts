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

export const useSwipeSound = () => {
  return useSound(require("@/assets/sounds/swipe.mp3"));
};

export const useWarningSound = () => {
  return useSound(require("@/assets/sounds/warning.mp3"));
};

export const useAlertSound = () => {
  return useSound(require("@/assets/sounds/warning1.mp3"));
};

export const useDialogueSound = () => {
  return useSound(require("@/assets/sounds/dialogue.mp3"));
}

export const useTadamSound = () => {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playTadamSound = async () => {
    try {
      // Si on a déjà une instance de son, la réutiliser
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(
          require("@/assets/sounds/tadam.mp3")
        );
        soundRef.current = sound;
      }

      // Rembobiner et jouer
      await soundRef.current.stopAsync();
      await soundRef.current.playAsync();
    } catch (error) {
      console.log("Erreur lors de la lecture du son tadam:", error);
    }
  };

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return playTadamSound;
}

export const useVictorySound = () => {
  return useSound(require("@/assets/sounds/victory.mp3"));
}

export function useVictorySoundLoop() {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playVictory = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/victory.mp3"),
        {
          isLooping: true,
          volume: 0.4,
        }
      );
      soundRef.current = sound;
    }

    await soundRef.current.playAsync();
  };

  const stopVictory = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return { playVictory, stopVictory };
}

export function useMusicSound() {
  const soundRef = useRef<Audio.Sound | null>(null);

  const playMusic = async () => {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/music.mp3"),
        {
          isLooping: true, 
          volume: 0.5,
        },
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
