import { patchUser } from '@entities/user/api/user-api';
import { $user, loginUser } from '@entities/user/model';
import { computed, event } from '@legendapp/state';

export const onboardingCompleted = event();

export const $isUserOnboarded = computed(() => {
  const user = $user.get();
  if (!user) {
    return false;
  }
  return user.onboarded;
});

onboardingCompleted.on(() => {
  patchUser({ onboarded: true });
  loginUser();
});
