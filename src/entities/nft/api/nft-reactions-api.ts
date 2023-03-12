import { httpFetch } from '@shared/fetcher';
import { NftReactionsByUser } from '@entities/nft/model';

export interface UpsertNftReactionCommand {
  nftId: string;
  reactionId: string;
}

export async function upsertNftReaction(command: UpsertNftReactionCommand) {
  return httpFetch<NftReactionsByUser>('nft-reactions', {
    method: 'POST',
    body: JSON.stringify(command),
  });
}
