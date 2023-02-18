/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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
  Skia,
} from '@shopify/react-native-skia';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

export const HelloWorld = () => {
  const size = 256;
  const r = size * 0.33;
  return (
    <Canvas style={{flex: 1}}>
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
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac
        enim id augue laoreet gravida. Aliquam pellentesque interdum cursus.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam eu
        sapien et elit ultricies imperdiet vitae tincidunt nibh. Nam vestibulum
        pellentesque augue, vel rutrum justo fermentum sit amet. Phasellus
        dictum at quam et venenatis. Integer congue arcu nec velit laoreet
        vulputate. Curabitur a suscipit est. Suspendisse potenti. Quisque eget
        libero id ex ultrices varius eget quis diam. Nulla faucibus diam sed dui
        rutrum iaculis. Nam dictum augue lobortis sapien tincidunt gravida.
        Quisque luctus vestibulum risus, et varius leo finibus in. Phasellus
        vitae nisi lectus.
      </Text>
      <View
        style={{
          width: dimensions.width,
          height: dimensions.height,
          position: 'absolute',
          top: 50,
          zIndex: 100,
        }}>
        <HelloWorld />
      </View>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header /> */}
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
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
      <View style={{flex: 1, backgroundColor: 'red'}}>
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
