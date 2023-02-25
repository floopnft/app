import { httpObservableFetch } from '@shared/fetcher';
import { NftViewsByUser } from '@entities/nft/model';

export interface SaveNftViewCommand {
  nftId: string;
  viewStartedAt: Date;
  viewFinishedAt: Date;
}

export function saveNftView(command: SaveNftViewCommand) {
  return httpObservableFetch<NftViewsByUser>('nft-views', {
    method: 'POST',
    body: JSON.stringify(command),
  });
}

export function clearNftViews() {
  return httpObservableFetch('nft-views/clear', {
    method: 'POST',
  });
}
