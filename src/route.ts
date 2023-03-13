import { Nft } from '@entities/nft/model';

export type MainRoutes = {
  Main: undefined;
  FullScreenNFTDetails: { nft: Nft };
  Publish: { imgUcareId: string };
};

export type TabRoutes = {
  Home: undefined;
  Create: undefined;
  Profile: undefined;
};
