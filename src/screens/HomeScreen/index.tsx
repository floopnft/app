import ReactionToolbox from '@entities/feed/ui/ReactionToolbox';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  HSLColor,
  hslFromArray,
  reduceLightning,
} from '@shared/ui/color-utils';
import { Box } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { normalize } from '@shared/utils';
import {
  FlashList,
  FlashListProps,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import Card from '@src/widgets/feed/ui/Card';
import React, { useCallback, useState } from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const dimensions = Dimensions.get('window');

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
    username: 'solana_monkey_business',
    title: 'Solana Monkey Business',
    imgUrl: 'https://cdn.solanamonkey.business/gen2/4705.png',
    hints: ['collection', '#4705'],
    bgColor: [345, 77, 77],
  },
  {
    avatarUrl:
      'https://bafkreidc5co72clgqor54gpugde6tr4otrubjfqanj4vx4ivjwxnhqgaai.ipfs.nftstorage.link',
    username: 'y00ts',
    title: 'y00t',
    imgUrl: 'https://metadata.y00ts.com/y/4035.png',
    hints: ['collection', '#4035'],
    bgColor: [44, 50, 90],
  },
  {
    avatarUrl:
      'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link/',
    username: 'DeGods',
    title: 'DeGods',
    imgUrl: 'https://metadata.degods.com/g/3324-dead.png',
    hints: ['collection', '#3324'],
    bgColor: [280, 30, 96],
  },
];

const cardOffset =
  Platform.select({
    ios: normalize(16),
    android: StatusBar.currentHeight! + normalize(64),
  }) || 0;

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<NFT>>(FlashList);

const HomeScreen = () => {
  const statusBarRef = React.useRef<StatusBar>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState(DATA);

  const listElementHeight = dimensions.height - tabBarHeight;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NFT>) => {
      return (
        <Box
          height={listElementHeight}
          padding={3}
          style={{
            paddingTop: insets.top + cardOffset,
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
      );
    },
    [insets.top, listElementHeight]
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
          snapToInterval={dimensions.height - tabBarHeight}
          onEndReachedThreshold={1}
          onEndReached={() => setItems([...items, ...DATA])}
        />
        <Box
          position="absolute"
          bottom={tabBarHeight + normalize(20)}
          right={normalize(20)}
        >
          <ReactionToolbox />
        </Box>
      </Animated.View>
    </>
  );
};

export default HomeScreen;
