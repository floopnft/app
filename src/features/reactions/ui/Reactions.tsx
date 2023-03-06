import React, { startTransition } from 'react';
import Reaction from '@entities/feed/ui/Reaction';
import { Box } from '@shared/ui/primitives';

const reactions = ['💜', '👍', '💩'];

// interface ReactionsProps {
//   onReactionSelected: string
// }

const Reactions = () => {
  const [counter, setCounter] = React.useState([
    Math.round(Math.random() * 10) || 0,
    Math.round(Math.random() * 10) || 0,
    Math.round(Math.random() * 10) || 0,
  ]);
  const [selectedReaction, setSelectedReaction] = React.useState<number | null>(
    null
  );

  const selectReaction = (newReaction: number) => {
    if (newReaction === selectedReaction) {
      setCounter((prev) => [
        ...prev.slice(0, selectedReaction),
        Math.max(0, prev[selectedReaction] - 1),
        ...prev.slice(selectedReaction + 1),
      ]);
      setSelectedReaction(null);
      return;
    }
    if (selectedReaction !== null) {
      setCounter((prev) => [
        ...prev.slice(0, selectedReaction),
        Math.max(0, prev[selectedReaction] - 1),
        ...prev.slice(selectedReaction + 1),
      ]);
    }
    setSelectedReaction(newReaction);
    setCounter((prev) => [
      ...prev.slice(0, newReaction),
      prev[newReaction] + 1,
      ...prev.slice(newReaction + 1),
    ]);
  };

  return (
    <Box flexDirection="row" gap={1}>
      {reactions.map((reaction, index) => (
        <Reaction
          key={reaction}
          kind={reaction}
          counter={counter[index]}
          selected={index === selectedReaction}
          onPress={() => selectReaction(index)}
        />
      ))}
    </Box>
  );
};

export default Reactions;
