import { Box, Text } from '@shared/ui/primitives';

interface ReactionProps {
  kind: string;
  counter: number;
  selected: boolean;
}

const Reaction: React.FC<ReactionProps> = ({ kind, counter, selected }) => {
  const simplifiedCounter = counter > 99 ? '99+' : counter.toFixed();
  return (
    <Box
      flexDirection="row"
      borderRadius={4}
      borderWidth={1}
      style={{ borderColor: selected ? 'white' : 'rgba(0,0,0,0.12)' }}
      p={1}
      backgroundColor={selected ? 'white' : 'transparent'}
    >
      <Text>{kind}</Text>
      <Text fontWeight="500" color={selected ? 'black' : 'white'}>
        {simplifiedCounter}
      </Text>
    </Box>
  );
};

export default Reaction;
