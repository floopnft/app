import { httpFetch, httpObservableFetch } from '@shared/fetcher';
import { NftDto } from '@entities/nft/model';

export interface GetNftsQuery {
  ids: string[];
}

export function getNfts(query: GetNftsQuery) {
  return httpObservableFetch<NftDto[]>('nfts', {
    query,
  });
}

export interface GetRecommendedNftsQuery {
  excludeIds?: string[];
  count?: number;
}

export async function getRecommendedNfts(query: GetRecommendedNftsQuery) {
  try {
    const res = await httpFetch<NftDto[]>(`nfts/recommended`, {
      query,
    });
    return res;
  } catch (e) {
    return [];
  }
}
