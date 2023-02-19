import Card from '@features/feed/ui/Card';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HSLColor, hslFromArray } from '@shared/ui/color-utils';
import { Box, Text } from '@shared/ui/primitives';
import { normalize } from '@shared/utils';
import {
  FlashList,
  FlashListProps,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
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

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<NFT>>(FlashList);

const HomeScreen = () => {
  const statusBarRef = React.useRef<StatusBar>(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState(DATA);

  const cardOffset =
    Platform.select({
      ios: normalize(16),
      android: StatusBar.currentHeight! + normalize(64),
    }) || 0;

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NFT>) => {
      return (
        <Box
          height={dimensions.height - tabBarHeight}
          style={{
            paddingTop: insets.top + cardOffset,
          }}
          padding={3}
        >
          <Card bgColor={hslFromArray(item.bgColor)}>
            <FastImage
              resizeMode="contain"
              style={{ flex: 1 }}
              source={{
                uri: item.imgUrl,
              }}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0)']}
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
              }}
            />
            <Box position="absolute" top={20} left={20}>
              <Box marginBottom={2} flexDirection="row" alignItems="center">
                <FastImage
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 100,
                    marginRight: 4,
                  }}
                  source={{ uri: item.avatarUrl }}
                />
                <Text fontSize={normalize(12)}>{item.username}</Text>
              </Box>
              <Box flexDirection="row" gap={1} marginBottom={2}>
                {item.hints.map((hint, index) => (
                  <Box
                    key={index}
                    borderWidth={1}
                    borderRadius={14}
                    borderColor="primaryText"
                    paddingHorizontal={2}
                    paddingVertical={1}
                  >
                    <Text>{hint}</Text>
                  </Box>
                ))}
              </Box>
              <Text fontSize={normalize(24)}>{item.title}</Text>
            </Box>
          </Card>
        </Box>
      );
    },
    [cardOffset, insets.top, tabBarHeight]
  );

  const bgColorFromTo = useSharedValue([
    'transparent',
    items[0].bgColor,
    items[1].bgColor,
  ] as ('transparent' | HSLColor)[]);

  const fullscreenCardHeight = dimensions.height - tabBarHeight;

  const progress = useSharedValue(0);

  const reduceLightning = (hsl: HSLColor | 'transparent') => {
    'worklet';
    if (hsl === 'transparent') return hsl;
    const [h, s, l] = hsl;
    const sFix = Math.max(0, s - 40);
    const lFix = Math.max(0, l - 30);
    return `hsl(${h}, ${sFix}%, ${lFix}%)`;
  };

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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (ev) => {
      const idx = Math.floor(ev.contentOffset.y / fullscreenCardHeight);
      bgColorFromTo.value = [
        items[idx - 1]?.bgColor || 'transparent',
        items[idx]?.bgColor || 'transparent',
        items[idx + 1]?.bgColor || 'transparent',
      ];
      progress.value = ev.contentOffset.y / fullscreenCardHeight - idx;
    },
  });

  return (
    <>
      <StatusBar
        ref={statusBarRef}
        backgroundColor="transparent"
        translucent={true}
      />
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <AnimatedFlashList
          onScroll={scrollHandler}
          data={items}
          renderItem={renderItem}
          estimatedItemSize={fullscreenCardHeight}
          showsVerticalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={dimensions.height - tabBarHeight}
          onEndReachedThreshold={1}
          onEndReached={() => setItems([...items, ...DATA])}
        />
      </Animated.View>
    </>
  );
};

export default HomeScreen;
