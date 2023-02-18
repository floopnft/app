import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
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
        tabBarStyle: { position: 'absolute', backgroundColor: 'transparent' },
        tabBarActiveTintColor: 'white',
        // tabBarBackground: () => (
        //   <Box flex={1} style={{ backgroundColor: '#ff00ff' }} />
        // ),
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={EmptyScreen} />
      <Tab.Screen name="Profile" component={EmptyScreen} />
    </Tab.Navigator>
  );
}

export default App;
