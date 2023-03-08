import { event, observable, when } from '@legendapp/state';
import { httpFetch } from '@shared/fetcher';
import { $wallet } from '@shared/wallet';

export interface User {
  id: string;
  walletAddress: string;
  onboarded: boolean;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const $user = observable<User | null>(null);

export const loginUser = async () => {
  const user = await httpFetch<User>('login', {
    method: 'POST',
  });
  $user.set(user);
  return user;
};

when($wallet, () => loginUser());
