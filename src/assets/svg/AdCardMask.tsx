import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

interface Props {
  color1?: string;
  color2?: string;
}
function AdCardMask({color1, color2}: Props) {
  return (
    <Svg width={394} height={273} viewBox="0 0 394 273" fill="none">
      <Path
        scaleY={1.16}
        d="M0 8a8 8 0 018-8h162.748c6.546 0 10.325 7.573 6.897 13.15-60.62 98.596 53.448 129.962 1.614 139.711a8.312 8.312 0 01-1.468.139H8a8 8 0 01-8-8V8z"
        fill="url(#paint0_linear_2151_2530)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2151_2530"
          x1={-15.3913}
          y1={7.5}
          x2={216.026}
          y2={41.0442}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={color1} />
          <Stop offset={1} stopColor={color2} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default AdCardMask;
