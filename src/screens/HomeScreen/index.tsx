import { $nftFeed } from '@entities/feed/model';
import ReactionToolbox from '@entities/feed/ui/ReactionToolbox';
import { NFT } from '@entities/nft/model';
import OnboardingCard from '@src/widgets/feed/ui/OnboardingCard';
import OnboardingText from '@features/onboarding/ui/OnboardingText';
import ReactionsFeed from '@features/reactions/ui/ReactionsFeed';
import { observer } from '@legendapp/state/react';
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
import ViewToken from '@shopify/flash-list/dist/viewability/ViewToken';
import Card from '@src/widgets/feed/ui/Card';
import React, { useCallback, useEffect } from 'react';
import { ViewabilityConfig } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $currentVisibleCard } from './model';

const listElementHeight = SCREEN_HEIGHT;

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<NFT>>(FlashList);

const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 80,
};

const CardTrackingVisibility = observer(({ nft }: { nft: NFT }) => {
  const isVisible = $currentVisibleCard.get()?.id === nft.id;
  // console.log('isVisible', isVisible, nft.title);

  return (
    <Card
      imgUrl={nft.imgUrl}
      bgColor={hslFromArray(nft.bgColor)}
      avatarUrl={nft.collectionAvatarUrl}
      hints={nft.hints}
      title={nft.title}
      username={nft.collectionName}
    />
  );
});

const OnboardingCardTrackingVisibility = observer(({ nft }: { nft: NFT }) => {
  const isVisible = $currentVisibleCard.get()?.id === nft.id;
  // console.log('isVisible', isVisible, nft.title);

  return (
    <OnboardingCard bgColor={hslFromArray([0, 100, 0])} imgUrl={nft.imgUrl} />
  );
});

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const nftFeedItems = $nftFeed.get();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<NFT>) => (
      <Box
        height={listElementHeight}
        padding={3}
        style={{
          paddingTop: insets.top,
          paddingBottom: tabBarHeight + verticalScale(12),
        }}
      >
        <CardTrackingVisibility nft={item} />
      </Box>
    ),
    [insets, tabBarHeight]
  );

  const renderOnboarding = useCallback(
    ({ item, index }: ListRenderItemInfo<NFT>) => (
      <Box
        height={listElementHeight}
        padding={3}
        style={{
          paddingTop: insets.top,
          paddingBottom: tabBarHeight + verticalScale(12),
        }}
      >
        <OnboardingCardTrackingVisibility nft={item} />
      </Box>
    ),
    [insets, tabBarHeight]
  );

  const bgColorFromTo = useSharedValue([
    'transparent',
    'transparent',
    'transparent',
  ] as ('transparent' | HSLColor)[]);

  // sets initial bgColorFromTo after nft loaded
  useEffect(() => {
    if (nftFeedItems.length === 0) return;
    if (bgColorFromTo.value.every((it) => it === 'transparent')) {
      bgColorFromTo.value = [
        'transparent',
        nftFeedItems[0].bgColor,
        nftFeedItems[1].bgColor,
      ];
    }
  }, [bgColorFromTo, nftFeedItems]);

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

  const onViewableItemsChanged: (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void = ({ viewableItems }) => {
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
        {/* <AnimatedFlashList
          onScroll={scrollHandler}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          data={nftFeedItems}
          renderItem={renderItem}
          estimatedItemSize={listElementHeight}
          showsVerticalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={listElementHeight}
          // onEndReachedThreshold={2}
          // onEndReached={loadNextRecommendedNfts}
        /> */}
        <AnimatedFlashList
          onScroll={scrollHandler}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          data={nftFeedItems}
          renderItem={renderOnboarding}
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
      <Box
        position="absolute"
        bottom={tabBarHeight + verticalScale(24)}
        right={scale(24)}
      >
        <ReactionToolbox />
      </Box>
      <Box
        pointerEvents="none"
        position="absolute"
        bottom={tabBarHeight + scale(72)}
        right={scale(20)}
      >
        <ReactionsFeed />
      </Box>
    </>
  );
};

export default observer(HomeScreen);
