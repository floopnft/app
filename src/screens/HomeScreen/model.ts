import { $nftFeed } from '@entities/feed/model';
import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { clearNftViews, saveNftView } from '@entities/nft/api/nft-views-api';
import { observable, observe } from '@legendapp/state';

const LOAD_THRESHOLD = 2;

interface VisibleCard {
  id: string;
  index: number;
  ts: number;
}
// clearNftViews(); // Comment this line to hide viewed nfts from feed

export const $currentVisibleCard = observable<VisibleCard>(null);

observe<VisibleCard>((ev) => {
  const card = $currentVisibleCard.get();
  // no card - no load
  if (!card) {
    return card;
  }

  // if previous card - track
  if (ev.previous) {
    // console.log('trackNftView', {
    //   nftId: ev.previous.id,
    //   d: card.ts - ev.previous.ts,
    //   idx: ev.previous.index,
    // });

    saveNftView({
      nftId: ev.previous.id,
      viewStartedAt: new Date(ev.previous.ts),
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
