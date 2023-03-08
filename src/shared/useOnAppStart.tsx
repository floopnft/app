import { $user } from '@entities/user/model';
import { event, when } from '@legendapp/state';
import { $feedData } from '@screens/HomeScreen/model';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { loadWallet } from './wallet';

export const navigationReady = event();

export const useOnAppStart = () => {
  const init = async () => {
    const wallet = await loadWallet();
    if (wallet) {
      await when($user);
      await when($feedData);
    }

    await when(navigationReady);
  };

  useEffect(() => {
    init().finally(() => SplashScreen.hideAsync());
  }, []);
};
