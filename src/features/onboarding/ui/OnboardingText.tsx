import Reactions from '@features/reactions/ui/Reactions';
import { Box, Image, Text } from '@shared/ui/primitives';
import { moderateVerticalScale, scale } from '@shared/utils';
import React from 'react';

export interface OnboardingTextProps {
  title: string;
  title2: string;
  hints?: string[];
  img?: number;
  showReactions?: boolean;
}

const OnboardingText: React.FC<OnboardingTextProps> = ({
  title,
  title2,
  hints,
  img,
  showReactions = false,
}) => {
  return (
    <Box flex={1}>
      <Box flex={1} overflow="hidden" borderRadius={20} my={12} mx={4}>
        <Image flex={1} source={img} contentFit="cover" />
      </Box>
      <Box marginBottom={3} flexDirection="row" alignItems="center">
        <Image
          width={scale(20)}
          height={scale(20)}
          borderRadius={4}
          marginRight={1}
          source={require('../../../shared/ui/static/icon.png')}
        />
        <Text fontSize={scale(12)} fontWeight="500">
          floopNFT
        </Text>
      </Box>
      <Text fontSize={scale(18)} fontWeight="500" mb={1}>
        {title}
      </Text>
      <Text
        fontSize={scale(12)}
        lineHeight={24}
        fontWeight="500"
        color="secondaryText"
      >
        {title2}
      </Text>
      {hints && (
        <Box flexDirection="row" mt={3} gap={1}>
          {hints.map((hint, index) => (
            <Box key={index} p={1} backgroundColor="darkGray" borderRadius={4}>
              <Text>{hint}</Text>
            </Box>
          ))}
        </Box>
      )}
      {showReactions && (
        <Box mt={1}>
          <Reactions nftId="onboarding" reactionsByUser={[]} noop />
        </Box>
      )}
    </Box>
  );
};

export default OnboardingText;
