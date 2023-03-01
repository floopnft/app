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
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $nftFeed, $unviewedNftFeedItems } from '@entities/feed/model';
import { observer } from '@legendapp/state/react';
import { NFT } from '@entities/nft/model';
import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { clearNftViews, saveNftView } from '@entities/nft/api/nft-views-api';
import ViewToken from '@shopify/flash-list/dist/viewability/ViewToken';
import { $currentVisibleCard } from '@screens/HomeScreen/model';

const listElementHeight = SCREEN_HEIGHT;

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<NFT>>(FlashList);

interface ItemViewState {
  id: string;
  viewStartedAt: Date;
}

interface ItemsViewingState {
  current: ItemViewState;
  prevItem?: ItemViewState;
}

const HomeScreen = () => {
  const statusBarRef = React.useRef<StatusBar>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const nftFeedItems = $nftFeed.get();
  const unwatchedNftFeedItems = $unviewedNftFeedItems.get();

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

  const [itemViewingState, setItemViewingState] =
    useState<ItemsViewingState | null>(null);
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

  const markAsViewed = async () => {
    if (!itemViewingState) {
      return;
    }
    if (!itemViewingState.prevItem) {
      return;
    }
    const viewedItemId = itemViewingState.prevItem.id;
    await saveNftView({
      nftId: viewedItemId,
      viewStartedAt: itemViewingState.prevItem.viewStartedAt,
      viewFinishedAt: itemViewingState.current.viewStartedAt,
    });
    await clearNftViews(); // Comment this line to hide viewed nfts from feed
    $unviewedNftFeedItems.set((prev) => {
      const { [viewedItemId]: _, ...rest } = prev;
      return rest;
    });
  };

  useEffect(() => {
    void markAsViewed();
  }, [itemViewingState]);

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
    $nftFeed.set((prev) => {
      return [...prev, ...nextRecommended];
    });
    $unviewedNftFeedItems.set((prev) => ({
      ...prev,
      ...Object.fromEntries(nextRecommended.map((nft) => [nft.id, nft])),
    }));
  };

  const onViewableItemsChanged: (info: {
    viewableItems: ViewToken[];
  }) => void = ({ viewableItems }) => {
    if (viewableItems.length !== 1) {
      return;
    }
    const viewableItem = viewableItems[0];
    const nft = viewableItem.item as NFT;
    $currentVisibleCard.set({
      id: nft.id,
      index: viewableItem.index,
      ts: viewableItem.timestamp,
    });
    setItemViewingState((prev) => {
      return {
        current: {
          id: nft.id,
          viewStartedAt: new Date(),
        },
        ...(prev && { prevItem: prev.current }),
      };
    });
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
          onViewableItemsChanged={onViewableItemsChanged}
          data={nftFeedItems}
          renderItem={renderItem}
          estimatedItemSize={listElementHeight}
          showsVerticalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={listElementHeight}
          onEndReachedThreshold={2}
          onEndReached={loadNextRecommendedNfts}
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
