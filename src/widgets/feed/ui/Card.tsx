import Reactions from '@features/reactions/ui/Reactions';
import { COLOR_TRANSPARENT } from '@shared/ui/color-utils';
import Camera from '@shared/ui/icons/CameraIcon';
import SolanaIcon from '@shared/ui/icons/SolanaIcon';
import { AnimatedBox, Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { moderateVerticalScale, scale } from '@shared/utils';
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
import CardInfo, { CardInfoProps } from '../../../entities/feed/ui/CardInfo';

interface CardProps {
  imgUrl: string;
  bgColor: string;
}

const animatedSensorConfig: SensorConfig = {
  interval: 'auto',
  adjustToInterfaceOrientation: true,
} as SensorConfig;

const linearGradientColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)'];

const Card: React.FC<CardProps & CardInfoProps> = ({
  imgUrl,
  bgColor,
  ...props
}) => {
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
      {bgColor === COLOR_TRANSPARENT && (
        <Image
          style={StyleSheet.absoluteFillObject}
          blurRadius={50}
          source={imgUrl}
          recyclingKey={imgUrl}
        />
      )}
      <Image
        contentFit="contain"
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
        <TouchableOpacity>
          <Box
            style={styles.tryPreset}
            borderRadius={4}
            paddingHorizontal={1}
            paddingVertical={1}
            marginBottom={2}
            flexDirection="row"
            alignSelf="flex-start"
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
        <CardInfo {...props} />
      </Box>
      <Box
        position="absolute"
        bottom={moderateVerticalScale(20)}
        left={scale(20)}
        flexDirection="row"
      >
        <Reactions />
      </Box>
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
              2.1
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </AnimatedBox>
  );
};

const styles = StyleSheet.create({
  tryPreset: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
  },
});

export default Card;
