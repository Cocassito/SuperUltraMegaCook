import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function Warning(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M12 20H8V16H12V20ZM12 14H8V0H12V14Z" fill="white" />
    </Svg>
  );
}
