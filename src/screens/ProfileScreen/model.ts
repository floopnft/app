import { NftDto } from '@entities/nft/model';
import { User } from '@entities/user/model';
import { event, observable } from '@legendapp/state';
import { fetchUserProfile } from '@screens/ProfileScreen/api';

export type UserProfile = User & { createdNfts: NftDto[]; likedNfts: NftDto[] };

export const updateUserProfile = event();

export const $userProfile = observable<UserProfile>(null);

fetchUserProfile().then((it) => $userProfile.set(it));

updateUserProfile.on(() => {
  fetchUserProfile().then((it) => $userProfile.set(it));
});

export const $likedNfts = $userProfile.likedNfts;
export const $createdNfts = $userProfile.createdNfts;
