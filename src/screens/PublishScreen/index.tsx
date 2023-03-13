import { RouteProp, useRoute } from '@react-navigation/native';
import { Box, Text, Image } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { scale, ucarecdn, ucarecdnPreview } from '@shared/utils';
import { MainRoutes } from '@src/route';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native';
import Chip from '@shared/ui/molecules/Chip';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNft } from '@features/upload-floop/api';

type PublishScreenRouteProp = RouteProp<MainRoutes, 'Publish'>;

const tags = ['Pets', 'Nature'];

const PublishScreen = () => {
  const { params } = useRoute<PublishScreenRouteProp>();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const publish = () => {
    // TODO save preset
    createNft(selectedTags, null, params.imgUcareId);
  };

  return (
    <SafeAreaView
      style={[sharedStyles.containerBlackBg, { paddingHorizontal: scale(20) }]}
    >
      <Box mb={8}>
        <Text fontWeight="600" fontSize={scale(18)}>
          Post a new floop
        </Text>
      </Box>
      <Box flexDirection="row" alignItems="center" mb={8}>
        <Image
          source={ucarecdnPreview(params.imgUcareId)}
          width={scale(72)}
          height={scale(112)}
          contentFit="cover"
          borderRadius={8}
          mr={3}
        />
        <Box width="60%">
          <TextInput
            placeholder="Title"
            placeholderTextColor="#3C3C3C"
            style={{
              color: 'white',
              borderBottomColor: '#373737',
              borderBottomWidth: scale(1),
              fontWeight: '500',
              fontSize: scale(14),
            }}
          />
        </Box>
      </Box>
      <Box>
        <Text fontWeight="600" fontSize={scale(12)}>
          Add tags
        </Text>
        <Box flexDirection="row" gap={1}>
          {tags.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
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
      <Button title="Floop" onPress={publish} />
    </SafeAreaView>
  );
};

export default PublishScreen;
