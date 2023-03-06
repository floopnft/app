import { Box, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import AnimatedReaction, { ReactionType } from './AnimatedReaction';

interface ReactionProps {
  kind: string;
  counter: number;
  selected: boolean;
  onPress: () => void;
}

const Reaction: React.FC<ReactionProps> = ({
  kind,
  counter,
  selected,
  onPress,
}) => {
  const simplifiedCounter = counter > 99 ? '99+' : counter.toFixed();
  return (
    <TouchableOpacity
      flexDirection="row"
      alignItems="center"
      borderRadius={4}
      borderWidth={1}
      style={{ borderColor: selected ? 'white' : 'rgba(255,255,255,0.12)' }}
      px={2}
      py={1}
      backgroundColor={selected ? 'white' : 'transparent'}
      onPress={onPress}
    >
      <Box height={scale(20)} aspectRatio={1}>
        <AnimatedReaction
          type={
            kind === '💜'
              ? ReactionType.HOT
              : kind === '👍'
              ? ReactionType.THUMBS_UP
              : ReactionType.MEH
          }
        />
      </Box>
      <Text
        fontWeight="500"
        marginLeft={1}
        fontSize={scale(14)}
        color={selected ? 'black' : 'white'}
      >
        {simplifiedCounter}
      </Text>
    </TouchableOpacity>
  );
};

export default Reaction;
