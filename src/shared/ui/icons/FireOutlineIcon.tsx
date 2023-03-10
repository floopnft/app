import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={scale(14)} height={scale(14)} fill="none" {...props}>
    <Path
      d="M10.3 10.883a4.667 4.667 0 0 1-6.6-6.6s.383.967 1.55 1.55c0-1.166.292-2.916 1.742-4.083 1.175 1.167 2.394 1.62 3.307 2.533a4.653 4.653 0 0 1 1.368 3.3 4.652 4.652 0 0 1-1.367 3.3Z"
      stroke="currentColor"
      strokeWidth={1.167}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.763 9.404a1.743 1.743 0 0 1-.513-1.237m3.365.673a1.75 1.75 0 0 0-.783-2.213"
      stroke="currentColor"
      strokeWidth={1.167}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
