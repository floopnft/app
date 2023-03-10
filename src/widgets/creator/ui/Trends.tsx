import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { observer } from '@legendapp/state/react';
import FireIcon from '@shared/ui/icons/FireIcon';
import Chip from '@shared/ui/molecules/Chip';
import { Box, Image, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale, ucarecdn } from '@shared/utils';
import { forwardRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $trends } from '../model';

const Trends = forwardRef<BottomSheet>(({}, ref) => {
  const insets = useSafeAreaInsets();
  const trends = $trends.get();
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  useEffect(() => {
    setSelectedTrend(trends[0]?.id || null);
  }, [trends]);

  return (
    <BottomSheet
      ref={ref}
      enablePanDownToClose
      index={-1}
      snapPoints={['72%']}
      backgroundStyle={{ backgroundColor: '#090909' }}
      handleComponent={() => (
        <Box
          flexDirection="row"
          py={2}
          justifyContent="center"
          alignItems="center"
        >
          <FireIcon color="white" />
          <Text fontSize={scale(14)} marginLeft={1} fontWeight="500">
            Trends
          </Text>
        </Box>
      )}
    >
      <Box>
        <ScrollView
          style={{ marginBottom: scale(12) }}
          contentInset={{ left: scale(20), right: scale(20) }}
          contentContainerStyle={{ gap: scale(4) }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trends.map((trend) => (
            <TouchableOpacity
              key={trend.id}
              onPress={() => setSelectedTrend(trend.id)}
            >
              <Chip title={trend.name} selected={selectedTrend === trend.id} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Box>
      <Box flex={1} alignItems="center">
        <BottomSheetFlatList
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentInset={{ bottom: insets.bottom }}
          contentContainerStyle={{ gap: scale(8) }}
          columnWrapperStyle={{ gap: scale(8) }}
          data={trends.find((trend) => trend.id === selectedTrend)?.nfts}
          renderItem={({ item: nft }) => (
            <TouchableOpacity>
              <Image
                width={scale(88)}
                height={scale(130)}
                source={ucarecdn(nft.imgUploadCareId)}
                borderRadius={8}
              />
            </TouchableOpacity>
          )}
        />
      </Box>
    </BottomSheet>
  );
});

export default observer(Trends);
