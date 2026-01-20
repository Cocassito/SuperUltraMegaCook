import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export function useScaleAnimation(onClose: () => void) {
  const scale = useSharedValue(0);

  useEffect(() => {
    // Animation d'ouverture: scale de 0 à 1 sans rebond
    scale.value = withTiming(1, {
      duration: 200,
    });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleClose = () => {
    // Animation de fermeture: scale de 1 à 0 sans rebond
    scale.value = withTiming(0, {
      duration: 200,
    });
    
    // Appeler onClose après l'animation
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return {
    animatedStyle,
    handleClose,
  };
}
