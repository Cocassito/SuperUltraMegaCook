import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CloseButton } from "../button/CloseButton";
import { SaveButton } from "../button/SaveButton";
import { ResetButton } from "../button/ResetButton";
import { PixelSlider } from "../button/PixelSlider";

interface SettingsPopupProps {
  visible?: boolean;
  onClose?: () => void;
}

export const SettingsPopup = ({
  visible = false,
  onClose,
}: SettingsPopupProps) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const [dialogue, setDialogue] = useState(25);
  const [effets, setEffets] = useState(25);
  const [musique, setMusique] = useState(25);

  return (
    <View style={styles.overlay} pointerEvents={visible ? "auto" : "none"}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              position: "relative",
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Paramètres</Text>

            <PixelSlider
              label="Dialogue"
              value={dialogue}
              onChange={setDialogue}
            />
            <PixelSlider
              label="Effets sonores"
              value={effets}
              onChange={setEffets}
            />
            <PixelSlider
              label="Musique"
              value={musique}
              onChange={setMusique}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 46,
              marginTop: 40,
            }}
          >
            <ResetButton />
            <SaveButton />
          </View>
        </Animated.View>
      </SafeAreaView>
      {visible && (
        <View style={{ position: "absolute", top: 24, right: 36 }}>
          <CloseButton onClose={onClose || (() => {})} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },

  safeArea: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 560,
    color: "#FFF",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    fontSize: 24,
    color: "#FFF",
    textTransform: "uppercase",
    fontFamily: "pixelgridtrial-linedownboldm",
  },
  text: {
    fontSize: 20,
    color: "#FFF",
    fontFamily: "pixelgridtrial-linedownboldm",
  },

  content: {
    justifyContent: "center",
    gap: 24,
  },
});
