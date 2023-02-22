module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@entities': './src/entities',
          '@features': './src/features',
          '@screens': './src/screens',
          '@shared': './src/shared',
          '@processes': './src/processes',
          '@src': './src',
          // rn
          crypto: 'react-native-quick-crypto',
          stream: 'stream-browserify',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
