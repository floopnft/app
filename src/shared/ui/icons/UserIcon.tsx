import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 20 20"
    width={scale(24)}
    height={scale(24)}
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.3333 5.83333C13.3333 6.71739 12.9821 7.56523 12.357 8.19036C11.7319 8.81548 10.8841 9.16667 10 9.16667C9.11594 9.16667 8.2681 8.81548 7.64297 8.19036C7.01785 7.56523 6.66666 6.71739 6.66666 5.83333C6.66666 4.94928 7.01785 4.10143 7.64297 3.47631C8.2681 2.85119 9.11594 2.5 10 2.5C10.8841 2.5 11.7319 2.85119 12.357 3.47631C12.9821 4.10143 13.3333 4.94928 13.3333 5.83333ZM10 11.6667C8.4529 11.6667 6.96917 12.2812 5.87521 13.3752C4.78125 14.4692 4.16666 15.9529 4.16666 17.5H15.8333C15.8333 15.9529 15.2187 14.4692 14.1248 13.3752C13.0308 12.2812 11.5471 11.6667 10 11.6667Z"
    />
  </Svg>
);

export default SvgComponent;
