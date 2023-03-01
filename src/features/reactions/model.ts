import { ReactionCatalog, ReactionType } from '@entities/feed/ui/Reaction';
import { observable } from '@legendapp/state';
import { nanoid } from 'nanoid';
import { upsertNftReaction } from '@entities/nft/api/nft-reactions-api';
import { $currentVisibleCard } from '@screens/HomeScreen/model';
import { fetchUserProfile } from '@screens/ProfileScreen/api';
import { updateNftStores } from '@screens/ProfileScreen/model';

interface UserNftReaction {
  id: string;
  reactionId: string;
  type: ReactionType;
  press: { x: number; y: number };
}

export interface NftReaction {
  nftId: string;
  reactionId: string;
}

export const $reactions = observable<UserNftReaction[]>([]);
export const $lastNftReaction = observable<NftReaction | null>(null);

$lastNftReaction.onChange(async (reaction) => {
  const command = {
    nftId: reaction.nftId,
    reactionId: reaction.reactionId,
  };
  await upsertNftReaction(command);
  const { data: profile } = fetchUserProfile();
  profile.onChange(updateNftStores);
});

export function addReaction(
  setReactionCommand: Omit<UserNftReaction, 'id' | 'reactionId'>
) {
  const reactionId = ReactionCatalog[setReactionCommand.type].id;
  const reaction = {
    id: nanoid(),
    reactionId: reactionId,
    ...setReactionCommand,
  };
  $reactions.push(reaction);
  const card = $currentVisibleCard.get();
  if (!card) {
    return;
  }
  $lastNftReaction.set({
    nftId: card.id,
    reactionId: reactionId,
  });
}
