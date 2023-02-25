import { httpObservableFetch } from '@shared/fetcher';
import { NftReactionsByUser } from '@entities/nft/model';

export interface UpsertNftReactionCommand {
  nftId: string;
  reactionId: string;
}

export function upsertNftReaction(command: UpsertNftReactionCommand) {
  return httpObservableFetch<NftReactionsByUser>('nft-reactions', {
    method: 'POST',
    body: JSON.stringify(command),
  });
}
