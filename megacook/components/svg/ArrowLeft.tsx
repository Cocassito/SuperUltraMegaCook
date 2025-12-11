import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function ArrowLeft(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M8 18L6 18L6 16L4 16L4 14L2 14L2 12L6.99382e-07 12L1.04907e-06 8L2 8L2 6L4 6L4 4L6 4L6 2L8 2L8 -1.04907e-06L12 -6.99382e-07L12 4L10 4L10 6L8 6L8 8L20 8L20 12L8 12L8 14L10 14L10 16L12 16L12 20L8 20L8 18Z"
        fill="#ffffff"
      />
    </Svg>
  );
}
