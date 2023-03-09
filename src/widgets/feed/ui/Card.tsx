import Reactions from '@features/reactions/ui/Reactions';
import { TRANSPARENT_COLOR } from '@shared/ui/color-utils';
import { AnimatedBox, Box, Image } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { moderateVerticalScale, scale } from '@shared/utils';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
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
      {bgColor === TRANSPARENT_COLOR && (
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
    </AnimatedBox>
  );
};

export default Card;
