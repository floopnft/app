import { Box, Image, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import React from 'react';

export interface OnboardingConnectWalletProps {
  title: string;
  title2: string;
  hints?: string[];
  img?: number;
  imgFit?: 'cover' | 'contain';
}

const OnboardingConnectWallet: React.FC<OnboardingConnectWalletProps> = ({
  title,
  title2,
  hints,
  img,
  imgFit = 'cover',
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
        <Image flex={1} source={img} contentFit={imgFit} />
      </Box>
      <TouchableOpacity
        backgroundColor="darkBlue"
        py={4}
        width="90%"
        alignSelf="center"
        alignItems="center"
        borderRadius={12}
      >
        <Text fontSize={scale(14)} fontWeight="600">
          Connect wallet
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default OnboardingConnectWallet;
