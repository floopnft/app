import { $nftFeed } from '@features/feed/model';
import { $isUserOnboarded } from '@features/onboarding/model';
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
import React, { useCallback, useEffect, useMemo } from 'react';
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
  keyExtractor,
  listElementHeight,
  viewabilityConfig,
} from './list';
import { $currentVisibleCard } from './model';
import { ONBOARDING_DATA } from './onboarding-data';

const VisibilityTracker = observer(
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

const DATA = [
  ...ONBOARDING_DATA,
  {
    bgColor: [166, 82, 50],
    collectionAvatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/cats_on_crack_pfp_1644850873089.png',
    collectionName: 'CETS ON CRECK',
    createdAt: '2023-02-27T17:48:05.774Z',
    createdByUserId: null,
    hints: ['collection', 'PFP'],
    id: '09bd9f84-e5f5-4898-b837-06b463af29b8',
    imgUploadCareId: null,
    imgUrl:
      'https://arweave.net/RbSeYkbGQ3LdPDs6Ij_YzWowppjQhGqy2FcnQHBnBH0?ext=png',
    nftCategoryId: '6adf00c3-d2ae-4235-9db8-ab99fcbad5da',
    reactionsByUser: [],
    showDuringOnboarding: false,
    title: 'Cet #21',
    updatedAt: '2023-03-04T16:38:52.696Z',
  },
  {
    bgColor: [201, 100, 79],
    collectionAvatarUrl:
      'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link',
    collectionName: 'JellyRascals',
    createdAt: '2023-02-27T17:48:05.774Z',
    createdByUserId: null,
    hints: ['collection', 'PFP'],
    id: 'c76f0449-e5cb-4f54-8959-927e822d17e6',
    imgUploadCareId: null,
    imgUrl:
      'https://arweave.net/WiaUHRDCnbVOus_HdsbBnyNTwAPf6Xua1EFOFrwXzzI?ext=png',
    nftCategoryId: '6adf00c3-d2ae-4235-9db8-ab99fcbad5da',
    reactionsByUser: [],
    showDuringOnboarding: false,
    title: 'Jelly Rascals #255',
    updatedAt: '2023-03-04T16:38:52.696Z',
  },
  {
    bgColor: [155, 57, 72],
    collectionAvatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreidgfsdjx4nt4vctch73hcchb3pkiwic2onfw5yr4756adchogk5de.ipfs.nftstorage.link',
    collectionName: 'Okay Bears',
    createdAt: '2023-02-27T17:48:05.774Z',
    createdByUserId: null,
    hints: ['collection', 'PFP'],
    id: '6ec34a7d-7b57-4ea6-b896-817b194c2b2f',
    imgUploadCareId: null,
    imgUrl:
      'https://bafybeibyysgzsc6xbitkclvm3laxw6ns34heyqcynqaxnag7fbiftjxleq.ipfs.nftstorage.link/8019.png',
    nftCategoryId: '6adf00c3-d2ae-4235-9db8-ab99fcbad5da',
    reactionsByUser: [],
    showDuringOnboarding: false,
    title: 'Okay Bear #8020',
    updatedAt: '2023-03-04T16:38:52.696Z',
  },
  // {
  //   bgColor: [280, 30, 96],
  //   collectionAvatarUrl:
  //     'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link',
  //   collectionName: 'DeGods',
  //   createdAt: '2023-02-27T17:48:05.774Z',
  //   createdByUserId: null,
  //   hints: ['collection', 'PFP'],
  //   id: 'bbd2c7fe-4050-42cf-8a49-77793ffa19a6',
  //   imgUploadCareId: null,
  //   imgUrl: 'https://metadata.degods.com/g/3324-dead.png',
  //   nftCategoryId: '6adf00c3-d2ae-4235-9db8-ab99fcbad5da',
  //   reactionsByUser: [],
  //   showDuringOnboarding: true,
  //   title: 'DeGod #3324',
  //   updatedAt: '2023-03-04T16:38:52.696Z',
  // },
  {
    bgColor: [44, 50, 90],
    collectionAvatarUrl:
      'https://bafkreidc5co72clgqor54gpugde6tr4otrubjfqanj4vx4ivjwxnhqgaai.ipfs.nftstorage.link',
    collectionName: 'y00ts',
    createdAt: '2023-02-27T17:48:05.774Z',
    createdByUserId: null,
    hints: ['collection', 'PFP'],
    id: 'c8dd19a6-677f-4520-b72a-d0304090da2b',
    imgUploadCareId: null,
    imgUrl: 'https://metadata.y00ts.com/y/4035.png',
    nftCategoryId: '6adf00c3-d2ae-4235-9db8-ab99fcbad5da',
    reactionsByUser: [],
    showDuringOnboarding: false,
    title: 'y00t #4035',
    updatedAt: '2023-03-04T16:38:52.696Z',
  }
];

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const nftFeedItems = $nftFeed.get();

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

  const data: FeedItem[] = DATA;

  // sets initial bgColorFromTo after nft loaded
  useEffect(() => {
    console.log(data);
    if (data.length === 0) return;
    if (bgColorFromTo.value.every((it) => it === 'transparent')) {
      bgColorFromTo.value = ['transparent', data[0].bgColor, data[1].bgColor];
    }
  }, [bgColorFromTo, data]);

  const scrollHandler = useAnimatedScrollHandler((ev) => {
    const idx = Math.floor(ev.contentOffset.y / listElementHeight);
    bgColorFromTo.value = [
      data[idx - 1]?.bgColor || 'transparent',
      data[idx]?.bgColor || 'transparent',
      data[idx + 1]?.bgColor || 'transparent',
    ];
    progress.value = ev.contentOffset.y / listElementHeight - idx;
  });

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
          // getItemType={getItemType}
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
