import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function CloseIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M1 5V1H5V3H7V5H9V7H11V5H13V3H15V1H19V5H17V7H15V9H13V11H15V13H17V15H19V19H15V17H13V15H11V13H9V15H7V17H5V19H1V15H3V13H5V11H7V9H5V7H3V5H1Z"
        fill="#ffffff"
      />
    </Svg>
  );
}
