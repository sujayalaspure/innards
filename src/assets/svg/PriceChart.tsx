import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

function PriceChart({color = '#3DBD72'}: Props) {
  return (
    <Svg width={'100%'} height={34} viewBox="0 0 333 34" fill="none">
      <Path
        d="M15.7 11.936C11.645-9.73 7.59 25.481 1 33h331C171.822 25.48 165.74-5.618 138.874 11.936c-26.865 17.554-40.55 20.57-58.799-4.511-11.718-16.107-21.621 2.339-28.386 9.028-4.055 4.01-9.124 16.547-18.755-9.027-8.893-23.615-12.165 31.592-17.234 4.51z"
        fill={color}
        fillOpacity={0.25}
        stroke={color}
        strokeOpacity={0.5}
        strokeWidth={0.5}
      />
    </Svg>
  );
}

export default PriceChart;
