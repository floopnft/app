import { createNft } from '@features/upload-floop/api';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { updateUserProfile } from '@screens/ProfileScreen/model';
import ArrowLeftIcon from '@shared/ui/icons/ArrowLeftIcon';
import Chip from '@shared/ui/molecules/Chip';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale, ucarecdnPreview } from '@shared/utils';
import { MainRoutes } from '@src/route';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PublishScreenRouteProp = RouteProp<MainRoutes, 'Publish'>;

const tags = [
  'Fun',
  'Pets',
  'Lego',
  'Cosmic',
  'Art',
  'Kawaii',
  'Fractal',
  'Pixel',
  'Comic',
  'Cartoon',
];

const PublishScreen = () => {
  const navigation = useNavigation();

  const { params } = useRoute<PublishScreenRouteProp>();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const publish = async () => {
    setIsLoading(true);
    try {
      await createNft(selectedTags, params.presetId, params.imgUcareId);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      updateUserProfile.fire();
      navigation.navigate('Profile');
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[sharedStyles.containerBlackBg, { paddingHorizontal: scale(20) }]}
    >
      <Box flexDirection="row" mt={4}>
        <TouchableOpacity
          onPress={navigation.goBack}
          backgroundColor="lightGray"
          borderRadius={100}
          padding={2}
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
      </Box>
      <Box mt={3}>
        <Text fontWeight="600" fontSize={scale(20)}>
          Post a new floop
        </Text>
      </Box>
      <Box my={4} height={1} backgroundColor="lightGray" width="100%" />
      <Box flexDirection="row" alignItems="center">
        <Image
          source={ucarecdnPreview(params.imgUcareId)}
          width={scale(72)}
          height={scale(112)}
          contentFit="cover"
          borderRadius={8}
          mr={3}
        />
        <Box width="60%">
          <Text
            fontSize={scale(12)}
            fontWeight="500"
            mb={1}
            color="secondaryText"
          >
            Floop name
          </Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#3C3C3C"
            style={{
              color: 'white',
              borderBottomColor: '#373737',
              borderBottomWidth: scale(1),
              fontWeight: '500',
              fontSize: scale(16),
            }}
          />
        </Box>
      </Box>
      <Box my={4} height={1} backgroundColor="lightGray" width="100%" />
      <Box>
        <Text fontWeight="600" fontSize={scale(12)}>
          Add tags
        </Text>
        <Box flexDirection="row" gap={1} mt={2} flexWrap="wrap">
          {tags.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                onPress={() => {
                  if (selected) {
                    return setSelectedTags((prev) =>
                      prev.filter((it) => it !== tag)
                    );
                  }
                  return setSelectedTags((prev) => [...prev, tag]);
                }}
              >
                <Chip key={tag} title={tag} selected={selected} />
              </TouchableOpacity>
            );
          })}
        </Box>
      </Box>
      <Box my={4} height={1} backgroundColor="lightGray" width="100%" />
      <TouchableOpacity
        onPress={isLoading ? null : publish}
        backgroundColor="darkBlue"
        borderRadius={12}
        py={4}
        alignItems="center"
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text fontSize={scale(14)} lineHeight={scale(16)} fontWeight="500">
            Floop it
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PublishScreen;
