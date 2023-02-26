import PhotoIcon from '@shared/ui/icons/PhotoIcon';
import RefreshIcon from '@shared/ui/icons/RefreshIcon';
import { Box } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import {
  Canvas,
  Circle,
  runTiming,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import React, { useCallback } from 'react';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

interface CaptureBottomBarWidgetProps {
  onPhotoTake: () => void;
  onPhotoSelect: (uri: string) => void;
  onCameraFlip: () => void;
}

const CaptureBottomBar: React.FC<CaptureBottomBarWidgetProps> = ({
  onPhotoTake,
  onPhotoSelect,
  onCameraFlip,
}) => {
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
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <TouchableOpacity onPress={onPhotoSelectPress}>
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
      <TouchableOpacity onPress={onCameraFlip}>
        <RefreshIcon color="white" />
      </TouchableOpacity>
    </Box>
  );
};

export default CaptureBottomBar;
