import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateScreen from '@screens/CreateScreen';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import HomeIcon from '@shared/ui/icons/HomeIcon';
import PlusCircleIcon from '@shared/ui/icons/PlusCircleIcon';
import UserIcon from '@shared/ui/icons/UserIcon';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useOnAppStart } from '@shared/useOnAppStart';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function App(): JSX.Element | null {
  const { isDataLoaded } = useOnAppStart();

  // doesn't work
  // const onLayoutRootView = useCallback(async () => {//
  //   if (isDataLoaded) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isDataLoaded]);

  if (!isDataLoaded) {
    console.log('SYJA2');
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: HomeIcon }}
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

export default App;
