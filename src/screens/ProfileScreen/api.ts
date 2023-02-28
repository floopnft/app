import { httpObservableFetch } from '@shared/fetcher';
import { UserProfile } from '@screens/ProfileScreen/model';

export function fetchUserProfile() {
  return httpObservableFetch<UserProfile>('users/me/profile');
}
