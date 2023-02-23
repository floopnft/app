import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateScreen from '@screens/CreateScreen';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import HomeIcon from '@shared/ui/icons/HomeIcon';
import PlusCircleIcon from '@shared/ui/icons/PlusCircleIcon';
import UserIcon from '@shared/ui/icons/UserIcon';
import React from 'react';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
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
