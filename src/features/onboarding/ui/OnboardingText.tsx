import { Box, Image, Text } from '@shared/ui/primitives';
import { scale } from '@shared/utils';
import React from 'react';

export interface OnboardingTextProps {
  title: string;
  title2: string;
  hints?: string[];
  img?: number;
}

const OnboardingText: React.FC<OnboardingTextProps> = ({
  title,
  title2,
  hints,
  img,
}) => {
  return (
    <>
      <Box marginBottom={6} flexDirection="row" alignItems="center">
        <Image
          width={scale(32)}
          height={scale(32)}
          borderRadius={100}
          marginRight={1}
          source={require('../../../shared/ui/static/icon.png')}
        />
        <Text fontSize={scale(12)} fontWeight="500">
          floopNFT
        </Text>
      </Box>
      {hints && (
        <Box flexDirection="row" gap={1} marginBottom={2}>
          {hints.map((hint, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius={14}
              borderColor="primaryText"
              paddingHorizontal={2}
              paddingVertical={1}
            >
              <Text>{hint}</Text>
            </Box>
          ))}
        </Box>
      )}
      <Text fontSize={scale(24)} fontWeight="500">
        {title}
      </Text>
      <Text
        fontSize={scale(14)}
        marginTop={2}
        lineHeight={24}
        fontWeight="400"
        color="secondaryText"
      >
        {title2}
      </Text>
      <Box flex={1} overflow="hidden" borderRadius={20} margin={2}>
        <Image flex={1} source={img} contentFit="cover" />
      </Box>
    </>
  );
};

export default OnboardingText;
