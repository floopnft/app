import { observer } from '@legendapp/state/react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  OptionalColorArray,
  optionalRgbFromArray,
  COLOR_TRANSPARENT,
} from '@shared/ui/color-utils';
import { Box } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { ucarecdn, verticalScale } from '@shared/utils';
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

      const imgUrl = item.imgUploadCareId
        ? ucarecdn(item.imgUploadCareId)
        : item.imgUrl;

      const avatarUrl = item.collectionAvatarUploadCareId
        ? ucarecdn(item.collectionAvatarUploadCareId)
        : item.collectionAvatarUrl;

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
            nftId={item.id}
            reactionsByUser={item.reactionsByUser}
            imgUrl={imgUrl}
            bgColor={optionalRgbFromArray(item.cardBgColorRgb)}
            avatarUrl={avatarUrl}
            hints={item.hints}
            title={item.title}
            username={item.collectionName}
          />
        </Box>
      );
    },
    [insets, tabBarHeight]
  );

  const screenBgColorFromTo = useSharedValue([
    COLOR_TRANSPARENT,
    COLOR_TRANSPARENT,
    COLOR_TRANSPARENT,
  ] as OptionalColorArray[]);

  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [-1, 0, 1],
        [
          optionalRgbFromArray(screenBgColorFromTo.value[0]),
          optionalRgbFromArray(screenBgColorFromTo.value[1]),
          optionalRgbFromArray(screenBgColorFromTo.value[2]),
        ]
      ),
    }),
    [screenBgColorFromTo]
  );

  // sets initial bgColorFromTo after nft loaded
  useEffect(() => {
    if (data.length === 0) return;
    if (screenBgColorFromTo.value.every((it) => it === COLOR_TRANSPARENT)) {
      screenBgColorFromTo.value = [
        COLOR_TRANSPARENT,
        data[0].screenBgColorRgb || COLOR_TRANSPARENT,
        data[1].screenBgColorRgb || COLOR_TRANSPARENT,
      ];
    }
  }, [screenBgColorFromTo, data]);

  const scrollHandler = useAnimatedScrollHandler(
    (ev) => {
      const idx = Math.floor(ev.contentOffset.y / listElementHeight);
      screenBgColorFromTo.value = [
        data[idx - 1]?.screenBgColorRgb || COLOR_TRANSPARENT,
        data[idx]?.screenBgColorRgb || COLOR_TRANSPARENT,
        data[idx + 1]?.screenBgColorRgb || COLOR_TRANSPARENT,
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
          disableIntervalMomentum
          snapToInterval={listElementHeight}
          // onEndReachedThreshold={2}
          // onEndReached={loadNextRecommendedNfts}
        />
      </Animated.View>
    </>
  );
};

export default observer(HomeScreen);
