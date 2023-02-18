import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import App from './App';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Main;
