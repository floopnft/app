import { scale } from '@shared/utils';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    strokeWidth={1.2}
    stroke="currentColor"
    width={scale(20)}
    height={scale(20)}
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.66663 2.66678V6.00011M2.66663 6.00011C3.10919 4.90553 4.29041 3.98872 5.30998 3.39336C6.32954 2.79799 7.51783 2.55772 8.68861 2.71021C9.85938 2.86269 10.9465 3.39931 11.7795 4.23597C12.6126 5.07262 13.1445 6.16202 13.292 7.33345M2.66663 6.00011H5.99996M13.3333 13.3334V10.0001M13.3333 10.0001C12.8901 11.0941 11.7093 12.0101 10.6898 12.605C9.67038 13.1998 8.48245 13.4398 7.31203 13.2874C6.1416 13.1349 5.05476 12.5987 4.22165 11.7626C3.38854 10.9265 2.8562 9.83775 2.70796 8.66678M13.3333 10.0001H9.99996"
    />
  </Svg>
);

export default SvgComponent;
