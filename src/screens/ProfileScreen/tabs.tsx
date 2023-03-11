import { NFT } from '@entities/nft/model';
import { observer } from '@legendapp/state/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { optionalRgbFromArray } from '@shared/ui/color-utils';
import { Box, Image } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale, ucarecdnPreview, ucareId } from '@shared/utils';
import { FlashList } from '@shopify/flash-list';
import { MainRoutes } from '@src/route';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { $createdNfts, $likedNfts } from './model';

const NftItem = ({ nft }: { nft: NFT }) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainRoutes>>();
  const [opacity, setOpacity] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setOpacity(1);
    }, [])
  );

  return (
    <TouchableOpacity
      onPress={() => {
        setOpacity(0);
        navigation.push('FullScreenNFTDetails', { nft });
      }}
    >
      <Box
        width={scale(88)}
        height={scale(152)}
        borderRadius={12}
        overflow="hidden"
        opacity={opacity}
      >
        {nft.cardBgColorRgb ? (
          <>
            <Image
              blurRadius={24}
              source={ucarecdnPreview(ucareId(nft.imgUrl))}
              contentFit="cover"
              style={StyleSheet.absoluteFillObject}
            />
            <Image
              flex={1}
              contentFit="contain"
              source={ucarecdnPreview(ucareId(nft.imgUrl))}
            />
          </>
        ) : (
          <Image
            flex={1}
            style={{
              backgroundColor: optionalRgbFromArray(nft.cardBgColorRgb),
            }}
            contentFit="contain"
            source={nft.imgUrl}
          />
        )}
      </Box>
    </TouchableOpacity>
  );
};

export const LikedTab = observer(() => {
  return (
    <FlashList
      contentContainerStyle={{ padding: scale(16) }}
      ItemSeparatorComponent={() => <Box height={scale(8)} />}
      data={$likedNfts.get()}
      numColumns={3}
      estimatedItemSize={scale(152)}
      renderItem={({ item }) => {
        return <NftItem nft={item} />;
      }}
    />
  );
});

export const CreatedTab = observer(() => {
  return (
    <FlashList
      contentContainerStyle={{ padding: scale(16) }}
      ItemSeparatorComponent={() => <Box height={scale(8)} />}
      data={$createdNfts.get()}
      numColumns={3}
      estimatedItemSize={scale(152)}
      renderItem={({ item }) => {
        return <NftItem nft={item} />;
      }}
    />
  );
});
