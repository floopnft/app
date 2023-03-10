import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { observer } from '@legendapp/state/react';
import { COLOR_TRANSPARENT } from '@shared/ui/color-utils';
import { Box, Image, Text } from '@shared/ui/primitives';
import { TouchableOpacity } from '@shared/ui/touchables';
import { scale, ucarecdn } from '@shared/utils';
import { useEffect, useState } from 'react';
import { $trends } from '../model';

const Chip = ({ title, selected, onPress }: any) => {
  return (
    <TouchableOpacity
      borderWidth={1}
      borderRadius={4}
      px={2}
      py={1}
      style={{
        borderColor: selected ? COLOR_TRANSPARENT : 'rgba(255,255,255,0.12)',
        backgroundColor: selected
          ? 'rgba(255,255,255,0.32)'
          : COLOR_TRANSPARENT,
      }}
      onPress={onPress}
    >
      <Text color="white" fontWeight="500">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Trends = () => {
  const trends = $trends.get();
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);
  useEffect(() => {
    setSelectedTrend(trends[0]?.id || null);
  }, [trends]);

  return (
    <Box flex={1}>
      <Box flexDirection="row" gap={1} mb={3}>
        {trends.map((trend) => (
          <Chip
            title={trend.name}
            selected={selectedTrend === trend.id}
            onPress={() => setSelectedTrend(trend.id)}
          />
        ))}
      </Box>
      <BottomSheetFlatList
        numColumns={3}
        contentContainerStyle={{ gap: scale(8) }}
        columnWrapperStyle={{ gap: scale(8) }}
        data={trends.find((trend) => trend.id === selectedTrend)?.nfts}
        renderItem={({ item: nft }) => (
          <Image
            width={scale(88)}
            height={scale(130)}
            source={ucarecdn(nft.imgUploadCareId)}
            borderRadius={8}
          />
        )}
      />
    </Box>
  );
};

export default observer(Trends);
