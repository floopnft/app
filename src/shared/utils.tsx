import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const MIN_DP_IN_REAL_PIX = 1 / PixelRatio.get();

const ANDROID_STRANGE_SMALLER_COEF = 2;

// Source: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size
export function normalize(desiredDp: number): number {
  const targetDp = desiredDp * scale;
  const scaledDp = PixelRatio.roundToNearestPixel(targetDp);
  if (desiredDp > 0 && scaledDp === 0) {
    return MIN_DP_IN_REAL_PIX;
  }
  if (Platform.OS === 'android') {
    const scaledDpAfterAndroidAdjustment =
      scaledDp - ANDROID_STRANGE_SMALLER_COEF;
    if (scaledDpAfterAndroidAdjustment > 0) {
      return scaledDpAfterAndroidAdjustment;
    }
    return scaledDp;
  }
  return scaledDp;
}
