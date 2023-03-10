import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    strokeWidth={1.6}
    stroke="currentColor"
    width={scale(20)}
    height={scale(20)}
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.66667 10.6666L2 7.99992M2 7.99992L4.66667 5.33325M2 7.99992H14"
    />
  </Svg>
);

export default SvgComponent;
