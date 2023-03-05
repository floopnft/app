import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { NFT } from '@entities/nft/model';
import { $user } from '@entities/user/model';
import { observable, when } from '@legendapp/state';

export const $nftFeed = observable<NFT[]>([]);
export const $nftFeedLoading = observable(false);

export const loadFirstNFTs = async () => {
  $nftFeedLoading.set(true);
  const feed = await getRecommendedNfts({
    count: 3,
  });
  $nftFeedLoading.set(false);

  $nftFeed.set(feed);
};

when($user, () => loadFirstNFTs());
