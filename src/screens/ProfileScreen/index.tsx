import { Text } from '@shared/ui/primitives';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <Text color="black">Profile</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;
