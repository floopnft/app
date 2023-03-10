import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={scale(14)} height={scale(14)} fill="none" {...props}>
    <Path
      d="M8.75 7a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Z"
      stroke="currentColor"
      strokeWidth={1.167}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.434 7a5.836 5.836 0 0 1 11.132 0A5.836 5.836 0 0 1 1.434 7Z"
      stroke="currentColor"
      strokeWidth={1.167}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
