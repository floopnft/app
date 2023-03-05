// eslint-disable-next-line import/no-duplicates
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import theme from '@shared/theme';
import { sharedStyles } from '@shared/ui/styles';
import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { navigationReady } from '@shared/useOnAppStart';
import App from './App';

const onNavigationReady = () => {
  navigationReady.fire();
};

// AsyncStorage.clear(); // uncomment to clear storage

const Main = () => {
  return (
    <GestureHandlerRootView style={sharedStyles.container}>
      <StatusBar />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer onReady={onNavigationReady}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Main;
