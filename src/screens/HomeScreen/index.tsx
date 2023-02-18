import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Box, Text } from '@shared/ui/primitives';
import { normalize } from '@shared/utils';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tinycolor from 'tinycolor2';

const dimensions = Dimensions.get('window');

interface NFT {
  title: string;
  avatarUrl: string;
  username: string;
  imgUrl: string;
  hints: string[];
  bgColor: string;
}

const DATA: NFT[] = [
  {
    avatarUrl: 'https://i.imgur.com/bMH6qNc.png',
    username: 'solana_monkey_business',
    title: 'Solana Monkey Business',
    imgUrl: 'https://cdn.solanamonkey.business/gen2/4705.png',
    hints: ['collection', '#4705'],
    bgColor: '#F299AF',
  },
  {
    avatarUrl:
      'https://bafkreidc5co72clgqor54gpugde6tr4otrubjfqanj4vx4ivjwxnhqgaai.ipfs.nftstorage.link',
    username: 'y00ts',
    title: 'y00t',
    imgUrl: 'https://metadata.y00ts.com/y/4035.png',
    hints: ['collection', '#4035'],
    bgColor: '#f2ebd8',
  },
  {
    avatarUrl:
      'https://bafkreicndlrqersl63a7fpk6zzw73lsklj5bwsidk74n4solbcyz2g3viq.ipfs.nftstorage.link/',
    username: 'DeGods',
    title: 'DeGods',
    imgUrl: 'https://metadata.degods.com/g/3324-dead.png',
    hints: ['collection', '#3324'],
    bgColor: '#f6f2f8',
  },
];

const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState(DATA);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<NFT>) => {
    return (
      <Box
        // width={dimensions.width}
        height={dimensions.height - tabBarHeight}
        style={{
          paddingTop: insets.top + normalize(16),
          backgroundColor: tinycolor(item.bgColor)
            .darken(30)
            .desaturate(30)
            .toHexString(),
        }}
        padding={3}
      >
        <Box
          flex={1}
          borderRadius={20}
          padding={5}
          overflow="hidden"
          style={{
            backgroundColor: item.bgColor,
          }}
        >
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
              {item.hints.map((hint) => (
                <Box
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
        </Box>
      </Box>
    );
  }, []);

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={dimensions.height - tabBarHeight}
      // pagingEnabled
      showsVerticalScrollIndicator={false}
      bounces={false}
      decelerationRate="fast"
      snapToAlignment="start"
      snapToInterval={dimensions.height - tabBarHeight}
      onEndReachedThreshold={1}
      onEndReached={() => setItems([...items, ...DATA])}
    />
  );
};

export default HomeScreen;
