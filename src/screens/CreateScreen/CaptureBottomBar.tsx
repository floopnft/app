import PhotoIcon from '@shared/ui/icons/PhotoIcon';
import RefreshIcon from '@shared/ui/icons/RefreshIcon';
import { Box, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import {
  Canvas,
  Circle,
  runTiming,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import React, { useCallback, useRef } from 'react';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import FireOutlineIcon from '@shared/ui/icons/FireOutlineIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale } from '@shared/utils';
import BottomSheet from '@gorhom/bottom-sheet';
import Trends from '@src/widgets/creator/ui/Trends';

interface CaptureBottomBarWidgetProps {
  onPhotoTake: () => void;
  onPhotoSelect: (uri: string) => void;
  onCameraFlip: () => void;
  onTrendsBottomSheetOpenRequest: () => void;
}

const CaptureBottomBar: React.FC<CaptureBottomBarWidgetProps> = ({
  onPhotoTake,
  onPhotoSelect,
  onCameraFlip,
  onTrendsBottomSheetOpenRequest,
}) => {
  const insets = useSafeAreaInsets();
  const r = useValue(26);

  const touchHandler = useTouchHandler({
    onStart: () => {
      runTiming(r, 32, { duration: 100 });
      onPhotoTake();
    },
    onEnd: () => {
      runTiming(r, 26, { duration: 100 });
    },
  });

  const onPhotoSelectPress = useCallback(async () => {
    const res = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
    });
    if (res.canceled) return;
    const asset = res.assets[0];
    if (!asset || !asset.uri) return;

    onPhotoSelect(asset.uri);
  }, [onPhotoSelect]);

  return (
    <Box flex={1} pt={2} justifyContent="space-between">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px={3}
      >
        <TouchableOpacity
          onPress={onPhotoSelectPress}
          backgroundColor="lightGray"
          borderRadius={100}
          padding={2}
        >
          <PhotoIcon color="white" />
        </TouchableOpacity>
        <Canvas style={{ width: 64, height: 64 }} onTouch={touchHandler}>
          <Circle
            cx={32}
            cy={32}
            r={(64 - 4) / 2}
            style="stroke"
            color="white"
            strokeWidth={2}
          />
          <Circle cx={32} cy={32} r={r} color="white" />
        </Canvas>
        <TouchableOpacity
          onPress={onCameraFlip}
          backgroundColor="lightGray"
          borderRadius={100}
          padding={2}
        >
          <RefreshIcon color="white" />
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        backgroundColor="bgGray"
        flexDirection="row"
        justifyContent="center"
        style={{ paddingBottom: insets.bottom }}
        onPress={onTrendsBottomSheetOpenRequest}
      >
        <Box flexDirection="row" pt={2} alignItems="center">
          <FireOutlineIcon color="white" />
          <Text fontSize={scale(14)} marginLeft={1} fontWeight="500">
            Trends
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default CaptureBottomBar;
