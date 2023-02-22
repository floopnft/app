import Reaction, { ReactionType } from '@entities/feed/ui/Reaction';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {Object.values(ReactionType).map((type) => (
        <Reaction key={type} type={type} />
      ))}
    </SafeAreaView>
  );
};

export default ProfileScreen;
