import { Svg, Line } from 'react-native-svg';
import { View } from 'react-native';

type LineSVGProps = {
  strokeWidth?: number;
  vertical?: boolean;
  paddingHorizontal?: number;
};

export default function LineSVG({ strokeWidth = 3, vertical = false, paddingHorizontal = 0 }: LineSVGProps) {
  if (vertical) {
    return (
      <View style={{ paddingHorizontal }}>
        <Svg height="100%" width="5">
          <Line x1="2" y1="0" x2="2" y2="100%" stroke="#000" strokeWidth={strokeWidth} />
        </Svg>
      </View>
    );
  }
  
  return (
    <Svg height="5" width="100%">
        <Line x1="0" y1="2" x2="100%" y2="2" stroke="#000" strokeWidth={strokeWidth} />
    </Svg>
    );
}