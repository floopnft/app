import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { optionalRgbFromArray } from '@shared/ui/color-utils';
import { AnimatedBox, Box } from '@shared/ui/primitives';
import { SCREEN_HEIGHT, verticalScale } from '@shared/utils';
import { MainRoutes } from '@src/route';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint, useVector } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { listElementHeight } from '@screens/HomeScreen/list';
import FullScreenCard from './ui/FullScreenCard';

const NftDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainRoutes>>();
  const insets = useSafeAreaInsets();

  const {
    params: { nft },
  } = useRoute<RouteProp<MainRoutes, 'FullScreenNFTDetails'>>();

  const bgColor = optionalRgbFromArray(nft.cardBgColorRgb);

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
      borderRadius: 24,
      overflow: 'hidden',
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <AnimatedBox
        flex={1}
        borderRadius={24}
        padding={0}
        overflow="hidden"
        style={[
          {
            backgroundColor: bgColor,
          },
          style,
        ]}
      >
        <Box
          padding={3}
          height={listElementHeight}
          style={{
            paddingTop: insets.top,
            paddingBottom: verticalScale(24),
          }}
        >
          <FullScreenCard nft={nft} />
        </Box>
      </AnimatedBox>
    </PanGestureHandler>
  );
};

export default NftDetails;
