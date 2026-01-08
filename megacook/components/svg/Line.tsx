import { Svg, Line } from 'react-native-svg';

export default function LineSVG() {
  return (
    <Svg height="5" width="100%">
        <Line x1="0" y1="2" x2="100%" y2="2" stroke="#000" strokeWidth="3" />
    </Svg>
    );
}