import { addReaction } from '@features/reactions/model';
import PlusIcon from '@shared/ui/icons/PlusIcon';
import { AnimatedBox, Box } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  BounceIn,
  BounceOut,
  runOnJS,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import ReactionAnimation, { ReactionType } from './Reaction';

const targetWidth = scale(24 * 4 + 28);

const Reaction = ({ type }: { type: ReactionType }) => {
  const gesture = Gesture.Tap().onStart((ev) => {
    runOnJS(addReaction)({ type, press: { x: ev.absoluteX, y: ev.absoluteY } });
  });

  return (
    <GestureDetector gesture={gesture}>
      <Box width={scale(20)} height={scale(20)}>
        <ReactionAnimation type={type} />
      </Box>
    </GestureDetector>
  );
};

const ReactionToolbox = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const style = useAnimatedStyle(() => {
    if (isOpen) {
      return {
        width: withTiming(targetWidth, { duration: 300 }),
      };
    }
    return {
      width: withDelay(100, withTiming(0, { duration: 300 })),
    };
  }, [isOpen]);

  return (
    <Box
      flexDirection="row"
      backgroundColor="white"
      alignItems="center"
      borderRadius={100}
      padding={2}
    >
      <AnimatedBox
        flexDirection="row"
        alignItems="center"
        gap={2}
        style={style}
      >
        {isOpen && (
          <AnimatedBox
            flexDirection="row"
            alignItems="center"
            gap={3}
            entering={BounceIn.delay(150)}
            exiting={BounceOut.duration(150)}
          >
            {Object.values(ReactionType).map((type) => (
              <Reaction key={type} type={type} />
            ))}
          </AnimatedBox>
        )}
      </AnimatedBox>
      <TouchableOpacity
        onPress={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <PlusIcon width={scale(20)} height={scale(20)} color="black" />
      </TouchableOpacity>
    </Box>
  );
};

export default ReactionToolbox;
