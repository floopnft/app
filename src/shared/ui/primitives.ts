import { createBox, createText } from '@shopify/restyle';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Animated from 'react-native-reanimated';
import { Theme } from '../theme';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

const Image = createBox<Theme, FastImageProps & { children?: React.ReactNode }>(
  FastImage
);

export default Image;

export const AnimatedBox = Animated.createAnimatedComponent(Box);
