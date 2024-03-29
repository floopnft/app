import React from 'react';
import { Nft } from '@entities/nft/model';
import { SCREEN_HEIGHT } from '@shared/utils';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import Animated from 'react-native-reanimated';
import { ViewabilityConfig } from 'react-native';
import { observer } from '@legendapp/state/react';
import { $currentVisibleCard } from './model';
import { ColorArray } from '@shared/ui/color-utils';

export type CustomFeedItem<T> = {
  id: string;
  screenBgColorRgb?: ColorArray;
  Component: React.FC<T & { visible: boolean }>;
};

export type FeedItem = Nft | CustomFeedItem<any>;

export const listElementHeight = SCREEN_HEIGHT;

export const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<FeedItem>>(FlashList);

export const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 80,
};

export const keyExtractor = (item: FeedItem) => item.id;
export const getItemType: FlashListProps<FeedItem>['getItemType'] = (
  item: FeedItem
) => {
  if ('Component' in item) {
    return 'custom_component_' + item.id;
  }
  return 0;
};

export const VisibilityTracker = observer(
  //@ts-ignore
  ({ item, children }: { item: FeedItem; children: React.ReactNode }) => {
    const isVisible = $currentVisibleCard.get()?.id === item.id;

    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // @ts-ignore
        return React.cloneElement(child, { visible: isVisible });
      }
      return child;
    });
  }
);
