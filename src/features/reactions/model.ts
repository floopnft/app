import { upsertNftReaction } from '@entities/nft/api/nft-reactions-api';

export const ReactionCatalog = {
  heart: {
    id: 'af960861-4961-4d04-9245-a557413abaee',
    symbol: '💜',
  },
  thumbsUp: {
    id: '3a5c1e8b-7cbb-4e9e-b220-2682862438c7',
    symbol: '👍',
  },
  dislike: {
    id: 'b02ec2b4-7d3d-45e9-adc8-57eabd0d2fe9',
    symbol: '💩',
  },
};

export type ReactionKind = keyof typeof ReactionCatalog;

export const ReactionKindById: Record<string, ReactionKind> = {
  'af960861-4961-4d04-9245-a557413abaee': 'heart',
  '3a5c1e8b-7cbb-4e9e-b220-2682862438c7': 'thumbsUp',
  'b02ec2b4-7d3d-45e9-adc8-57eabd0d2fe9': 'dislike',
};

export function saveReaction(nftId: string, reactionKind: ReactionKind) {
  const reactionId = ReactionCatalog[reactionKind].id;
  upsertNftReaction({ nftId, reactionId });
}
