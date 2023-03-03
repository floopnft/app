import { NFT } from '@entities/nft/model';
import { observer } from '@legendapp/state/react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { hslFromArray } from '@shared/ui/color-utils';
import { Box, Image } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { $createdNfts, $likedNfts } from './model';

const NftItem = ({ item }: { item: NFT }) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  useFocusEffect(
    useCallback(() => {
      setOpacity(1);
    }, [])
  );

  const isHslCorrupted = item.bgColor[2] > 100;

  return (
    <TouchableOpacity
      onPress={() => {
        setOpacity(0);
        navigation.push('NftDetails', { item });
      }}
    >
      <Box
        width={scale(88)}
        height={scale(152)}
        borderRadius={12}
        overflow="hidden"
        opacity={opacity}
      >
        {isHslCorrupted ? (
          <>
            <Image
              blurRadius={24}
              source={item.imgUrl}
              resizeMode="cover"
              style={StyleSheet.absoluteFillObject}
            />
            <Image flex={1} resizeMode="contain" source={item.imgUrl} />
          </>
        ) : (
          <Image
            flex={1}
            style={{ backgroundColor: hslFromArray(item.bgColor) }}
            resizeMode="contain"
            source={item.imgUrl}
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
        return <NftItem item={item} />;
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
        return <NftItem item={item} />;
      }}
    />
  );
});
