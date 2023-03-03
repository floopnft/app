import { NFT } from '@entities/nft/model';

export type MainRoutes = {
  Main: undefined;
  FullScreenNFTDetails: { nft: NFT };
};

export type TabRoutes = {
  Home: undefined;
  Create: undefined;
  Profile: undefined;
};
