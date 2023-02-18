import { createTheme } from '@shopify/restyle';
import { normalize } from './utils';

const colors = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    primaryText: colors.white,
  },
  spacing: {
    [-4]: normalize(-16),
    [-3]: normalize(-12),
    [-2]: normalize(-8),
    [-1]: normalize(-4),
    0: 0,
    1: normalize(4),
    2: normalize(8),
    3: normalize(12),
    4: normalize(16),
    5: normalize(20),
    6: normalize(24),
    7: normalize(28),
    8: normalize(32),
    9: normalize(36),
    10: normalize(40),
    12: normalize(48),
    14: normalize(56),
    16: normalize(64),
    18: normalize(72),
    20: normalize(80),
    22: normalize(88),
    24: normalize(92),
    26: normalize(100),
    28: normalize(108),
    30: normalize(112),
    32: normalize(120),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
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
