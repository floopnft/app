import { User } from '@entities/user/model';
import { httpObservableFetch } from '@shared/fetcher';

export interface PatchUserCommand {
  onboarded?: boolean;
}

export function patchUser(command: PatchUserCommand) {
  return httpObservableFetch<User>('users/me', {
    method: 'PATCH',
    body: JSON.stringify(command),
  });
}
