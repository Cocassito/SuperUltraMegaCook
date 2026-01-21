import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import chefsData, { ChefType } from "@/data/chefsData";
import { useCardAnimation } from "@/hooks/useCardAnimation";
import PixelButton from "@/components/ui/button/PixelButtonComponent";
import ArrowLeft from "@/components/svg/ArrowLeft";
import ArrowRight from "@/components/svg/ArrowRight";
import Star from "@/components/svg/Star";
import Line from "@/components/svg/Line";
import { useDialogueSound } from "@/hooks/useButtonSound";
import { useDialogueAnimation } from "@/hooks/useDialogueAnimation";

type ChefCardProps = {
  onClose: () => void;
  chefType: ChefType | null;
  onPrev?: () => void;
  onNext?: () => void;
  onValidate?: () => void;
};

export const ChefCard = ({
  onClose,
  chefType,
  onPrev,
  onNext,
  onValidate,
}: ChefCardProps) => {
  if (!chefType) return null;
  const { animatedStyle, handleClose } = useCardAnimation(onClose);
  const playDialogueSound = useDialogueSound();
  
  const [displayChefType, setDisplayChefType] = useState<ChefType>(chefType);
  const chef = chefsData[displayChefType];

  const { opacity, displayedText } = useDialogueAnimation(chef.dialogue);
  if (!chef) return null;

  const rating = Math.max(1, Math.min(5, chef.price));

  const slideX = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const cardRotate = useSharedValue(0); // in degrees
  const pendingDir = useRef<"next" | "prev" | null>(null);
  const window = useWindowDimensions();
  const CARD_OFFSET = Math.max(260, Math.min(0.9 * window.width, 420));
  const END_OFFSET = 8; // slight final offset from center
  const END_ROTATE = 5.5; // slight final rotation in degrees

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: slideX.value },
      { rotate: `${cardRotate.value}deg` },
    ],
    opacity: cardOpacity.value,
  }));

  useEffect(() => {
    if (chefType !== displayChefType) {
      const dir = pendingDir.current ?? "next";
      // Position off-screen on the opposite side and fade in
      slideX.value = dir === "next" ? CARD_OFFSET : -CARD_OFFSET;
      cardOpacity.value = 0;
      cardRotate.value = dir === "next" ? 5 : -5;
      setDisplayChefType(chefType as ChefType);
      const targetX = dir === "next" ? -END_OFFSET : END_OFFSET;
      slideX.value = withTiming(targetX, { duration: 240 });
      cardOpacity.value = withTiming(1, { duration: 240 });
      const targetRotate = dir === "next" ? END_ROTATE : -END_ROTATE;
      cardRotate.value = withTiming(targetRotate, { duration: 240 });
      pendingDir.current = null;
    }
  }, [chefType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      playDialogueSound();
    }, 150);
    return () => clearTimeout(timer);
  }, [displayChefType, playDialogueSound]);

  const handlePrev = () => {
    pendingDir.current = "prev";
    cardOpacity.value = withTiming(0, { duration: 160 });
    cardRotate.value = withTiming(5, { duration: 200 });
    slideX.value = withTiming(CARD_OFFSET, { duration: 200 }, (finished) => {
      if (finished && onPrev) runOnJS(onPrev)();
    });
  };

  const handleNext = () => {
    pendingDir.current = "next";
    cardOpacity.value = withTiming(0, { duration: 160 });
    cardRotate.value = withTiming(-5, { duration: 200 });
    slideX.value = withTiming(-CARD_OFFSET, { duration: 200 }, (finished) => {
      if (finished && onNext) runOnJS(onNext)();
    });
  };

  // Swipe gesture for chef card navigation
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    if (Math.abs(event.translationX) > 50) {
      event.translationX > 0 ? handlePrev() : handleNext();
    }
  });

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={styles.orderOverlay}>
        <Pressable style={StyleSheet.absoluteFill} />
        <Animated.View
          style={[styles.orderCard, animatedStyle, cardAnimatedStyle]}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={chef.image}
              style={styles.photo}
              resizeMode="cover"
            />
            <View style={styles.stars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  width={20}
                  height={20}
                  opacity={i < rating ? 1 : 0}
                />
              ))}
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.sectionLabel}>{chef.name.toUpperCase()}</Text>

            <Line strokeWidth={1} />

            <View style={styles.columns}>
              <View style={styles.column}>
                <Text style={styles.title}>Points forts</Text>
                {chef.strengths.map((strength, idx) => (
                  <Text
                    key={`${displayChefType}-strength-${idx}`}
                    style={styles.description}
                  >
                    {strength}
                  </Text>
                ))}
              </View>

              <Line vertical strokeWidth={1} paddingHorizontal={3} />

              <View style={styles.column}>
                <Text style={styles.title}>Points faibles</Text>
                {chef.weaknesses.map((weakness, idx) => (
                  <Text
                    key={`${displayChefType}-weakness-${idx}`}
                    style={styles.description}
                  >
                    {weakness}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Centered left/right navigation arrows for chef cards */}
        <View style={styles.arrowLeftCenter}>
          <PixelButton
            icon={<ArrowLeft />}
            colorPrimary="#C8A2DA"
            colorSecondary="#773B94"
            colorBorder="#55256D"
            colorInnerShadow="#E9DAF0"
            onPress={handlePrev}
          />
        </View>

        <View style={styles.arrowRightCenter}>
          <PixelButton
            icon={<ArrowRight />}
            colorPrimary="#C8A2DA"
            colorSecondary="#773B94"
            colorBorder="#55256D"
            colorInnerShadow="#E9DAF0"
            onPress={handleNext}
          />
        </View>
        {/* Valider Button - Bottom Center */}
        <View style={styles.validateButtonContainer}>
          <PixelButton
            title="Valider"
            colorPrimary="#C8A2DA"
            colorSecondary="#773B94"
            colorBorder="#55256D"
            colorInnerShadow="#E9DAF0"
            onPress={onValidate}
          />
        </View>

        {/* Dialogue Display */}
        <Animated.View style={styles.dialogueContainer}>
          <Text style={styles.dialogueText}>{displayedText.toUpperCase()}</Text>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  orderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.60)",
    alignItems: "center",
    justifyContent: "center",
  },
  orderCard: {
    width: 180,
    height: 250,
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute",
    top: 50,
  },
  photo: {
    width: 180,
    height: 100,
  },
  imageWrapper: {
    position: "relative",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    paddingVertical: 8,
    backgroundColor: "#C8A2DA",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "#260100",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontFamily: "pixelgridtrial-linedownboldm",
  },
  description: {
    fontSize: 10,
    color: "#FFF",
    marginTop: 4,
    fontFamily: "pixelgridtrial-linedownbolds",
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "pixelgridtrial-linedownbolds",
    textAlign: "center",
    color: "#FFF",
    textShadowColor: "#210100",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
  },
  arrowLeftCenter: {
    position: "absolute",
    left: 60,
    top: "50%",
    transform: [{ translateY: -24 }],
    zIndex: 3,
    elevation: 12,
  },
  arrowRightCenter: {
    position: "absolute",
    right: 60,
    top: "50%",
    transform: [{ translateY: -24 }],
    zIndex: 3,
    elevation: 12,
  },
  validateButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 24,
    alignSelf: "center",
    zIndex: 3,
    elevation: 12,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  dialogueContainer: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    zIndex: 9998,
    alignItems: "center",
  },
  dialogueText: {
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "pixelgridtrial-linedownbolds",
  },
  stars: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
    position: "absolute",
    bottom: 8,
    left: 8,
    zIndex: 2,
  },
  star: {
    fontSize: 20,
    color: "#FACC15",
    marginHorizontal: 2,
  },
  icon: {
    marginHorizontal: 3,
  },
  iconActive: {
    opacity: 1,
  },
  iconInactive: {
    opacity: 0.3,
  },
});
