import { AnimatedBox, Box, Image } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
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

const linearGradientColors = ['rgba(0,0,0,0.35)', 'rgba(0,0,0,0)'];

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
      padding={5}
      overflow="hidden"
      style={[
        {
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      <Image
        contentFit="contain"
        style={sharedStyles.container}
        source={imgUrl}
      />
      <LinearGradient
        colors={linearGradientColors}
        style={StyleSheet.absoluteFill}
      />
      <Box position="absolute" top={20} left={20}>
        <CardInfo {...props} />
      </Box>
    </AnimatedBox>
  );
};

export default Card;
