import Lottie from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
  debug?: boolean;
}

const Reaction: React.FC<ReactionProps> = ({ type, debug }) => {
  return (
    <View style={styles.container}>
      {!debug && (
        <Lottie
          // ref={animationRef}
          autoPlay
          loop
          source={ReactionFiles[type]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Reaction;
