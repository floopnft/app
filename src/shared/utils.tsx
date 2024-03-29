import { Dimensions, PixelRatio, Platform } from 'react-native';

export const EMPTY_ARR: never[] = [];
export const EMPTY_OBJ = {};
export const NOOP = () => {};

const { width, height } = Dimensions.get('screen');

export { width as SCREEN_WIDTH, height as SCREEN_HEIGHT };

const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;

const scaleFactor = width / guidelineBaseWidth;

const MIN_DP_IN_REAL_PIX = 1 / PixelRatio.get();

const ANDROID_STRANGE_SMALLER_COEF = 2;

// Source: https://stackoverflow.com/questions/33628677/react-native-responsive-font-size
// deprecated
export function normalize(desiredDp: number): number {
  const targetDp = desiredDp * scaleFactor;
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

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export function getFilenameFromUrl(url: string) {
  return url.split('/').pop();
}

export function ucarecdn(id: string) {
  return `https://ucarecdn.com/${id}/-/quality/smart/-/format/auto/`;
}

export function ucareId(url: string) {
  return url.split('/').slice(-2)[0];
}

export function ucarecdnPreview(id: string, width?: number, height?: number) {
  if (!width || !height) {
    return `https://ucarecdn.com/${id}/-/preview/`;
  }
  return `https://ucarecdn.com/${id}/-/preview/${width}x${height}/`;
}

export function ucr(imageUrl: string, width?: number, height?: number) {
  if (!width || !height) {
    return `https://be7be1fc84c93f2fb6e1.ucr.io/${imageUrl}`;
  }
  if (width && !height) {
    return `https://be7be1fc84c93f2fb6e1.ucr.io/-/resize/${width}x/${imageUrl}/`;
  }
  if (!width && height) {
    return `https://be7be1fc84c93f2fb6e1.ucr.io/-/resize/x${height}/${imageUrl}/`;
  }
  return `https://be7be1fc84c93f2fb6e1.ucr.io/-/resize/${width}x${height}/${imageUrl}/`;
}
