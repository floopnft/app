import ReactionToolbox from '@entities/feed/ui/ReactionToolbox';
import ReactionsFeed from '@features/reactions/ui/ReactionsFeed';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  HSLColor,
  hslFromArray,
  reduceLightning,
} from '@shared/ui/color-utils';
import { Box } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { scale, SCREEN_HEIGHT, verticalScale } from '@shared/utils';
import {
  FlashList,
  FlashListProps,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import Card from '@src/widgets/feed/ui/Card';
import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $UnwatchedNftFeedItems, $NftFeed } from '@entities/feed/model';
import { observer } from '@legendapp/state/react';
import { NFT } from '@entities/nft/model';
import { getRecommendedNfts } from '@entities/nft/api/nft-api';

const listElementHeight = SCREEN_HEIGHT;

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<NFT>>(FlashList);

const HomeScreen = () => {
  const statusBarRef = React.useRef<StatusBar>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const nftFeedItems = $NftFeed.get();
  const unwatchedNftFeedItems = $UnwatchedNftFeedItems.get();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NFT>) => (
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
    ),
    [insets, tabBarHeight]
  );

  const bgColorFromTo = useSharedValue([
    'transparent',
    nftFeedItems[0].bgColor,
    nftFeedItems[1].bgColor,
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

  const scrollHandler = useAnimatedScrollHandler((ev) => {
    const idx = Math.floor(ev.contentOffset.y / listElementHeight);
    bgColorFromTo.value = [
      nftFeedItems[idx - 1]?.bgColor || 'transparent',
      nftFeedItems[idx]?.bgColor || 'transparent',
      nftFeedItems[idx + 1]?.bgColor || 'transparent',
    ];
    progress.value = ev.contentOffset.y / listElementHeight - idx;
  });

  const loadNextRecommendedNfts = async () => {
    const nextRecommended = await getRecommendedNfts({
      count: 3,
      excludeIds: Object.keys(unwatchedNftFeedItems),
    });
    $NftFeed.set((prev) => {
      return [...prev, ...nextRecommended];
    });
    $UnwatchedNftFeedItems.set((prev) => ({
      ...prev,
      ...Object.fromEntries(nextRecommended.map((nft) => [nft.id, nft])),
    }));
  };

  return (
    <>
      <StatusBar
        ref={statusBarRef}
        backgroundColor="transparent"
        translucent={true}
      />
      <Animated.View style={[sharedStyles.container, animatedStyle]}>
        <AnimatedFlashList
          onScroll={scrollHandler}
          data={nftFeedItems}
          renderItem={renderItem}
          estimatedItemSize={listElementHeight}
          showsVerticalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={listElementHeight}
          onEndReachedThreshold={2}
          onEndReached={() => loadNextRecommendedNfts()}
        />
      </Animated.View>
      <Box
        position="absolute"
        bottom={tabBarHeight + verticalScale(18)}
        right={scale(18)}
      >
        <ReactionToolbox />
      </Box>
      <Box
        pointerEvents="none"
        position="absolute"
        bottom={tabBarHeight + scale(60)}
        right={scale(20)}
      >
        <ReactionsFeed />
      </Box>
    </>
  );
};

export default observer(HomeScreen);
