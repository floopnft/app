import Reaction from '@entities/feed/ui/Reaction';
import { observer } from '@legendapp/state/react';
import { AnimatedBox, Box, Text } from '@shared/ui/primitives';
import { normalize } from '@shared/utils';
import React from 'react';
import { SlideInRight } from 'react-native-reanimated';
import { reactions } from '../model';

const ReactionsFeed = () => {
  return (
    <Box alignItems="center" gap={1}>
      {Object.values(reactions.get()).map((reaction) => {
        console.log(reaction);
        return (
          <AnimatedBox
            key={reaction.id}
            flexDirection="row"
            alignItems="center"
            backgroundColor="white"
            borderRadius={100}
            padding={1}
            entering={SlideInRight}
            // exiting={SlideOutRight}
          >
            <Text color="black" fontWeight="500">
              solana
            </Text>
            <Box width={normalize(16)} height={normalize(16)}>
              <Reaction type={reaction.type} />
            </Box>
          </AnimatedBox>
        );
      })}
    </Box>
  );
};

export default observer(ReactionsFeed);
