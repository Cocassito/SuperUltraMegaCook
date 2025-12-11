import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function ArrowRight(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M12 2H14V4H16V6H18V8H20V12H18V14H16V16H14V18H12V20H8V16H10V14H12V12H0V8H12V6H10V4H8V0H12V2Z"
        fill="#ffffff"
      />
    </Svg>
  );
}
