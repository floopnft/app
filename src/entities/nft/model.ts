export interface Nft {
  id: string;
  collectionName: string;
  collectionAvatarUrl: string;
  title: string;
  imgUrl: string;
  bgColor: number[];
  hints: string[];
  createdByUserId: string | null;
  showDuringOnboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
  nftCategoryId: string;
}

export interface NftViewsByUser {
  id: string;
  nftId: string;
  userId: string;
  viewStartedAt: Date;
  viewFinishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NftReactionsByUser {
  id: string;
  nftId: string;
  userId: string;
  reactionId: string;
  createdAt: Date;
  updatedAt: Date;
}
