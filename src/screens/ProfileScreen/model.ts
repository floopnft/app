import { User } from '@entities/user/model';
import { NftDto } from '@entities/nft/model';

export type UserProfile = User & { createdNfts: NftDto[]; likedNfts: NftDto[] };
