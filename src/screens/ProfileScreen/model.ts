import { User } from '@entities/user/model';
import { Nft } from '@entities/nft/model';

export type UserProfile = User & { createdNfts: Nft[]; likedNfts: Nft[] };
