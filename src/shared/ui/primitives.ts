import { createBox, createText } from '@shopify/restyle';
import Animated from 'react-native-reanimated';
import { Theme } from '../theme';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const AnimatedBox = Animated.createAnimatedComponent(Box);
