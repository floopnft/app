import { User } from '@entities/user/model';
import { NftDto } from '@entities/nft/model';
import { fetchUserProfile } from '@screens/ProfileScreen/api';
import { observable } from '@legendapp/state';
import { $lastNftReaction } from '@features/reactions/model';

export type UserProfile = User & { createdNfts: NftDto[]; likedNfts: NftDto[] };

export const { data: $userProfile } = fetchUserProfile();

export const $likedNfts = observable<NftDto[]>([]);
export const $createdNfts = observable<NftDto[]>([]);

export const updateNftStores = (it: UserProfile) => {
  $createdNfts.set(it.createdNfts);
  $likedNfts.set(it.likedNfts);
};
$userProfile.onChange(updateNftStores);

// $lastNftReaction.onChange((reaction) => {});
