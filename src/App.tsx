import {
  FlashList,
  ListRenderItem,
  ListRenderItemInfo,
} from '@shopify/flash-list';
import React, { useCallback } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import tinycolor from 'tinycolor2';
import { normalize } from './shared/utils';

const dimensions = Dimensions.get('screen');

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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<NFT>) => {
    return (
      <View
        style={{
          width: dimensions.width,
          height: dimensions.height - 80,
          backgroundColor: tinycolor(item.bgColor)
            .darken(30)
            .desaturate(30)
            .toHexString(),
          padding: 12,
          paddingTop: insets.top,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: item.bgColor,
            borderRadius: 20,
            padding: 20,
            overflow: 'hidden',
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
            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
            style={{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              // width: '100%',
              // height: '100%',
              position: 'absolute',
            }}
          />
          <View style={{ position: 'absolute', top: 20, left: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <FastImage
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  marginRight: 4,
                }}
                source={{ uri: item.avatarUrl }}
              />
              <Text style={{ color: 'white', fontSize: normalize(12) }}>
                {item.username}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 4, marginBottom: 8 }}>
              {item.hints.map((hint) => (
                <Text
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    borderRadius: 14,
                    borderColor: 'white',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  {hint}
                </Text>
              ))}
            </View>
            <Text style={{ color: 'white', fontSize: 24 }}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      /> */}
      <View style={styles.container}>
        <FlashList
          data={DATA}
          renderItem={renderItem}
          estimatedItemSize={dimensions.height}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <View style={{ height: 80, backgroundColor: 'black' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
