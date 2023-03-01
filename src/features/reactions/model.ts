import { ReactionCatalog, ReactionType } from '@entities/feed/ui/Reaction';
import { observable } from '@legendapp/state';
import { nanoid } from 'nanoid';
import { upsertNftReaction } from '@entities/nft/api/nft-reactions-api';
import { $currentVisibleCard } from '@screens/HomeScreen/model';

interface UserNftReaction {
  id: string;
  reactionId: string;
  type: ReactionType;
  press: { x: number; y: number };
}

export const $reactions = observable<UserNftReaction[]>([]);
export const $selectedReaction = observable<string | null>(null);

$selectedReaction.onChange((reaction) => {
  const card = $currentVisibleCard.get();
  if (!card) {
    return;
  }
  const command = {
    nftId: card.id,
    reactionId: reaction,
  };
  console.log(command);

  upsertNftReaction(command);
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
  $selectedReaction.set(reaction.reactionId);
}
