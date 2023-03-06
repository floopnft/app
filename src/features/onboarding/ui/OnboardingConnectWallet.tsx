import { $nftFeedLoading } from '@features/feed/model';
import { observer, Show } from '@legendapp/state/react';
import { Box, Image, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import {
  $wallet,
  initWallet,
  isSaga,
  shortenWalletAddress,
} from '@shared/wallet';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export interface OnboardingConnectWalletProps {
  hints?: string[];
  img?: number;
  imgFit?: 'cover' | 'contain';
}

const OnboardingConnectWallet: React.FC<OnboardingConnectWalletProps> = ({
  hints,
  img,
  imgFit = 'cover',
}) => {
  return (
    <Box flex={1}>
      <Box flex={1} overflow="hidden" borderRadius={20} my={12} mx={4}>
        <Image flex={1} source={img} contentFit={imgFit} />
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
      <Text fontSize={scale(18)} fontWeight="500" mb={2}>
        Almost ready
      </Text>
      <Text
        fontSize={scale(12)}
        lineHeight={24}
        fontWeight="500"
        color="secondaryText"
        marginBottom={6}
      >
        {isSaga
          ? "Connect your existing wallet or just swipe and we'll generate a wallet for you"
          : 'We created a wallet for you, just swipe to start exploring NFTs'}
      </Text>
      {hints && (
        <Box flexDirection="row" gap={1}>
          {hints.map((hint, index) => (
            <Box key={index} p={1} backgroundColor="darkGray" borderRadius={4}>
              <Text>{hint}</Text>
            </Box>
          ))}
        </Box>
      )}
      {isSaga ? (
        <TouchableOpacity
          backgroundColor={$wallet.get() ? 'darkGray' : 'darkBlue'}
          py={4}
          width="100%"
          alignSelf="center"
          alignItems="center"
          borderRadius={12}
          onPress={initWallet}
        >
          <Show
            if={$wallet}
            else={
              <Text fontSize={scale(14)} fontWeight="600">
                Connect wallet
              </Text>
            }
          >
            <Text fontSize={scale(14)} fontWeight="600">
              {shortenWalletAddress($wallet.publicKey.get())}
            </Text>
          </Show>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          backgroundColor={$wallet.get() ? 'darkGray' : 'darkBlue'}
          py={4}
          width="100%"
          alignSelf="center"
          alignItems="center"
          borderRadius={12}
          onPress={initWallet}
        >
          <Show
            if={$wallet}
            else={
              <Text fontSize={scale(14)} fontWeight="600">
                Generate wallet
              </Text>
            }
          >
            {$nftFeedLoading.get() ? (
              <ActivityIndicator />
            ) : (
              <Text fontSize={scale(14)} fontWeight="600">
                {shortenWalletAddress($wallet.publicKey.get())}
              </Text>
            )}
          </Show>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default observer(OnboardingConnectWallet);
