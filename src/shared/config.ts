import { Platform } from 'react-native';
import Constants from 'expo-constants';

const environment = Constants.expoConfig?.extra?.environment ?? 'production';
type WalletConfig = SeedGeneratedWalletConfig;

interface SeedGeneratedWalletConfig {
  type: 'seed-generated';
  seed: string;
}

interface AppConfig {
  baseUrl: string;
  wallet: WalletConfig;
}

function getConfig(): AppConfig {
  switch (environment) {
    case 'production':
    case 'development':
      return {
        ...Platform.select({
          ios: require('../../config/env-production.ios.json'),
          android: require('../../config/env-production.android.json'),
        }),
        environment,
      };
    default:
      return {
        ...Platform.select({
          ios: require('../../config/env-local-development.ios.json'),
          android: require('../../config/env-local-development.android.json'),
        }),
        environment,
      };
  }
}

export const config = getConfig();
