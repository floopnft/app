import { Box, Text } from '@shared/ui/primitives';
import { scale } from '@shared/utils';

export interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <Box
      flex={1}
      backgroundColor="brandColor"
      paddingVertical={4}
      alignItems="center"
      justifyContent="center"
      borderRadius={12}
    >
      <Text fontSize={scale(13)} fontWeight="600">
        {title}
      </Text>
    </Box>
  );
};

export default PrimaryButton;
