import { httpFetch, httpObservableFetch } from '@shared/fetcher';
import { Nft } from '@entities/nft/model';

export interface GetNftsQuery {
  ids: string[];
}

export function getNfts(query: GetNftsQuery) {
  return httpObservableFetch<Nft[]>('nfts', {
    query,
  });
}

export interface GetRecommendedNftsQuery {
  excludeIds?: string[];
  count?: number;
}

export async function getRecommendedNfts(query: GetRecommendedNftsQuery) {
  try {
    const res = await httpFetch<Nft[]>(`nfts/recommended`, {
      query,
    });
    return res;
  } catch (e) {
    return [];
  }
}
