import React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

export default function Gauge(props: SvgProps) {
  return (
    <Svg width={303} height={48} viewBox="0 0 303 48" fill="none" {...props}>
      <Rect x={30} y={24} width={3} height={18} fill="#D9D9D9" />
      <Rect x={33} y={21} width={3} height={3} fill="#D9D9D9" />
      <Rect x={33} y={24} width={3} height={18} fill="white" />
      <Rect x={33} y={42} width={3} height={3} fill="#D9D9D9" />
      <Rect x={36} y={20} width={261} height={3} fill="#D9D9D9" />
      <Rect x={36} y={23} width={261} height={20} fill="white" />
      <Rect x={36} y={27} width={3} height={12} fill="#C8A2DA" />
      <Rect x={36} y={43} width={261} height={3} fill="#D9D9D9" />
      <Rect x={297} y={23} width={3} height={3} fill="#D9D9D9" />
      <Rect x={297} y={26} width={3} height={14} fill="white" />
      <Rect x={297} y={40} width={3} height={3} fill="#D9D9D9" />
      <Rect x={300} y={26} width={3} height={14} fill="#D9D9D9" />
      <Rect x={81} y={23} width={9} height={20} fill="white" />
      <Rect x={90} y={23} width={207} height={20} fill="white" />
      <Rect x={135} y={23} width={9} height={20} fill="white" />
      <Rect x={138} y={23} width={3} height={20} fill="#D9D9D9" />
      <Rect x={189} y={23} width={9} height={20} fill="white" />
      <Rect x={192} y={23} width={3} height={20} fill="#D9D9D9" />
      <Rect x={243} y={23} width={9} height={20} fill="white" />
      <Rect x={246} y={23} width={3} height={20} fill="#D9D9D9" />
      <Rect x={84} y={23} width={3} height={20} fill="#D9D9D9" />

      <Path
        d="M30 6H36V9H45V24H36V43.5H12V24H3V9H12V6H18V3H30V6Z"
        fill="white"
      />
      <Path
        d="M15 27H12V37.5H36V27H33V24H42V27H39V46.5H9V27H6V24H15V27ZM12 40.5V43.5H36V40.5H12ZM18.75 35.25H15.75V30H18.75V35.25ZM25.5 35.25H22.5V30H25.5V35.25ZM32.25 35.25H29.25V30H32.25V35.25ZM6 24H3V21H6V24ZM45 24H42V21H45V24ZM3 21H0V12H3V21ZM48 21H45V12H48V21ZM6 12H3V9H6V12ZM45 12H42V9H45V12ZM15 9H6V6H15V9ZM42 9H33V6H42V9ZM18 6H15V3H18V6ZM33 6H30V3H33V6ZM30 3H18V0H30V3Z"
        fill="#260100"
      />
    </Svg>
  );
}
