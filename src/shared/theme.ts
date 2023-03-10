import { createTheme } from '@shopify/restyle';
import { scale } from './utils';

const colors = {
  black: '#000',
  white: '#FFF',
};

const theme = createTheme({
  colors: {
    primaryText: colors.white,
    secondaryText: '#A3A3A3',

    black: colors.black,
    white: colors.white,
    darkGray: '#141414',
    darkBlue: '#2802A5',

    bgGray: '#0B0B0B',

    transparent: 'transparent',

    debug: '#ff00ff',
    debug1: '#ff0000',
    debug2: '#00ff00',
  },
  spacing: {
    [-4]: scale(-16),
    [-3]: scale(-12),
    [-2]: scale(-8),
    [-1]: scale(-4),
    0: 0,
    1: scale(4),
    2: scale(8),
    3: scale(12),
    4: scale(16),
    5: scale(20),
    6: scale(24),
    7: scale(28),
    8: scale(32),
    9: scale(36),
    10: scale(40),
    12: scale(48),
    14: scale(56),
    16: scale(64),
    18: scale(72),
    20: scale(80),
    22: scale(88),
    24: scale(92),
    26: scale(100),
    28: scale(108),
    30: scale(112),
    32: scale(120),
  },
  textVariants: {
    defaults: {
      color: 'primaryText',
    },

    // ...typographyTitles,
    // ...typographySubtitles,
    // ...typographyLabels,
    // ...typographyBody,
    // ...typographyCaptions,
    // ...typographyFontWeights,
  },
});

// export type TitleVariant = keyof typeof typographyTitles;
// export type SubtitleVariant = keyof typeof typographySubtitles;
// export type LabelVariant = keyof typeof typographyLabels;
// export type BodyVariant = keyof typeof typographyBody;
// export type CaptionVariant = keyof typeof typographyCaptions;

export type ThemeColor = keyof Theme['colors'];
export type Theme = typeof theme;
export default theme;
