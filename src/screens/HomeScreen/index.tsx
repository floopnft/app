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
import React, { useCallback, useState } from 'react';
import { StatusBar } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NFT {
  title: string;
  avatarUrl: string;
  username: string;
  imgUrl: string;
  hints: string[];
  bgColor: HSLColor;
}

const DATA: NFT[] = [
  {
    avatarUrl: 'https://i.imgur.com/bMH6qNc.png',
    username: 'Solana Monkey Business',
    title: 'SMB #4705',
    imgUrl: 'https://cdn.solanamonkey.business/gen2/4705.png',
    hints: ['collection', 'PFPs'],
    bgColor: [345, 77, 77],
  },
  {
    avatarUrl:
      'https://bafkreidc5co72clgqor54gpugde6tr4otrubjfqanj4vx4ivjwxnhqgaai.ipfs.nftstorage.link',
    username: 'y00ts',
    title: 'y00t #4035',
    imgUrl: 'https://metadata.y00ts.com/y/4035.png',
    hints: ['collection', 'PFPs'],
    bgColor: [44, 50, 90],
  },
  {
    avatarUrl:
      'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link/',
    username: 'DeGods',
    title: 'DeGod #3324',
    imgUrl: 'https://metadata.degods.com/g/3324-dead.png',
    hints: ['collection', 'PFPs'],
    bgColor: [280, 30, 96],
  },
  {
    avatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreidgfsdjx4nt4vctch73hcchb3pkiwic2onfw5yr4756adchogk5de.ipfs.nftstorage.link/',
    username: 'Okay Bears',
    title: 'Okay Bear #8020',
    imgUrl:
      'https://bafybeibyysgzsc6xbitkclvm3laxw6ns34heyqcynqaxnag7fbiftjxleq.ipfs.nftstorage.link/8019.png',
    hints: ['collection', 'PFPs'],
    bgColor: [155, 57, 72],
  },
  {
    avatarUrl:
      'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link/',
    username: 'JellyRascals',
    title: 'Jelly Rascals #255',
    imgUrl:
      'https://arweave.net/WiaUHRDCnbVOus_HdsbBnyNTwAPf6Xua1EFOFrwXzzI?ext=png',
    hints: ['collection', 'PFPs'],
    bgColor: [201, 100, 79],
  },
  {
    avatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/cats_on_crack_pfp_1644850873089.png',
    username: 'CETS ON CRECK',
    title: 'Cet #21',
    imgUrl:
      'https://arweave.net/RbSeYkbGQ3LdPDs6Ij_YzWowppjQhGqy2FcnQHBnBH0?ext=png',
    hints: ['collection', 'PFPs'],
    bgColor: [166, 82, 50],
  },
  {
    avatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihwrpyr52wax3i5drzi5pg4v2wrgylpwi54im7qb7nzz7tpdsmmzm.ipfs.nftstorage.link/',
    username: 'LILY',
    title: 'LILY #9164',
    imgUrl:
      'https://bafybeickfm4lwzlark6sudll6dbs6ktwl2qbrjrcitl5f6ok6ldcsaqa4e.ipfs.nftstorage.link/8177.png?ext=png',
    hints: ['collection', 'PFPs'],
    bgColor: [41, 100, 78],
  },
  {
    avatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/duelbots_pfp_1671410776687.png',
    username: 'DUELBOTS',
    title: 'DUELBOTS #1769',
    imgUrl:
      'https://arweave.net/uynkiG5MJ6wOe_8GmEnRBAPi6lkCnKNwM9Sd04Yx6xI?ext=png',
    hints: ['collection', 'PFPs'],
    bgColor: [62, 54, 49],
  },
  {
    avatarUrl:
      'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreiatsxp4ygj4muopasqisvjpvuhuvdk734zldbhvkx74hfnhik6mja.ipfs.nftstorage.link',
    username: 'Transdimensional Fox Federation',
    title: 'Fox #3614',
    imgUrl: 'https://famousfoxes.com/tff/3614.png',
    hints: ['collection', 'PFPs'],
    bgColor: [265, 88, 74],
  },
];

const listElementHeight = SCREEN_HEIGHT;

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<NFT>>(FlashList);

const HomeScreen = () => {
  const statusBarRef = React.useRef<StatusBar>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState(DATA);

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
          avatarUrl={item.avatarUrl}
          hints={item.hints}
          title={item.title}
          username={item.username}
        />
      </Box>
    ),
    [insets, tabBarHeight]
  );

  const bgColorFromTo = useSharedValue([
    'transparent',
    items[0].bgColor,
    items[1].bgColor,
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
      items[idx - 1]?.bgColor || 'transparent',
      items[idx]?.bgColor || 'transparent',
      items[idx + 1]?.bgColor || 'transparent',
    ];
    progress.value = ev.contentOffset.y / listElementHeight - idx;
  });

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
          data={items}
          renderItem={renderItem}
          estimatedItemSize={listElementHeight}
          showsVerticalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={listElementHeight}
          onEndReachedThreshold={1}
          onEndReached={() => setItems([...items, ...DATA])}
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

export default HomeScreen;
