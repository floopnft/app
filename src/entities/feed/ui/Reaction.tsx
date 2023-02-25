import { Box } from '@shared/ui/primitives';
import Lottie from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Animated, Easing } from 'react-native';

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

const globalProgress = new Animated.Value(0, { useNativeDriver: true });

Animated.loop(
  Animated.timing(globalProgress, {
    toValue: 1,
    duration: 3600,
    easing: Easing.linear,
    useNativeDriver: true,
  }),
  {
    iterations: -1,
  }
).start();

const Reaction: React.FC<ReactionProps> = ({ type }) => {
  return <Lottie progress={globalProgress} source={ReactionFiles[type]} />;
};

export default Reaction;
