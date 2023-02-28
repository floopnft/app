import { httpFetch } from '@shared/fetcher';
import { NftViewsByUser } from '@entities/nft/model';

export interface SaveNftViewCommand {
  nftId: string;
  viewStartedAt: Date;
  viewFinishedAt: Date;
}

export async function saveNftView(command: SaveNftViewCommand) {
  try {
    await httpFetch<NftViewsByUser>('nft-views', {
      method: 'POST',
      body: JSON.stringify(command),
    });
  } catch (e) {
    return;
  }
}

export async function clearNftViews() {
  try {
    return await httpFetch('nft-views/clear', {
      method: 'POST',
    });
  } catch (e) {
    return;
  }
}
