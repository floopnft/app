import { SCREEN_HEIGHT } from '@shared/utils';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint, useVector } from 'react-native-redash';
import { Image } from '@shared/ui/primitives';
import { StyleSheet } from 'react-native';
import { sharedStyles } from '@shared/ui/styles';
import { hslFromArray } from '@shared/ui/color-utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainRoutes } from '@src/route';

const NftDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainRoutes>>();
  const {
    params: { nft },
  } = useRoute<RouteProp<MainRoutes, 'FullScreenNFTDetails'>>();

  const isGestureActive = useSharedValue(false);
  const translation = useVector();

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationY, velocityY }) => {
      const snapBack =
        snapPoint(translationY, velocityY, [0, SCREEN_HEIGHT]) ===
        SCREEN_HEIGHT;

      if (snapBack) {
        runOnJS(navigation.goBack)();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, SCREEN_HEIGHT],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
      borderRadius: 12,
      overflow: 'hidden',
    };
  });

  const isHslCorrupted = nft.bgColor[2] > 100;

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        {isHslCorrupted ? (
          <>
            <Image
              blurRadius={24}
              source={nft.imgUrl}
              contentFit="cover"
              style={StyleSheet.absoluteFillObject}
            />
            <Image
              style={sharedStyles.container}
              contentFit="contain"
              source={nft.imgUrl}
            />
          </>
        ) : (
          <Image
            flex={1}
            style={{ backgroundColor: hslFromArray(nft.bgColor) }}
            contentFit="contain"
            source={nft.imgUrl}
          />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default NftDetails;
