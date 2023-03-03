import { Box, Image, Text } from '@shared/ui/primitives';
import { scale } from '@shared/utils';
import React from 'react';

export interface OnboardingInfoProps {
  hints?: string[];
  title?: string;
}

const OnboardingText: React.FC<OnboardingInfoProps> = ({ hints, title }) => {
  return (
    <>
      <Box marginBottom={6} flexDirection="row" alignItems="center">
        <Image
          width={scale(32)}
          height={scale(32)}
          borderRadius={100}
          marginRight={1}
          source={require('../../../shared/ui/onboarding/FloopIcon.png')}
        />
        <Text fontSize={scale(12)} fontWeight="500">
          floopNFT
        </Text>
      </Box>
      <Box flexDirection="row" gap={1} marginBottom={2}>
        <Box
          borderWidth={1}
          borderRadius={14}
          borderColor="primaryText"
          paddingHorizontal={2}
          paddingVertical={1}
        >
          <Text>welcome on board</Text>
        </Box>
      </Box>
      <Text fontSize={scale(24)} fontWeight="500">
        Explore & Create NFT
      </Text>
      <Text fontSize={scale(14)} marginTop={2} lineHeight={24} fontWeight="500">
        Connect your wallet or just swipe up and do it later in profile section
      </Text>
    </>
  );
};

export default OnboardingText;
