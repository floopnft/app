import { observer, Show } from '@legendapp/state/react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeartOutlineIcon from '@shared/ui/icons/HeartOutlineIcon';
import ViewGridOutlineIcon from '@shared/ui/icons/ViewGridOutlineIcon';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { scale } from '@shared/utils';
import { shortenWalletAddress } from '@shared/wallet';
import { FlashList } from '@shopify/flash-list';
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
import { hslFromArray } from '@shared/ui/color-utils';
import {
  $createdNfts,
  $likedNfts,
  $userProfile,
} from '@screens/ProfileScreen/model';

const Liked = observer(() => {
  return (
    <FlashList
      contentContainerStyle={{ padding: scale(16) }}
      ItemSeparatorComponent={() => <Box height={scale(8)} />}
      data={$likedNfts.get()}
      numColumns={3}
      estimatedItemSize={scale(152)}
      renderItem={({ item }) => {
        return (
          <Box
            style={[
              {
                backgroundColor: hslFromArray(item.bgColor),
              },
            ]}
            width={scale(88)}
            height={scale(152)}
            borderRadius={12}
          >
            <Image
              contentFit="contain"
              style={sharedStyles.container}
              source={item.imgUrl}
            />
          </Box>
        );
      }}
    />
  );
});

const Created = observer(() => (
  <FlashList
    contentContainerStyle={{ padding: scale(16) }}
    ItemSeparatorComponent={() => <Box height={scale(8)} />}
    data={$createdNfts.get()}
    numColumns={3}
    estimatedItemSize={scale(152)}
    renderItem={({ item }) => {
      return (
        <Box
          style={[
            {
              backgroundColor: hslFromArray(item.bgColor),
            },
          ]}
          width={scale(88)}
          height={scale(152)}
          borderRadius={12}
          overflow="hidden"
        >
          <Image
            // contentFit="contain"
            style={sharedStyles.container}
            source={item.imgUrl}
          />
        </Box>
      );
    }}
  />
));

const routes = [
  { key: 'created', title: 'Created' },
  { key: 'liked', title: 'Liked' },
];

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

const renderScene = SceneMap({
  created: Created,
  liked: Liked,
});

const ProfileScreen = () => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = React.useState(0);

  return (
    <View style={[sharedStyles.containerBlackBg, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <Box alignItems="center" justifyContent="center" mb={4}>
        <Box
          width={scale(120)}
          aspectRatio={1}
          backgroundColor="darkGray"
          borderRadius={100}
          mb={5}
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
          <Text fontSize={scale(20)}>
            {$userProfile?.name.get() ??
              shortenWalletAddress($userProfile?.walletAddress.get())}
          </Text>
        </Show>
      </Box>
      <TabView
        renderTabBar={renderTabBar}
        style={{ paddingBottom: bottomTabBarHeight }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
};

export default observer(ProfileScreen);
