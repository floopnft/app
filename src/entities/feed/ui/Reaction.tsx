import { Box, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';

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
      borderRadius={4}
      borderWidth={1}
      style={{ borderColor: selected ? 'white' : 'rgba(255,255,255,0.12)' }}
      p={1}
      backgroundColor={selected ? 'white' : 'transparent'}
      onPress={onPress}
    >
      <Text>{kind}</Text>
      <Text fontWeight="500" color={selected ? 'black' : 'white'}>
        {simplifiedCounter}
      </Text>
    </TouchableOpacity>
  );
};

export default Reaction;
