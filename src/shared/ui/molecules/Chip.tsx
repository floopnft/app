import { scale } from '@shared/utils';
import { COLOR_TRANSPARENT } from '../color-utils';
import { Box, Text } from '../primitives';

interface ChipProps {
  title: string;
  selected?: boolean;
}

const Chip: React.FC<ChipProps> = ({ title, selected }) => {
  return (
    <Box
      borderWidth={1}
      borderRadius={4}
      px={2}
      py={1}
      style={{
        borderColor: selected ? COLOR_TRANSPARENT : 'rgba(255,255,255,0.12)',
        backgroundColor: selected
          ? 'rgba(255,255,255,0.32)'
          : COLOR_TRANSPARENT,
      }}
    >
      <Text
        fontSize={scale(12)}
        lineHeight={scale(16)}
        color="white"
        fontWeight="500"
      >
        {title}
      </Text>
    </Box>
  );
};

export default Chip;
