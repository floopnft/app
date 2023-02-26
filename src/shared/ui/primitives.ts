import { createBox, createText } from '@shopify/restyle';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import Animated from 'react-native-reanimated';
import { Theme } from '../theme';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const Image = createBox<Theme, ExpoImageProps>(ExpoImage);

export const AnimatedBox = Animated.createAnimatedComponent(Box);
