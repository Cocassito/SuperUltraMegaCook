import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export default function SettingsIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M12.25 3H13.75V1.5H16.75V3H18.25V6H16.75V7.5H19.75V12H16.75V13.5H18.25V16.5H16.75V18H13.75V16.5H12.25V20H7.75V16.5H6.25V18H3.25V16.5H1.75V13.5H3.25V12H0.25V7.5H3.25V6H1.75V3H3.25V1.5H6.25V3H7.75V0H12.25V3ZM7.75 7.5H6.25V12H7.75V13.5H12.25V12H13.75V7.5H12.25V6H7.75V7.5Z"
        fill="#ffffff"
      />
    </Svg>
  );
}
