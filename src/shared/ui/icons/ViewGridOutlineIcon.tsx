import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={scale(16)} height={scale(16)} {...props}>
    <Path
      d="M3.167 4A1.333 1.333 0 0 1 4.5 2.667h1.333A1.333 1.333 0 0 1 7.167 4v1.333a1.333 1.333 0 0 1-1.334 1.334H4.5a1.333 1.333 0 0 1-1.333-1.334V4Zm6.666 0a1.333 1.333 0 0 1 1.334-1.333H12.5A1.333 1.333 0 0 1 13.833 4v1.333A1.334 1.334 0 0 1 12.5 6.667h-1.333a1.333 1.333 0 0 1-1.334-1.334V4Zm-6.666 6.667A1.333 1.333 0 0 1 4.5 9.333h1.333a1.333 1.333 0 0 1 1.334 1.334V12a1.333 1.333 0 0 1-1.334 1.333H4.5A1.334 1.334 0 0 1 3.167 12v-1.333Zm6.666 0a1.333 1.333 0 0 1 1.334-1.334H12.5a1.333 1.333 0 0 1 1.333 1.334V12a1.333 1.333 0 0 1-1.333 1.333h-1.333A1.334 1.334 0 0 1 9.833 12v-1.333Z"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
