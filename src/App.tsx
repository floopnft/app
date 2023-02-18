/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  BackdropBlur,
  Blur,
  Canvas,
  Circle,
  Drawing,
  Fill,
  Group,
  mix,
  Rect,
  Skia,
  useSharedValueEffect,
  useSpring,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const MyComponent = () => {
  const cx = useValue(100);
  const cy = useValue(100);
 
  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
    },
  });
 
  return (
    <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
      <Circle cx={cx} cy={cy} r={10} color="red" />
    </Canvas>
  );
};

export const HelloWorld = () => {
  const size = 256;
  const r = size * 0.33;
  return (
    <Canvas style={{ flex: 1 }}>
      {/* <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={size - r} cy={r} r={r} color="magenta" />
        <BackdropBlur blur={10}>
          <Circle cx={size / 2} cy={size - r} r={r} color="#aaaaaa" />
        </BackdropBlur>
      </Group> */}
      {/* <BackdropBlur blur={100}> */}
      <Circle cx={size / 2} cy={size - r} r={r} color="#aaaaaa" opacity={0.9}>
        <Blur blur={10} />
      </Circle>
      {/* </BackdropBlur> */}
      {/* <BackdropBlur blur={4} clip={{x: 0, y: 128, width: 256, height: 128}}>
        <Fill color="rgba(0, 0, 0, 0.2)" />
      </BackdropBlur> */}
      {/* <BackdropBlur blur={10}>
        <Circle cx={size / 2} cy={size - r} r={r} color="#aaaaaa" />
      </BackdropBlur> */}
    </Canvas>
  );
};

const dimensions = Dimensions.get('screen');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{ width: dimensions.width, height: dimensions.height - 100 }}
      >
        <MyComponent />
      </View>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header /> */}
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      >
        <Section title="Step One">
          Edit <Text style={styles.highlight}>App.tsx</Text> to change this
          screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
      </View>
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>test</Text>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
