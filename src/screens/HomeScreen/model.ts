import { saveNftView } from '@entities/nft/api/nft-views-api';
import { $user } from '@entities/user/model';
import { $floops, loadMoreFloops } from '@features/feed/model';
import { onboardingCompleted } from '@features/onboarding/model';
import { ONBOARDING_DATA } from '@features/onboarding/onboarding-data';
import { observable, observe, when } from '@legendapp/state';
import { $isWalletLoaded, $wallet } from '@shared/wallet';
import { FeedItem } from './list';

const LOAD_THRESHOLD = 2;

interface VisibleCard {
  id: string;
  index: number;
  ts: number;
}

export const $feedData = observable<FeedItem[]>([]);

when($isWalletLoaded, () => {
  if (!$wallet.peek()) {
    $feedData.set(ONBOARDING_DATA);
  }
  when($user, (user) => {
    observe(() => {
      const feed = $floops.get();
      $feedData.set(user.onboarded ? feed : [...ONBOARDING_DATA, ...feed]);
    });
  });
});

export const $currentVisibleCard = observable<VisibleCard>(null);

$currentVisibleCard.onChange(({ value: card, getPrevious }) => {
  // no card - no load
  if (!card) {
    return null;
  }

  const prevCard = getPrevious() as VisibleCard | null;

  const isReallySwiped = prevCard && prevCard.id !== card.id;

  if (isReallySwiped) {
    // track view for non onboarding cards
    if (!prevCard.id.startsWith('onboarding')) {
      // console.log('trackNftView', {
      //   nftId: prevCard.id,
      //   d: card.ts - prevCard.ts,
      //   idx: prevCard.index,
      // });

      saveNftView({
        nftId: prevCard.id,
        viewStartedAt: new Date(prevCard.ts),
        viewFinishedAt: new Date(card.ts),
      });

      // clearNftViews(); // Comment this line to hide viewed nfts from feed
    }
    // this is a bit hacky
    if (
      prevCard.id === 'onboarding_wallet' &&
      !card.id.startsWith('onboarding')
    ) {
      onboardingCompleted.fire();
    }
  }

  const user = $user.peek();
  if (!user || !user.onboarded) {
    return card;
  }

  const feed = $feedData.peek();

  if (feed.length - card.index > LOAD_THRESHOLD) {
    return card;
  }

  const excluded = feed
    .slice(card.index - 1)
    .filter((it) => !it.id.startsWith('onboarding'))
    .map((it) => it.id);

  loadMoreFloops(excluded);

  return card;
});
