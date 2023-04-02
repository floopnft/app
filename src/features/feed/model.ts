import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { Nft } from '@entities/nft/model';
import { $user } from '@entities/user/model';
import { observable, when } from '@legendapp/state';

export const FLOOPS_LOAD_COUNT = 7;

export const $floops = observable<Nft[]>([]);
export const $floopsLoading = observable(false);

export const $currentVisibleFloop = observable<Nft>(null);

export const loadMoreFloops = async (excludeIds?: string[]) => {
  $floopsLoading.set(true);
  const newFloops = await getRecommendedNfts({
    count: FLOOPS_LOAD_COUNT,
    excludeIds,
  });
  $floopsLoading.set(false);

  $floops.set((prev): Nft[] => [...prev, ...newFloops]);
};

// prob won't work in case of user logout
when($user, () => loadMoreFloops());
