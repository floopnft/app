import { httpFetch, httpObservableFetch } from '@shared/fetcher';
import { User } from '@entities/user/model';

export async function loginUser() {
  try {
    return await httpFetch<User>('login', {
      method: 'POST',
    });
  } catch (e) {
    return null;
  }
}
