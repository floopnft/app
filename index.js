import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Main from './src/Main';

import crypto from 'react-native-quick-crypto';

if (!global.crypto) {
  global.crypto = crypto;
}

AppRegistry.registerComponent(appName, () => Main);
