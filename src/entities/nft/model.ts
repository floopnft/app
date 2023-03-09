import { ColorArray } from '@shared/ui/color-utils';

export interface NftDto {
  id: string;
  collectionName: string;
  collectionAvatarUrl: string;
  collectionAvatarUploadCareId: string | null;
  title: string;
  imgUrl: string;
  imgUploadCareId: string | null;
  price: string;
  presetId: string | null;
  cardBgColorRgb?: ColorArray;
  screenBgColorRgb?: ColorArray;
  hints: string[];
  createdByUserId: string | null;
  showDuringOnboarding: boolean;
  createdAt: Date;
  updatedAt: Date;
  nftCategoryId: string;
}

export interface NFT {
  id: string;
  collectionName: string;
  collectionAvatarUrl: string;
  collectionAvatarUploadCareId: string | null;
  title: string;
  imgUrl: string;
  imgUploadCareId: string | null;
  cardBgColorRgb?: ColorArray;
  screenBgColorRgb?: ColorArray;
  hints: string[];
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
