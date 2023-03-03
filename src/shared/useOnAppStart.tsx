import { $nftFeed } from '@entities/feed/model';
import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { loginUser } from '@entities/user/api/user-login-api';
import { event, when } from '@legendapp/state';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export const navigationReady = event();

export const useOnAppStart = () => {
  const loadData = async () => {
    await loginUser();
    const recommendedNfts = await getRecommendedNfts({
      count: 3,
    });
    $nftFeed.set(recommendedNfts);
    
    await when(navigationReady);
  };

  useEffect(() => {
    loadData().finally(() => SplashScreen.hideAsync());
  }, []);
};
