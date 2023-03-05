import { $nftFeedLoading } from '@features/feed/model';
import { Show } from '@legendapp/state/react';
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
        Almost ready
      </Text>
      <Text
        fontSize={scale(14)}
        marginTop={2}
        lineHeight={24}
        fontWeight="400"
        color="secondaryText"
      >
        {isSaga
          ? "Connect your existing wallet or just swipe and we'll generate a wallet for you"
          : 'We created a wallet for you, just swipe to start exploring NFTs'}
      </Text>
      <Box flex={1} overflow="hidden" borderRadius={20} margin={2}>
        <Image flex={1} source={img} contentFit={imgFit} />
      </Box>
      {isSaga ? (
        <TouchableOpacity
          backgroundColor="darkBlue"
          py={4}
          width="90%"
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
          backgroundColor="darkBlue"
          py={4}
          width="90%"
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
    </>
  );
};

export default OnboardingConnectWallet;
