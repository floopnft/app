import { uploadFloop } from '@features/upload-floop/model';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { updateUserProfile } from '@screens/ProfileScreen/model';
import FireOutlineIcon from '@shared/ui/icons/FireOutlineIcon';
import XIcon from '@shared/ui/icons/XIcon';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { TouchableOpacity } from '@shared/ui/touchables';
import { verticalScale } from '@shared/utils';
import Trends from '@src/widgets/trends/ui/Trends';
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
  const trendsSheetRef = useRef<BottomSheet>(null);
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
    setEditImageUri(`file://${takenPhoto.path}`);
  }, [cameraRef]);

  const onCancelEditing = useCallback(() => {
    setEditImageUri(null);
  }, []);

  const onTrendsBottomSheetOpenRequest = useCallback(() => {
    if (!trendsSheetRef.current) return;
    trendsSheetRef.current.expand();
  }, []);

  const onPublish = async () => {
    const floopUpload = await uploadFloop(editImageUri);
    console.log(floopUpload);
    updateUserProfile.fire();
    navigation.navigate('Profile');
    setEditImageUri(null);
  };

  return (
    <Box style={sharedStyles.containerBlackBg}>
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
        <Box height={verticalScale(96)} pb={0} px={0} justifyContent="center">
          {editImageUri ? (
            <EditBottomBar
              onPublish={onPublish}
              onCancelEditing={onCancelEditing}
              onEffectsBottomSheetOpenRequest={onTrendsBottomSheetOpenRequest}
            />
          ) : (
            <CaptureBottomBar
              onPhotoSelect={setEditImageUri}
              onPhotoTake={takePhoto}
              onCameraFlip={onCameraFlip}
              onTrendsBottomSheetOpenRequest={onTrendsBottomSheetOpenRequest}
            />
          )}
        </Box>
      </Box>
      <BottomSheet
        ref={trendsSheetRef}
        enablePanDownToClose
        index={-1}
        snapPoints={['50%']}
        containerStyle={{ position: 'absolute' }}
        backgroundStyle={{ backgroundColor: '#090909' }}
        handleComponent={() => (
          <Box flexDirection="row" pt={2} justifyContent="center">
            <FireOutlineIcon color="white" />
            <Text>Trends</Text>
          </Box>
        )}
      >
        <Box flex={1} p={5}>
          <Trends />
        </Box>
      </BottomSheet>
    </Box>
  );
};

export default CreateScreen;
