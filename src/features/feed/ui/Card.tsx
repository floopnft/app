import { AnimatedBox } from '@shared/ui/primitives';
import React from 'react';
import {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface CardProps extends React.PropsWithChildren<{}> {
  bgColor: string;
}

const animatedSensorConfig = { adjustToInterfaceOrientation: true };

const Card: React.FC<CardProps> = ({ bgColor, children }) => {
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
      borderRadius={20}
      padding={5}
      overflow="hidden"
      style={[
        {
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      {children}
    </AnimatedBox>
  );
};

export default Card;
