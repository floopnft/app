import { Theme } from '@shared/theme';
import { createBox } from '@shopify/restyle';
import React from 'react';
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler';

const BaseTouchableOpacity = createBox<
  Theme,
  React.ComponentProps<typeof GHTouchableOpacity>
>(GHTouchableOpacity);

export const TouchableOpacity = (
  props: React.ComponentProps<typeof BaseTouchableOpacity>
) => <BaseTouchableOpacity activeOpacity={0.5} {...props} />;
