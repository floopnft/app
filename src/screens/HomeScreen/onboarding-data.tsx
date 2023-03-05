import OnboardingConnectWallet from '@features/onboarding/ui/OnboardingConnectWallet';
import OnboardingText from '@features/onboarding/ui/OnboardingText';
import { $shouldShowReactions } from '@features/reactions/model';
import { Box } from '@shared/ui/primitives';
import { CustomFeedItem } from './list';

const dino = require('@shared/ui/static/dino.gif');
const y00t = require('@shared/ui/static/y00t.png');
const bot = require('@shared/ui/static/bot.png');
const nfts = require('@shared/ui/static/nfts.png');

export const ONBOARDING_DATA: CustomFeedItem<any>[] = [
  {
    id: 'onboarding_1',
    Component: ({ visible }) => {
      if (visible) {
        $shouldShowReactions.set(false);
      } else {
        $shouldShowReactions.set(true);
      }

      return (
        <Box flex={1}>
          <OnboardingText
            title="Welcome to Floop"
            title2="Swipe up and explore more NFTs"
            hints={['onboarding', '1/3']}
            img={dino}
          />
        </Box>
      );
    },
  },
  {
    id: 'onboarding_2',
    Component: () => (
      <Box flex={1}>
        <OnboardingText
          title="Personalized feed"
          title2="Use reactions on NFTs and our AI will generate personalized feed for you"
          hints={['onboarding', '2/3']}
          img={y00t}
        />
      </Box>
    ),
  },
  {
    id: 'onboarding_3',
    Component: () => (
      <Box flex={1}>
        <OnboardingText
          title="Create your own NFT"
          title2="Look at the bottom of the app, u can create your own NFTs and post it"
          hints={['onboarding', '3/3']}
          img={bot}
        />
      </Box>
    ),
  },
  {
    id: 'onboarding_wallet',
    Component: ({ visible }) => {
      if (visible) {
        $shouldShowReactions.set(false);
      } else {
        $shouldShowReactions.set(true);
      }

      return (
        <Box flex={1}>
          <OnboardingConnectWallet
            hints={['welcome on board']}
            img={nfts}
            imgFit="contain"
          />
        </Box>
      );
    },
  },
];
