import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={scale(20)}
    height={scale(20)}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M3.333 8.667 6 11.333l6.667-6.666"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
