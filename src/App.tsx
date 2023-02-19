import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import HomeIcon from '@shared/ui/icons/HomeIcon';
import PlusCircleIcon from '@shared/ui/icons/PlusCircleIcon';
import UserIcon from '@shared/ui/icons/UserIcon';
import { Box } from '@shared/ui/primitives';
import React from 'react';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => <Box />;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
        component={EmptyScreen}
        options={{ tabBarIcon: PlusCircleIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={EmptyScreen}
        options={{ tabBarIcon: UserIcon }}
      />
    </Tab.Navigator>
  );
}

export default App;
