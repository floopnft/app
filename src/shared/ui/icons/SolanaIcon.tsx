import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Circle,
  Defs,
  Stop,
  LinearGradient,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    strokeWidth={1.5}
    width={scale(16)}
    height={scale(16)}
    {...props}
  >
    <Circle cx={8} cy={8} r={8} fill="url(#a)" />
    <Path
      d="m9.84 7.443.885.886a.161.161 0 0 1-.114.275H6.638a.161.161 0 0 1-.114-.047L5.64 7.67a.161.161 0 0 1 .114-.275h3.972c.043 0 .084.017.114.047ZM6.524 9.054l-.885.885a.161.161 0 0 0 .114.275h3.973a.161.161 0 0 0 .113-.047l.886-.886a.161.161 0 0 0-.114-.274H6.638a.161.161 0 0 0-.114.047ZM6.524 5.833l-.885.886a.161.161 0 0 0 .114.275h3.973a.161.161 0 0 0 .113-.048l.886-.885a.161.161 0 0 0-.114-.275H6.638a.161.161 0 0 0-.114.047Z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.5}
        y1={13}
        x2={16}
        y2={3.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#4FB2B5" />
        <Stop offset={0.516} stopColor="#748BC9" />
        <Stop offset={1} stopColor="#926BDA" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
