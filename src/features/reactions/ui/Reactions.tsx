import Reaction from '@entities/feed/ui/Reaction';
import { Box } from '@shared/ui/primitives';

const reactions = ['💜', '👍', '💩'];

const Reactions = () => {
  return (
    <Box flexDirection="row" gap={1}>
      {reactions.map((reaction, index) => (
        <Reaction
          key={reaction}
          kind={reaction}
          counter={Math.random() * 100}
          selected={Math.random() > 0.5}
        />
      ))}
    </Box>
  );
};

export default Reactions;
