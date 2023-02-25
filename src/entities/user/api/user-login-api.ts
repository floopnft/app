import { httpObservableFetch } from '@shared/fetcher';

export function loginUser() {
  return httpObservableFetch('login', {
    method: 'POST',
  });
}
