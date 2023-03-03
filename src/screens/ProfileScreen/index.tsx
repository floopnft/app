import { Show } from '@legendapp/state/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { $userProfile } from '@screens/ProfileScreen/model';
import { hslFromArray } from '@shared/ui/color-utils';
import HeartOutlineIcon from '@shared/ui/icons/HeartOutlineIcon';
import ViewGridOutlineIcon from '@shared/ui/icons/ViewGridOutlineIcon';
import { Box, Image, Text } from '@shared/ui/primitives';
import { sharedStyles } from '@shared/ui/styles';
import { scale, SCREEN_HEIGHT } from '@shared/utils';
import { shortenWalletAddress } from '@shared/wallet';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint, useVector } from 'react-native-redash';
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

const Stack = createNativeStackNavigator();

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

const NftDetails = ({ route, navigation }: any) => {
  const { item } = route.params;
  const isGestureActive = useSharedValue(false);
  const translation = useVector();

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationY, velocityY }) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, SCREEN_HEIGHT]) ===
        SCREEN_HEIGHT;

      if (snapBack) {
        runOnJS(navigation.goBack)();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, SCREEN_HEIGHT],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
      borderRadius: 12,
      overflow: 'hidden',
    };
  });

  const isHslCorrupted = item.bgColor[2] > 100;

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        {isHslCorrupted ? (
          <>
            <Image
              blurRadius={24}
              source={item.imgUrl}
              contentFit="cover"
              style={StyleSheet.absoluteFillObject}
            />
            <Image
              style={sharedStyles.container}
              contentFit="contain"
              source={{ uri: item.imgUrl }}
            />
          </>
        ) : (
          <Image
            style={[
              sharedStyles.container,
              { backgroundColor: hslFromArray(item.bgColor) },
            ]}
            contentFit="contain"
            source={{ uri: item.imgUrl }}
          />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        presentation: 'transparentModal',
      }}
    >
      <Stack.Screen name="ProfilMain" component={ProfileScreen} />
      <Stack.Screen name="NftDetails" component={NftDetails} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
