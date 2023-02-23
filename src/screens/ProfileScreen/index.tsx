import Reaction, { ReactionType } from '@entities/feed/ui/Reaction';
import ReactionToolbox from '@entities/feed/ui/ReactionToolbox';
import PlusIcon from '@shared/ui/icons/PlusIcon';
import { AnimatedBox, Box } from '@shared/ui/primitives';
import { normalize, scale } from '@shared/utils';
import React, { startTransition } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';

const Test = () => {
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
      // backgroundColor="white"
      // borderRadius={100}
      // alignItems="center"
      // padding={1}
    >
      <Box
        flexDirection="row"
        // alignItems="center"
        // gap={2}
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
            {Object.values(ReactionType).map((type, index) => (
              <Box
                key={index}
                width={scale(24)}
                height={scale(24)}
                backgroundColor="debug"
              />
              // <Reaction key={type} type={type} />
            ))}
          </Box>
        )}
      </Box>
      <Pressable
        onPress={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <Box width={scale(24)} height={scale(24)} backgroundColor="debug2" />
      </Pressable>
    </Box>
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {/* <Test /> */}
      <ReactionToolbox />
      {/* {Object.values(ReactionType).map((type) => (
        <Reaction key={type} type={type} />
      ))} */}
    </SafeAreaView>
  );
};

export default ProfileScreen;
