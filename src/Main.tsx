// eslint-disable-next-line import/no-duplicates
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import theme from '@shared/theme';
import { sharedStyles } from '@shared/ui/styles';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import App from './App';

const Main = () => {
  return (
    <GestureHandlerRootView style={sharedStyles.container}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Main;
