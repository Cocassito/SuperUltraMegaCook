import React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

export default function Step(props: SvgProps) {
  return (
    <Svg width={45} height={14} viewBox="0 0 45 14" fill="none" {...props}>
      <Rect width={45} height={11} fill="#C8A2DA" />
      <Rect x={3} y={3} width={39} height={3} fill="#D3B5E1" />
      <Rect y={11} width={45} height={3} fill="#773B94" />
    </Svg>
  );
}
