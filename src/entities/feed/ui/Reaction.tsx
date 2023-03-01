import Lottie from 'lottie-react-native';
import React from 'react';

export enum ReactionType {
  HOT = 'hot',
  MEH = 'meh',
  CRAZY_LOUGH = 'crazy-lough',
  THUMBS_UP = 'thumbs-up',
}

export const ReactionCatalog = {
  [ReactionType.HOT]: {
    id: 'af960861-4961-4d04-9245-a557413abaee',
    animation: require('../../../shared/ui/animations/hot.json'),
  },
  [ReactionType.MEH]: {
    id: 'b02ec2b4-7d3d-45e9-adc8-57eabd0d2fe9',
    animation: require('../../../shared/ui/animations/meh.json'),
  },
  [ReactionType.CRAZY_LOUGH]: {
    id: 'f22a8fda-5697-4f81-8f7b-d7d92855a4a8',
    animation: require('../../../shared/ui/animations/crazy-lough.json'),
  },
  [ReactionType.THUMBS_UP]: {
    id: '3a5c1e8b-7cbb-4e9e-b220-2682862438c7',
    animation: require('../../../shared/ui/animations/thumbs-up.json'),
  },
};

interface ReactionProps {
  type: ReactionType;
}

const Reaction: React.FC<ReactionProps> = ({ type }) => {
  return <Lottie autoPlay source={ReactionCatalog[type].animation} />;
};

export default Reaction;
