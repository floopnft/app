import Reaction from '@entities/feed/ui/Reaction';
import { NftReactionsByUser } from '@entities/nft/model';
import { $user } from '@entities/user/model';
import { Box } from '@shared/ui/primitives';
import { EMPTY_ARR } from '@shared/utils';
import React, { useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import {
  ReactionCatalog,
  ReactionKind,
  ReactionKindById,
  saveReaction,
} from '../model';

interface ReactionsProps {
  nftId: string;
  reactionsByUser: NftReactionsByUser[];
  noop?: boolean;
}

const Reactions: React.FC<ReactionsProps> = ({
  nftId,
  reactionsByUser = EMPTY_ARR,
  noop,
}) => {
  const [selectedReaction, setSelectedReaction] =
    React.useState<ReactionKind | null>(null);

  const stats = useMemo(() => {
    setSelectedReaction(null);
    const userId = $user.id.peek();
    const newStats: Record<ReactionKind, number> = {} as any;
    reactionsByUser.forEach((reaction) => {
      const kind = ReactionKindById[reaction.reactionId];
      if (reaction.userId === userId) {
        setSelectedReaction(kind);
        return;
      }
      newStats[kind] = (newStats[kind] || 0) + 1;
    });
    return newStats;
  }, [reactionsByUser]);

  const selectReaction = (newReaction: ReactionKind) => {
    Haptics.selectionAsync();
    setSelectedReaction(newReaction);
    if (noop) return;
    saveReaction(nftId, newReaction);
  };

  return (
    <Box flexDirection="row" gap={1}>
      {Object.entries(ReactionCatalog).map(([type, { symbol }]) => {
        const kind = type as ReactionKind;
        const isSelected = kind === selectedReaction;
        return (
          <Reaction
            key={kind}
            symbol={symbol}
            counter={(stats[kind] || 0) + (isSelected ? 1 : 0)}
            selected={kind === selectedReaction}
            onPress={() => selectReaction(kind)}
          />
        );
      })}
    </Box>
  );
};

export default Reactions;
