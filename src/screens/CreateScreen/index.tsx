import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import XIcon from '@shared/ui/icons/XIcon';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { TouchableOpacity } from '@shared/ui/touchables';
import { verticalScale } from '@shared/utils';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import CaptureBottomBar from './CaptureBottomBar';
import EditBottomBar from './EditBottomBar';

type ActiveCamera = 'front' | 'back';
interface CameraWidgetProps {
  activeCamera: ActiveCamera;
  cameraRef: React.RefObject<Camera>;
  onClose: () => void;
}

const CameraWidget: React.FC<CameraWidgetProps> = ({
  activeCamera = 'back',
  cameraRef,
  onClose,
}) => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices[activeCamera];

  if (device == null) return null;

  return (
    <Box flex={1}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
      />
      <TouchableOpacity onPress={onClose} p={4} flexDirection="row">
        <XIcon color="white" />
      </TouchableOpacity>
    </Box>
  );
};

const CreateScreen = () => {
  const cameraRef = useRef<Camera>(null);
  const effectsSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  const [activeCamera, setActiveCamera] = useState<ActiveCamera>('back');
  const [editImageUri, setEditImageUri] = useState<string | null>(null);

  const onCameraFlip = useCallback(() => {
    if (activeCamera === 'back') {
      setActiveCamera('front');
    } else {
      setActiveCamera('back');
    }
  }, [activeCamera]);

  const takePhoto = useCallback(async () => {
    if (!cameraRef.current) return;
    const takenPhoto = await cameraRef.current.takePhoto();
    console.log(takenPhoto);
    setEditImageUri(`file://${takenPhoto.path}`);
  }, [cameraRef]);

  const onCancelEditing = useCallback(() => {
    setEditImageUri(null);
  }, []);

  const onEffectsBottomSheetOpenRequest = useCallback(() => {
    if (!effectsSheetRef.current) return;
    effectsSheetRef.current.expand();
  }, []);

  return (
    <SafeAreaView style={sharedStyles.containerBlackBg}>
      <StatusBar style="light" />
      <Box flex={1} backgroundColor="black">
        <Box flex={1} borderRadius={16} overflow="hidden">
          {editImageUri ? (
            <Image source={editImageUri} flex={1} />
          ) : (
            <CameraWidget
              activeCamera={activeCamera}
              cameraRef={cameraRef}
              onClose={navigation.goBack}
            />
          )}
        </Box>
        <Box height={verticalScale(64)} py={2} px={4} justifyContent="center">
          {editImageUri ? (
            <EditBottomBar
              onCancelEditing={onCancelEditing}
              onEffectsBottomSheetOpenRequest={onEffectsBottomSheetOpenRequest}
            />
          ) : (
            <CaptureBottomBar
              onPhotoSelect={setEditImageUri}
              onPhotoTake={takePhoto}
              onCameraFlip={onCameraFlip}
            />
          )}
        </Box>
      </Box>
      <BottomSheet
        ref={effectsSheetRef}
        index={-1}
        snapPoints={['50%']}
        enablePanDownToClose
        backgroundStyle={sharedStyles.blackBg}
        handleIndicatorStyle={sharedStyles.whiteBg}
      >
        <Box flex={1}>
          <Text>shit</Text>
        </Box>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CreateScreen;
