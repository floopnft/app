import Lottie from 'lottie-react-native';
import React from 'react';
import Animated, {
  Easing,
  makeMutable,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export enum ReactionType {
  HOT = 'hot',
  MEH = 'meh',
  CRAZY_LOUGH = 'crazy-lough',
  THUMBS_UP = 'thumbs-up',
}

const ReactionFiles = {
  [ReactionType.HOT]: require('../../../shared/ui/animations/hot.json'),
  [ReactionType.MEH]: require('../../../shared/ui/animations/meh.json'),
  [ReactionType.CRAZY_LOUGH]: require('../../../shared/ui/animations/crazy-lough.json'),
  [ReactionType.THUMBS_UP]: require('../../../shared/ui/animations/thumbs-up.json'),
};

interface ReactionProps {
  type: ReactionType;
}

const AnimatedLottie = Animated.createAnimatedComponent(Lottie);

const globalProgress = makeMutable(0);

globalProgress.value = withRepeat(
  withTiming(1, { duration: 3600, easing: Easing.linear }),
  -1,
  false
);

const Reaction: React.FC<ReactionProps> = ({ type }) => {
  // const progress = useSharedValue(0);
  
  // TODO: prob this could be optimized as well?
  const animatedProps = useAnimatedProps(() => {
    return {
      progress: globalProgress.value,
    };
  });
  // useEffect(() => {
  //   progress.value = withRepeat(withTiming(1, { duration: 3600 }), -1);
  // }, [progress]);

  return (
    <AnimatedLottie
      animatedProps={animatedProps}
      source={ReactionFiles[type]}
    />
  );
};

export default Reaction;
