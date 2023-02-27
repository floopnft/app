import { getRecommendedNfts } from '@entities/nft/api/nft-api';
import { loginUser } from '@entities/user/api/user-login-api';
import { useEffect, useState } from 'react';
import { NftFeed } from '@entities/feed/model';

export const useOnAppStart = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const loadData = async () => {
    await loginUser();
    const recommendedNfts = await getRecommendedNfts({
      count: 3,
    });
    NftFeed.set(recommendedNfts);
  };

  useEffect(() => {
    loadData().finally(() => setIsDataLoaded(true));
  }, []);

  return { isDataLoaded };
};
