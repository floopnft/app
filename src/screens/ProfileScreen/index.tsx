import { useComputed } from '@legendapp/state/react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { getUserProfile } from '@screens/ProfileScreen/api';
import HeartOutlineIcon from '@shared/ui/icons/HeartOutlineIcon';
import ViewGridOutlineIcon from '@shared/ui/icons/ViewGridOutlineIcon';
import { Box, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { scale } from '@shared/utils';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

const Created = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;

const Liked = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const routes = [
  { key: 'created', title: 'Created' },
  { key: 'liked', title: 'Liked' },
];

const renderScene = SceneMap({
  created: Created,
  liked: Liked,
});

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<(typeof routes)[number]>;
  }
) => (
  <TabBar
    {...props}
    style={{ backgroundColor: 'black' }}
    indicatorStyle={{ backgroundColor: 'white' }}
    tabStyle={{ flexDirection: 'row' }}
    labelStyle={{
      fontSize: scale(12),
      fontWeight: '600',
      textTransform: 'none',
    }}
    renderIcon={({ route, focused, color }) => {
      switch (route.key) {
        case 'created':
          return <ViewGridOutlineIcon color={color} />;
        case 'liked':
          return <HeartOutlineIcon color={color} />;
      }
    }}
  />
);

const ProfileScreen = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  // based on https://legendapp.com/open-source/state/react-examples/#list-of-messages
  const { data: userProfile, loading, error } = getUserProfile();
  const userName = useComputed(() => userProfile?.get()?.name);
  const likedNfts = useComputed(() => userProfile?.get()?.likedNfts ?? []);

  const [index, setIndex] = React.useState(0);

  return (
    <View style={[sharedStyles.containerBlackBg, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Box alignItems="center" justifyContent="center" mb={8}>
        <Box
          width={scale(120)}
          aspectRatio={1}
          backgroundColor="darkGray"
          borderRadius={100}
          mb={5}
        />
        <Text fontSize={scale(20)}>wallet public key</Text>
      </Box>
      <TabView
        renderTabBar={renderTabBar}
        style={{ paddingBottom: bottomTabBarHeight }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
      {/* <Show if={userName} else={<Text color="black">Loading...</Text>}>
        <Box>
          <Text color="black">{userName}</Text>
          <Box>
            <For each={likedNfts}>
              {(nft) => <Text color="black">{nft.title}</Text>}
            </For>
          </Box>
        </Box>
      </Show> */}
    </View>
  );
};

export default ProfileScreen;
