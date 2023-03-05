import { NftDto } from '@entities/nft/model';
import { $user, User } from '@entities/user/model';
import { event, observable } from '@legendapp/state';
import { fetchUserProfile } from '@screens/ProfileScreen/api';

export type UserProfile = User & { createdNfts: NftDto[]; likedNfts: NftDto[] };

export const updateUserProfile = event();

export const $userProfile = observable<UserProfile>(null);

export const loadUserProfile = () => {
  if (!$user.peek()) {
    return;
  }
  fetchUserProfile().then((it) => $userProfile.set(it));
};

updateUserProfile.on(() => {
  fetchUserProfile().then((it) => $userProfile.set(it));
});

$user.onChange(() => {
  fetchUserProfile().then((it) => $userProfile.set(it));
});

export const $likedNfts = $userProfile.likedNfts;
export const $createdNfts = $userProfile.createdNfts;
