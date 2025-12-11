import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
} from "react-native";

interface PixelSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

export const PixelSlider = ({ label, value, onChange }: PixelSliderProps) => {
  const barWidth = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (evt) => {
        const x = evt.nativeEvent.locationX;
        if (!barWidth.current) return;
        const percent = Math.round((x / barWidth.current) * 100);
        onChange(Math.min(100, Math.max(0, percent)));
      },

      onPanResponderMove: (evt) => {
        const x = evt.nativeEvent.locationX;
        if (!barWidth.current) return;
        const percent = Math.round((x / barWidth.current) * 100);
        onChange(Math.min(100, Math.max(0, percent)));
      },
    })
  ).current;

  const onLayoutBar = (e: LayoutChangeEvent) => {
    barWidth.current = e.nativeEvent.layout.width;
  };

  return (
    <View style={styles.row}>
      {/* LABEL */}
      <Text style={styles.label}>{label.toUpperCase()}</Text>

      {/* SLIDER */}
      <View
        style={styles.barBackground}
        onLayout={onLayoutBar}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.barFill,
            {
              width: `${value}%`,
            },
          ]}
        />
      </View>

      {/* POURCENTAGE */}
      <Text style={styles.percent}>{value}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    maxWidth: 600,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },

  label: {
    width: 120,
    fontSize: 20,
    color: "#FFF",
    fontFamily: "pixelgridtrial-linedownboldm",
  },

  barBackground: {
    flex: 1,
    height: 24,
    backgroundColor: "#FFF",
    borderWidth: 4,
    borderColor: "#FFF",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#7B3FA7",
  },

  percent: {
    width: 60,
    textAlign: "right",
    fontSize: 18,
    color: "#FFF",
    fontFamily: "pixelgridtrial-linedownboldm",
  },
});
