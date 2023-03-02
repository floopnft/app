import ArrowLeftIcon from '@shared/ui/icons/ArrowLeftIcon';
import { Box, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import React from 'react';
interface EditBottomBarProps {
  onPublish: () => void;
  onCancelEditing: () => void;
  onEffectsBottomSheetOpenRequest: () => void;
}

const CaptureBottomBar: React.FC<EditBottomBarProps> = ({
  onPublish,
  onCancelEditing,
  onEffectsBottomSheetOpenRequest,
}) => {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <TouchableOpacity onPress={onCancelEditing} width={scale(48)}>
        <ArrowLeftIcon color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onEffectsBottomSheetOpenRequest}
      >
        <Box
          paddingVertical={2}
          paddingHorizontal={2}
          borderRadius={100}
          backgroundColor="darkGray"
        >
          <Text fontWeight="500">Add effects</Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        backgroundColor="white"
        py={1}
        px={2}
        borderRadius={100}
        width={scale(48)}
        alignItems="center"
        onPress={onPublish}
      >
        <Text color="black" fontWeight="500">
          Floop
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default CaptureBottomBar;
