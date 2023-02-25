import { Box, Text } from '@shared/ui/primitives';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { For, Show, useComputed } from '@legendapp/state/react';
import { getUserProfile } from '@screens/ProfileScreen/api';

const ProfileScreen = () => {
  // based on https://legendapp.com/open-source/state/react-examples/#list-of-messages
  const { data: userProfile, loading, error } = getUserProfile();
  const userName = useComputed(() => userProfile?.get()?.name);
  const likedNfts = useComputed(() => userProfile?.get()?.likedNfts ?? []);

  return (
    <SafeAreaView>
      <Show if={userName} else={<Text color="black">Loading...</Text>}>
        <Box>
          <Text color="black">{userName}</Text>
          <Box>
            <For each={likedNfts}>
              {(nft) => <Text color="black">{nft.title}</Text>}
            </For>
          </Box>
        </Box>
      </Show>
    </SafeAreaView>
  );
};

export default ProfileScreen;
