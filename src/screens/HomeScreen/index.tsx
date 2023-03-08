import { observer } from '@legendapp/state/react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  HSLColor,
  hslFromArray,
  reduceLightning,
} from '@shared/ui/color-utils';
import { Box } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { verticalScale } from '@shared/utils';
import { ListRenderItemInfo } from '@shopify/flash-list';
import ViewToken from '@shopify/flash-list/dist/viewability/ViewToken';
import Card from '@src/widgets/feed/ui/Card';
import React, { useCallback, useEffect } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AnimatedFlashList,
  FeedItem,
  getItemType,
  listElementHeight,
  viewabilityConfig,
} from './list';
import { $currentVisibleCard, $feedData } from './model';

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const data = $feedData.get();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<FeedItem>) => {
      if ('Component' in item) {
        return (
          <Box
            height={listElementHeight}
            padding={3}
            style={{
              paddingTop: insets.top,
              paddingBottom: tabBarHeight + verticalScale(12),
            }}
          >
            <item.Component />
          </Box>
        );
      }

      return (
        <Box
          height={listElementHeight}
          padding={3}
          style={{
            paddingTop: insets.top,
            paddingBottom: tabBarHeight + verticalScale(12),
          }}
        >
          <Card
            imgUrl={item.imgUrl}
            bgColor={hslFromArray(item.bgColor)}
            avatarUrl={item.collectionAvatarUrl}
            hints={item.hints}
            title={item.title}
            username={item.collectionName}
          />
        </Box>
      );
    },
    [insets, tabBarHeight]
  );

  const bgColorFromTo = useSharedValue([
    'transparent',
    'transparent',
    'transparent',
  ] as ('transparent' | HSLColor)[]);

  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [-1, 0, 1],
        [
          reduceLightning(bgColorFromTo.value[0]),
          reduceLightning(bgColorFromTo.value[1]),
          reduceLightning(bgColorFromTo.value[2]),
        ]
      ),
    }),
    [bgColorFromTo]
  );

  // sets initial bgColorFromTo after nft loaded
  useEffect(() => {
    if (data.length === 0) return;
    if (bgColorFromTo.value.every((it) => it === 'transparent')) {
      bgColorFromTo.value = ['transparent', data[0].bgColor, data[1].bgColor];
    }
  }, [bgColorFromTo, data]);

  const scrollHandler = useAnimatedScrollHandler(
    (ev) => {
      const idx = Math.floor(ev.contentOffset.y / listElementHeight);
      bgColorFromTo.value = [
        data[idx - 1]?.bgColor || 'transparent',
        data[idx]?.bgColor || 'transparent',
        data[idx + 1]?.bgColor || 'transparent',
      ];
      progress.value = ev.contentOffset.y / listElementHeight - idx;
    },
    [data]
  );

  const onViewableItemsChanged: (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void = ({ viewableItems, changed }) => {
    // new card is visible
    if (viewableItems.length === 1) {
      $currentVisibleCard.set({
        id: viewableItems[0].item.id,
        index: viewableItems[0].index,
        ts: viewableItems[0].timestamp,
      });
    }
  };

  return (
    <>
      <Animated.View style={[sharedStyles.container, animatedStyle]}>
        <AnimatedFlashList
          data={data}
          renderItem={renderItem}
          // keyExtractor={keyExtractor}
          getItemType={getItemType}
          onScroll={scrollHandler}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          estimatedItemSize={listElementHeight}
          showsVerticalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={listElementHeight}
          // onEndReachedThreshold={2}
          // onEndReached={loadNextRecommendedNfts}
        />
      </Animated.View>
    </>
  );
};

export default observer(HomeScreen);
