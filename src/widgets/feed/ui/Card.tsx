import { Nft } from '@entities/nft/model';
import Reactions from '@features/reactions/ui/Reactions';
import {
  COLOR_TRANSPARENT,
  optionalRgbFromArray,
} from '@shared/ui/color-utils';
import Camera from '@shared/ui/icons/CameraIcon';
import SolanaIcon from '@shared/ui/icons/SolanaIcon';
import { AnimatedBox, Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { moderateVerticalScale, scale, ucarecdn } from '@shared/utils';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  SensorConfig,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import CardInfo from '../../../entities/feed/ui/CardInfo';

interface CardProps {
  nft: Nft;
}

const animatedSensorConfig: SensorConfig = {
  interval: 'auto',
  adjustToInterfaceOrientation: true,
} as SensorConfig;

const linearGradientColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.56)'];

const Card: React.FC<CardProps> = ({ nft }) => {
  const animatedSensor = useAnimatedSensor(
    SensorType.ROTATION,
    animatedSensorConfig
  );

  const style = useAnimatedStyle(() => {
    const pitch = animatedSensor.sensor.value.pitch;
    const roll = animatedSensor.sensor.value.roll;
    return {
      transform: [
        { translateX: withSpring(roll * 10) },
        { translateY: withSpring(pitch * 10) },
      ],
    };
  });

  const bgColor = optionalRgbFromArray(nft.cardBgColorRgb);

  const imgUrl = nft.imgUploadCareId
    ? ucarecdn(nft.imgUploadCareId)
    : nft.imgUrl;
  const avatarUrl = nft.collectionAvatarUploadCareId
    ? ucarecdn(nft.collectionAvatarUploadCareId)
    : nft.collectionAvatarUrl;

  const isFloop = nft.hints.includes('floop') || nft.createdByUserId;

  return (
    <AnimatedBox
      flex={1}
      borderRadius={24}
      padding={0}
      overflow="hidden"
      style={[
        {
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      <Image
        contentFit={isFloop ? 'cover' : 'contain'}
        style={sharedStyles.container}
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
              paddingHorizontal={1}
              paddingVertical={1}
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
    </AnimatedBox>
  );
};

const styles = StyleSheet.create({
  tryPreset: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
  },
});

export default Card;
