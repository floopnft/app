import { httpObservableFetch } from '@shared/fetcher';
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

export function getRecommendedNfts(query: GetRecommendedNftsQuery) {
  return httpObservableFetch(`nfts/recommended`, {
    query,
  });
}
