import { useState, useEffect } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

export function useDialogueAnimation(text: string | null) {
  const [displayedText, setDisplayedText] = useState("");
  const opacity = useSharedValue(0);
  const typingSpeed = 30; // millisecondes par caractère

  useEffect(() => {
    if (text) {
      opacity.value = withTiming(1, { duration: 100 });
      setDisplayedText("");
      
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.substring(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      setDisplayedText("");
    }
  }, [text]);

  return { opacity, displayedText };
}
