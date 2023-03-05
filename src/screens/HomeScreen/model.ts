import { $nftFeed } from '@entities/feed/model';
import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { clearNftViews, saveNftView } from '@entities/nft/api/nft-views-api';
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

  // if previous card - track
  if (prevCard && prevCard.id !== card.id) {
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
