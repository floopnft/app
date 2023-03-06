import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateScreen from '@screens/CreateScreen';
import FullScreenNFTDetails from '@screens/FullScreenNFTDetails';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import HomeIcon from '@shared/ui/icons/HomeIcon';
import PlusCircleIcon from '@shared/ui/icons/PlusCircleIcon';
import UserIcon from '@shared/ui/icons/UserIcon';
import { useOnAppStart } from '@shared/useOnAppStart';
import { moderateVerticalScale, scale, verticalScale } from '@shared/utils';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { MainRoutes, TabRoutes } from './route';

SplashScreen.preventAutoHideAsync();

const MainStack = createNativeStackNavigator<MainRoutes>();

const Tab = createBottomTabNavigator<TabRoutes>();

const defaultTabBarStyle = {
  borderTopWidth: 0,
  backgroundColor: 'black',
  paddingHorizontal: scale(32),
};

function TabActivity() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: defaultTabBarStyle,
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: scale(8),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.32)',
          tabBarStyle: {
            ...defaultTabBarStyle,
            position: 'absolute',
            backgroundColor: 'transparent',
            elevation: 0,
          },
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: PlusCircleIcon,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: UserIcon }}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element | null {
  useOnAppStart();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Main" component={TabActivity} />
      <MainStack.Screen
        name="FullScreenNFTDetails"
        component={FullScreenNFTDetails}
        options={{
          gestureEnabled: false,
          presentation: 'transparentModal',
        }}
      />
    </MainStack.Navigator>
  );
}

export default App;
