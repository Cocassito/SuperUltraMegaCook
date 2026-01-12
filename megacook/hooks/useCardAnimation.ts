import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useState, useEffect } from "react";

export const useCardAnimation = (onClose: () => void) => {
  const [isClosing, setIsClosing] = useState(false);
  const translateY = useSharedValue(300);
  const rotation = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, {
      stiffness: 200,
    });
    rotation.value = withSpring(3, {
      stiffness: 200,
    });
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    translateY.value = withSpring(300, {
      stiffness: 400,
    }, () => {
      onClose();
    });
    rotation.value = withSpring(0, {
      stiffness: 400,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` }
      ],
    };
  });

  return {
    animatedStyle,
    handleClose,
  };
};
