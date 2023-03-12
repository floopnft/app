import ArrowLeftIcon from '@shared/ui/icons/ArrowLeftIcon';
import CheckOutlineIcon from '@shared/ui/icons/CheckOutlineIcon';
import EyeOutlineIcon from '@shared/ui/icons/EyeOutlineIcon';
import XIcon from '@shared/ui/icons/XIcon';
import { Box, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale } from '@shared/utils';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface EditBottomBarProps {
  appliedPreset: string | null;
  isApplyingPreset: boolean;
  onPublish: () => void;
  onPresetCancel: () => void;
  onCancelEditing: () => void;
  onEffectsBottomSheetOpenRequest: () => void;
}

const EditBottomBar: React.FC<EditBottomBarProps> = ({
  isApplyingPreset,
  appliedPreset,
  onPublish,
  onPresetCancel,
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
        {isApplyingPreset && (
          <Box
            flexDirection="row"
            alignItems="center"
            borderWidth={1}
            borderColor="lightGray"
            px={2}
            py={2}
            borderRadius={100}
          >
            <Text
              fontSize={scale(12)}
              lineHeight={scale(20)}
              color="white"
              fontWeight="500"
            >
              Applying preset...
            </Text>
          </Box>
        )}
        {appliedPreset && !isApplyingPreset && (
          <Box
            flexDirection="row"
            alignItems="center"
            backgroundColor="lightGray"
            px={2}
            py={2}
            borderRadius={100}
          >
            <Text
              fontSize={scale(12)}
              lineHeight={scale(20)}
              color="white"
              fontWeight="500"
              mr={1}
            >
              {appliedPreset}
            </Text>
            <TouchableOpacity onPress={onPresetCancel}>
              <XIcon
                width={scale(14)}
                height={scale(14)}
                color="white"
                opacity={0.24}
              />
            </TouchableOpacity>
          </Box>
        )}
        <TouchableOpacity
          onPress={onPublish}
          backgroundColor="lightGray"
          borderRadius={100}
          padding={2}
        >
          <CheckOutlineIcon color="white" />
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        backgroundColor="bgGray"
        flexDirection="row"
        justifyContent="center"
        style={{ paddingBottom: insets.bottom }}
        onPress={onEffectsBottomSheetOpenRequest}
      >
        <Box flexDirection="row" pt={2} alignItems="center">
          <EyeOutlineIcon color="white" />
          <Text fontSize={scale(14)} marginLeft={1} fontWeight="500">
            Presets
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default EditBottomBar;
