import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Box } from '@shared/ui/primitives';
import { scale, verticalScale } from '@shared/utils';
import ReactionsFeed from './ReactionsFeed';
import ReactionToolbox from './ReactionToolbox';

const Reactions = () => {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <Box
        position="absolute"
        bottom={tabBarHeight + verticalScale(24)}
        right={scale(24)}
      >
        <ReactionToolbox />
      </Box>
      <Box
        pointerEvents="none"
        position="absolute"
        bottom={tabBarHeight + scale(72)}
        right={scale(20)}
      >
        <ReactionsFeed />
      </Box>
    </>
  );
};

export default Reactions;
