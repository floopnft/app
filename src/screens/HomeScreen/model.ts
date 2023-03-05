import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { clearNftViews, saveNftView } from '@entities/nft/api/nft-views-api';
import { $nftFeed } from '@features/feed/model';
import {
  $isUserOnboarded,
  onboardingCompleted,
} from '@features/onboarding/model';
import { observable } from '@legendapp/state';

const LOAD_THRESHOLD = 2;

interface VisibleCard {
  id: string;
  index: number;
  ts: number;
}
// clearNftViews(); // Comment this line to hide viewed nfts from feed

export const $currentVisibleCard = observable<VisibleCard>(null);

$currentVisibleCard.onChange(({ value: card, changes, getPrevious }) => {
  // no card - no load
  if (!card) {
    return card;
  }

  const prevCard = getPrevious() as VisibleCard | null;

  const reallySwipedPrevCard = prevCard && prevCard.id !== card.id;

  if (reallySwipedPrevCard) {
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

      clearNftViews(); // Comment this line to hide viewed nfts from feed
    }
    if (prevCard.id === 'onboarding_wallet') {
      onboardingCompleted.fire();
    }
  }

  // it's a bit hacky actually :(
  if (!$isUserOnboarded.peek()) {
    return;
  }

  const feed = $nftFeed.peek();
  // should we load more?
  if (feed.length - card.index > LOAD_THRESHOLD) {
    return card;
  }

  const excluded = feed.slice(card.index - 1).map((it) => it.id);

  getRecommendedNfts({
    count: 3,
    excludeIds: excluded,
  }).then((nextRecommended) =>
    $nftFeed.set((prev) => [...prev, ...nextRecommended])
  );

  return card;
});
