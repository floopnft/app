import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={scale(16)} height={scale(16)} {...props}>
    <Path
      d="M2.879 4.212a3 3 0 0 0 0 4.243L8 13.576l5.121-5.121A3 3 0 0 0 8.88 4.212L8 5.091l-.879-.879a3 3 0 0 0-4.242 0Z"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
