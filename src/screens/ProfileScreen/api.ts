import { UserProfile } from '@screens/ProfileScreen/model';
import { httpFetch } from '@shared/fetcher';

export function fetchUserProfile() {
  return httpFetch<UserProfile>('users/me/profile');
}
