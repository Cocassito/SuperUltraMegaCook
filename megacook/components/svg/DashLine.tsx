import { Svg, Line } from 'react-native-svg';

export default function DashLine() {
  return (
    <Svg height="5" width="100%">
        <Line x1="0" y1="2.5" x2="100%" y2="2.5" stroke="#000" strokeWidth="5" strokeDasharray="12,6" />
    </Svg>
    );
}