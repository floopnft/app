import { applyAiEffect } from '@features/image-effects/api';
import { createNft, uploadImage } from '@features/upload-floop/api';
import { uploadFloop } from '@features/upload-floop/model';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { updateUserProfile } from '@screens/ProfileScreen/model';
import XIcon from '@shared/ui/icons/XIcon';
import { Box, Image } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { TouchableOpacity } from '@shared/ui/touchables';
import { getFilenameFromUrl, ucarecdn, verticalScale } from '@shared/utils';
import Presets from '@src/widgets/creator/ui/Presets';
import Trends from '@src/widgets/creator/ui/Trends';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  return (
    <Box flex={1}>
      {device && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          photo
        />
      )}
      <TouchableOpacity onPress={onClose} p={4} flexDirection="row">
        <XIcon color="white" />
      </TouchableOpacity>
    </Box>
  );
};

const CreateScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const cameraRef = useRef<Camera>(null);
  const trendsSheetRef = useRef<BottomSheet>(null);
  const presetsSheetRef = useRef<BottomSheet>(null);

  const [activeCamera, setActiveCamera] = useState<ActiveCamera>('back');
  const [originalImageUri, setOriginalImageUri] = useState<string | null>(null);
  const [editedImageUcareId, setEditedImageUcareId] = useState<string | null>(
    null
  );

  const isEditingImage = originalImageUri || editedImageUcareId;

  const [presetId, setPresetId] = useState<string | null>(null);
  const [isApplyingPreset, setIsApplyingPreset] = useState(false);

  const onCameraFlip = useCallback(() => {
    if (activeCamera === 'back') {
      setActiveCamera('front');
    } else {
      setActiveCamera('back');
    }
  }, [activeCamera]);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const takenPhoto = await cameraRef.current.takePhoto();
    setOriginalImageUri(`file://${takenPhoto.path}`);
  };

  const onPresetCancel = () => {
    setEditedImageUcareId(null);
    setIsApplyingPreset(false);
    setPresetId(null);
  };

  const onCancelEditing = () => {
    if (editedImageUcareId) {
      onPresetCancel();
      return;
    }
    setOriginalImageUri(null);
  };

  const onTrendsBottomSheetOpenRequest = () => {
    if (!trendsSheetRef.current) return;
    trendsSheetRef.current.expand();
  };

  const onPresetsBottomSheetOpenRequest = () => {
    if (!presetsSheetRef.current) return;
    presetsSheetRef.current.expand();
  };

  const onPublish = async () => {
    if (editedImageUcareId) {
      await createNft([], presetId, editedImageUcareId);
      updateUserProfile.fire();
      setOriginalImageUri(null);
      setEditedImageUcareId(null);
      setPresetId(null);
      navigation.navigate('Profile');
      return;
    }
    await uploadFloop(originalImageUri);
    updateUserProfile.fire();
    setOriginalImageUri(null);
    setEditedImageUcareId(null);
    setPresetId(null);
    navigation.navigate('Profile');
  };

  const onPresetApply = async (presetId: string) => {
    trendsSheetRef.current?.close();
    presetsSheetRef.current?.close();
    setPresetId(presetId);
    setIsApplyingPreset(true);
    try {
      const { file: ucareId } = await uploadImage({
        name: getFilenameFromUrl(originalImageUri),
        type: 'image/jpeg',
        uri: originalImageUri,
      });
      const withEffect = await applyAiEffect({
        presetId,
        imageUploadCareId: ucareId,
      });
      setEditedImageUcareId(withEffect.imageUploadCareId);
    } finally {
      setIsApplyingPreset(false);
    }
  };

  return (
    <Box style={[sharedStyles.containerBlackBg, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Box flex={1} backgroundColor="black" px={3}>
        <Box flex={1} borderRadius={20} overflow="hidden">
          {isEditingImage ? (
            <Image
              flex={1}
              source={
                editedImageUcareId
                  ? ucarecdn(editedImageUcareId)
                  : originalImageUri
              }
              transition={700}
            />
          ) : (
            <CameraWidget
              activeCamera={activeCamera}
              cameraRef={cameraRef}
              onClose={navigation.goBack}
            />
          )}
        </Box>
        <Box height={verticalScale(96)} mx={-3} justifyContent="center">
          {isEditingImage ? (
            <EditBottomBar
              appliedPreset={
                presetId
                  ? presetId.charAt(0).toUpperCase() + presetId.slice(1)
                  : null
              }
              isApplyingPreset={isApplyingPreset}
              onPublish={onPublish}
              onPresetCancel={() => setPresetId(null)}
              onCancelEditing={onCancelEditing}
              onEffectsBottomSheetOpenRequest={onPresetsBottomSheetOpenRequest}
            />
          ) : (
            <CaptureBottomBar
              onPhotoSelect={setOriginalImageUri}
              onPhotoTake={takePhoto}
              onCameraFlip={onCameraFlip}
              onTrendsBottomSheetOpenRequest={onTrendsBottomSheetOpenRequest}
            />
          )}
        </Box>
      </Box>
      <Trends ref={trendsSheetRef} />
      <Presets ref={presetsSheetRef} onPresetApply={onPresetApply} />
    </Box>
  );
};

export default CreateScreen;
