import { Show } from '@legendapp/state/react';
import { $userProfile } from '@screens/ProfileScreen/model';
import HeartOutlineIcon from '@shared/ui/icons/HeartOutlineIcon';
import ViewGridOutlineIcon from '@shared/ui/icons/ViewGridOutlineIcon';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { scale } from '@shared/utils';
import { shortenWalletAddress } from '@shared/wallet';
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
import { CreatedTab, LikedTab } from './tabs';

const routes = [
  { key: 'created', title: 'Created' },
  { key: 'liked', title: 'Liked' },
];

const renderScene = SceneMap({
  created: CreatedTab,
  liked: LikedTab,
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
      marginLeft: 1,
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
  const insets = useSafeAreaInsets();

  const [index, setIndex] = React.useState(0);

  return (
    <View style={[sharedStyles.containerBlackBg, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Box alignItems="center" justifyContent="center" mb={6}>
        <Box
          width={scale(120)}
          aspectRatio={1}
          backgroundColor="darkGray"
          borderRadius={100}
          mb={3}
        >
          {$userProfile?.avatarUrl.get() && (
            <Image
              borderRadius={100}
              contentFit="contain"
              style={sharedStyles.container}
              source={$userProfile?.avatarUrl.get()}
            />
          )}
        </Box>
        <Show
          if={$userProfile}
          else={<Text fontSize={scale(20)}>loading...</Text>}
        >
          <Text fontSize={scale(20)} fontWeight="600">
            {$userProfile?.name.get() ??
              shortenWalletAddress($userProfile?.walletAddress.get())}
          </Text>
        </Show>
      </Box>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

export default ProfileScreen;
