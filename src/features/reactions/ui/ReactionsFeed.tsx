import Reaction from '@entities/feed/ui/Reaction';
import { observer } from '@legendapp/state/react';
import { AnimatedBox, Box, Text } from '@shared/ui/primitives';
import { scale, SCREEN_HEIGHT } from '@shared/utils';
import React, { useEffect } from 'react';
import {
  Easing,
  interpolate,
  runOnJS,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { reactions } from '../model';

const FLY_OUT_Y = -SCREEN_HEIGHT / 2;

const removeReaction = (id: string) => {
  reactions.set((pr) => pr.filter((r) => id !== r.id));
};

const FlyingReaction = ({ id, type }: any) => {
  const posY = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: posY.value,
        },
      ],
      opacity: interpolate(posY.value, [0, FLY_OUT_Y], [1, 0]),
    };
  });

  useEffect(() => {
    posY.value = withDelay(
      500,
      withTiming(
        FLY_OUT_Y,
        { duration: 1000, easing: Easing.sin },
        (finished) => {
          if (finished) {
            runOnJS(removeReaction)(id);
          }
        }
      )
    );
  }, [id, posY]);

  return (
    <AnimatedBox
      flexDirection="row"
      alignItems="center"
      backgroundColor="white"
      borderRadius={100}
      padding={1}
      entering={SlideInRight}
      position="absolute"
      right={0}
      bottom={0}
      style={style}
    >
      <Text color="black" fontWeight="500" marginRight={1}>
        solana
      </Text>
      <Box width={scale(16)} height={scale(16)}>
        <Reaction type={type} />
      </Box>
    </AnimatedBox>
  );
};

const ReactionsFeed = () => {
  return (
    <Box alignItems="center" gap={1}>
      {Object.values(reactions.get()).map((reaction) => (
        <FlyingReaction
          key={reaction.id}
          id={reaction.id}
          type={reaction.type}
        />
      ))}
    </Box>
  );
};

export default observer(ReactionsFeed);
