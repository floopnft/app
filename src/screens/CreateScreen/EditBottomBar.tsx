import ArrowLeftIcon from '@shared/ui/icons/ArrowLeftIcon';
import EyeOutlineIcon from '@shared/ui/icons/EyeOutlineIcon';
import { Box, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} pt={4} justifyContent="space-between">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
      >
        <TouchableOpacity
          onPress={onCancelEditing}
          backgroundColor="lightGray"
          borderRadius={100}
          padding={2}
        >
          <ArrowLeftIcon color="white" />
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
      <TouchableOpacity
        backgroundColor="bgGray"
        flexDirection="row"
        justifyContent="center"
        style={{ height: insets.bottom + scale(24) }}
        onPress={onEffectsBottomSheetOpenRequest}
      >
        <Box flexDirection="row" pt={2}>
          <EyeOutlineIcon color="white" />
          <Text fontSize={scale(14)} marginLeft={1} fontWeight="500">
            Presets
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default CaptureBottomBar;
