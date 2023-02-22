import { addReaction } from '@features/reactions/model';
import PlusIcon from '@shared/ui/icons/PlusIcon';
import { Box } from '@shared/ui/primitives';
import { normalize } from '@shared/utils';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
// import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import ReactionAnimation, { ReactionType } from './Reaction';

// const targetWidth = 32 * 4 + 32;

const Reaction = ({ type }: { type: ReactionType }) => {
  const gesture = Gesture.Tap().onStart((ev) => {
    runOnJS(addReaction)({ type, press: { x: ev.absoluteX, y: ev.absoluteY } });
  });

  return (
    <GestureDetector gesture={gesture}>
      <Box width={normalize(24)} height={normalize(24)}>
        <ReactionAnimation type={type} />
      </Box>
      {/* <Box width={24} height={24} backgroundColor="debug" /> */}
    </GestureDetector>
  );
};

const ReactionToolbox = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const width = useSharedValue(0);

  // const style = useAnimatedStyle(() => {
  //   if (isOpen) {
  //     return {
  //       width: withTiming(targetWidth, { duration: 300 }),
  //     };
  //   }
  //   return {
  //     width: withDelay(300, withTiming(0, { duration: 300 })),
  //   };
  // }, [isOpen]);

  return (
    <Box
      flexDirection="row"
      backgroundColor="white"
      borderRadius={100}
      alignItems="center"
      padding={1}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        gap={2}
        // style={style}
        // height={24}
      >
        {isOpen && (
          <Box
            flexDirection="row"
            alignItems="center"
            gap={2}
            // entering={BounceIn.delay(150)}
            // exiting={BounceOut.duration(150)}
          >
            {Object.values(ReactionType).map((type) => (
              <Reaction key={type} type={type} />
            ))}
          </Box>
        )}
      </Box>
      <TouchableOpacity
        onPress={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <PlusIcon width={normalize(24)} height={normalize(24)} color="black" />
      </TouchableOpacity>
    </Box>
  );
};

export default ReactionToolbox;
