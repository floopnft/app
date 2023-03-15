import CardInfo from '@entities/feed/ui/CardInfo';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { TouchableOpacity } from '@shared/ui/touchables';
import { moderateVerticalScale, scale, ucarecdn } from '@shared/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import Camera from '@shared/ui/icons/CameraIcon';
import SolanaIcon from '@shared/ui/icons/SolanaIcon';
import Reactions from '@features/reactions/ui/Reactions';
import { Nft } from '@entities/nft/model';

const linearGradientColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.56)'];

interface CardProps {
  nft: Nft;
}

const NftDetails: React.FC<CardProps> = ({ nft }) => {
  const imgUrl = nft.imgUploadCareId
    ? ucarecdn(nft.imgUploadCareId)
    : nft.imgUrl;
  const avatarUrl = nft.collectionAvatarUploadCareId
    ? ucarecdn(nft.collectionAvatarUploadCareId)
    : nft.collectionAvatarUrl;

  const isFloop = nft.hints.includes('floop') || nft.createdByUserId;

  return (
    <Box flex={1} borderRadius={24} overflow="hidden">
      <Image
        style={sharedStyles.container}
        contentFit={isFloop ? 'cover' : 'contain'}
        source={imgUrl}
        recyclingKey={imgUrl}
      />
      <LinearGradient
        colors={linearGradientColors}
        style={StyleSheet.absoluteFill}
      />
      <Box
        position="absolute"
        bottom={moderateVerticalScale(72)}
        left={scale(20)}
      >
        {nft.presetId && (
          <TouchableOpacity>
            <Box
              style={styles.tryPreset}
              borderRadius={4}
              padding={1}
              marginBottom={2}
              flexDirection="row"
              alignSelf="flex-start"
              alignItems="center"
            >
              <Camera color="white" />
              <Text
                fontSize={scale(12)}
                marginLeft={1}
                fontWeight="500"
                lineHeight={scale(16)}
              >
                Try preset
              </Text>
            </Box>
          </TouchableOpacity>
        )}
        <CardInfo
          avatarUrl={avatarUrl}
          hints={nft.hints}
          title={nft.title}
          username={nft.collectionName}
        />
      </Box>
      <Box
        position="absolute"
        bottom={moderateVerticalScale(20)}
        left={scale(20)}
        flexDirection="row"
      >
        <Reactions nftId={nft.id} reactionsByUser={nft.reactionsByUser} />
      </Box>
      {!isFloop && nft.price && (
        <Box
          position="absolute"
          bottom={moderateVerticalScale(20)}
          right={scale(20)}
          paddingHorizontal={1}
          paddingVertical={1}
          backgroundColor="white"
          borderRadius={4}
        >
          <TouchableOpacity>
            <Box flexDirection="row">
              <SolanaIcon />
              <Text
                color="black"
                marginLeft={1}
                fontWeight="500"
                lineHeight={scale(16)}
                fontSize={scale(14)}
              >
                {nft.price}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  tryPreset: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
  },
});

export default NftDetails;
